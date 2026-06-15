#!/usr/bin/env python3
# commit_membrane.py
# Mutation firewall for the Xi/Razor vessel
#
# Responsibilities:
# - Enforce Razor membrane rules before any mutation
# - Validate structural legality of proposed changes
# - Apply two-phase commit (prepare → commit)
# - Provide deterministic exceptions
# - Integrate with StateBundle, Logseq/Obsidian bindings, and scans

from dataclasses import dataclass, field
from typing import Any, Dict, Optional, Callable, List
import hashlib
import json
import time


# ------------------------------
# Exceptions (deterministic)
# ------------------------------

class CommitError(Exception):
    """Raised when a mutation fails Razor validation."""
    pass


class PrepareError(Exception):
    """Raised when a mutation cannot be prepared."""
    pass


class StructuralError(Exception):
    """Raised when a proposed change violates substrate invariants."""
    pass


# ------------------------------
# CommitEnvelope
# ------------------------------

@dataclass
class CommitEnvelope:
    """A structured mutation request."""
    op: str
    target: str
    payload: Any
    metadata: Dict[str, Any] = field(default_factory=dict)

    def fingerprint(self) -> str:
        """Deterministic hash of the envelope."""
        raw = json.dumps(
            {
                "op": self.op,
                "target": self.target,
                "payload": self.payload,
                "metadata": self.metadata,
            },
            sort_keys=True,
        )
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()


# ------------------------------
# CommitMembrane
# ------------------------------

class CommitMembrane:
    """
    Mutation firewall enforcing Razor rules:
    - validate_envelope
    - structural_check
    - prepare
    - commit
    """

    def __init__(self, state_bundle):
        self.state = state_bundle

    # ---------------------------------------------------------
    # [validate_envelope] — Razor rule check
    # ---------------------------------------------------------
    def validate_envelope(self, envelope: CommitEnvelope) -> None:
        """Validate envelope structure and Razor legality."""
        if not envelope.op:
            raise CommitError("Envelope missing op")

        if not envelope.target:
            raise CommitError("Envelope missing target")

        if envelope.op not in {"write_page", "write_block", "append_page", "append_block"}:
            raise CommitError(f"Illegal op under Razor membrane: {envelope.op}")

    # ---------------------------------------------------------
    # [structural_check] — substrate invariants
    # ---------------------------------------------------------
    def structural_check(self, envelope: CommitEnvelope) -> None:
        """Ensure mutation does not violate substrate invariants."""
        # Example invariant: no null payloads
        if envelope.payload is None:
            raise StructuralError("Null payload violates substrate invariants")

        # Example invariant: pages must be strings
        if envelope.op in {"write_page", "append_page"}:
            if not isinstance(envelope.payload, str):
                raise StructuralError("Page payload must be string")

        # Example invariant: blocks must be strings
        if envelope.op in {"write_block", "append_block"}:
            if not isinstance(envelope.payload, str):
                raise StructuralError("Block payload must be string")

    # ---------------------------------------------------------
    # [prepare] — two-phase commit (phase 1)
    # ---------------------------------------------------------
    def prepare(self, envelope: CommitEnvelope) -> Dict[str, Any]:
        """Prepare mutation; return prepared state delta."""
        try:
            self.validate_envelope(envelope)
            self.structural_check(envelope)
        except Exception as e:
            raise PrepareError(f"Prepare failed: {e}")

        return {
            "fingerprint": envelope.fingerprint(),
            "timestamp": time.time(),
            "op": envelope.op,
            "target": envelope.target,
            "payload": envelope.payload,
        }

    # ---------------------------------------------------------
    # [commit] — two-phase commit (phase 2)
    # ---------------------------------------------------------
    def commit(self, prepared: Dict[str, Any]) -> None:
        """Apply prepared mutation to the substrate."""
        op = prepared["op"]
        target = prepared["target"]
        payload = prepared["payload"]

        if op == "write_page":
            self.state.set_page(target, payload)

        elif op == "append_page":
            existing = self.state.get_page(target) or ""
            self.state.set_page(target, existing + payload)

        elif op == "write_block":
            self.state.set_block(target, payload)

        elif op == "append_block":
            existing = self.state.get_block(target) or ""
            self.state.set_block(target, existing + payload)

        else:
            raise CommitError(f"Unknown op during commit: {op}")

    # ---------------------------------------------------------
    # [apply] — high-level mutation entrypoint
    # ---------------------------------------------------------
    def apply(self, envelope: CommitEnvelope) -> Dict[str, Any]:
        """Full mutation pipeline: prepare → commit."""
        prepared = self.prepare(envelope)
        self.commit(prepared)
        return prepared


# ------------------------------
# Factory
# ------------------------------

def make_commit_membrane(state_bundle) -> CommitMembrane:
    """Factory for CommitMembrane."""
    return CommitMembrane(state_bundle)
