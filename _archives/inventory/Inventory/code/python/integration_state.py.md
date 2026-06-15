#!/usr/bin/env python3
# integration_state.py
# State spine for the Xi/Razor vessel
#
# Responsibilities:
# - Hold ephemeral runtime state
# - Provide deterministic get/set/update surfaces
# - Emit a StateBundle for the vessel
# - Keep mutation behind Razor rules

from dataclasses import dataclass, field
from typing import Any, Dict, Optional


# ------------------------------------------------------------
# Bundle
# ------------------------------------------------------------

@dataclass(frozen=True)
class StateBundle:
    """
    Immutable snapshot of the vessel's runtime state.
    """
    host: str
    scans: Dict[str, Any]
    surfaces: Dict[str, Any]
    meta: Dict[str, Any]


# ------------------------------------------------------------
# Internal mutable state (protected by Razor)
# ------------------------------------------------------------

_state: Dict[str, Any] = {
    "host": None,
    "scans": {},
    "surfaces": {},
    "meta": {},
}


# ------------------------------------------------------------
# API Surface
# ------------------------------------------------------------

# 1. ----------------------------------------------------------
# [state_init](ca://s?q=Initialize_integration_state)
# ----------------------------------------------------------

def state_init(host: str) -> None:
    """
    Initialize the state spine with a host identifier.
    """
    _state["host"] = host
    _state["scans"] = {}
    _state["surfaces"] = {}
    _state["meta"] = {}


# 2. ----------------------------------------------------------
# [state_get](ca://s?q=Get_integration_state)
# ----------------------------------------------------------

def state_get(key: str) -> Optional[Any]:
    """
    Deterministic getter for state keys.
    """
    return _state.get(key)


# 3. ----------------------------------------------------------
# [state_set](ca://s?q=Set_integration_state)
# ----------------------------------------------------------

def state_set(key: str, value: Any) -> None:
    """
    Deterministic setter for state keys.
    """
    _state[key] = value


# 4. ----------------------------------------------------------
# [state_update](ca://s?q=Update_integration_state)
# ----------------------------------------------------------

def state_update(key: str, patch: Dict[str, Any]) -> None:
    """
    Merge a dict patch into an existing dict state entry.
    """
    if key not in _state or not isinstance(_state[key], dict):
        _state[key] = {}

    _state[key].update(patch)


# 5. ----------------------------------------------------------
# [state_emit](ca://s?q=Emit_integration_state_bundle)
# ----------------------------------------------------------

def state_emit() -> StateBundle:
    """
    Emit an immutable StateBundle snapshot.
    """
    return StateBundle(
        host=_state["host"],
        scans=dict(_state["scans"]),
        surfaces=dict(_state["surfaces"]),
        meta=dict(_state["meta"]),
    )
