# RAPID RECOVERY PROTOCOL

---

|   |   |
|---|---|
|Protocol ID|RRP-001|
|Version|1.0|
|Status|ACTIVE|
|Classification|Operator — Personal|
|Vault Path|Ops Vault / 30-PROTOCOLS / Rapid Recovery Protocol|
|Bound Card|Rapid Recovery Card (00_Inbox)|
|Last Revised|2026-04-25|
|Author|Operator|

## 1. Purpose

This protocol governs rapid recovery from operational disruption — any event that displaces the operator from baseline function. It defines a six-state machine with deterministic transitions, operator actions per state, invariants that must hold, and failure modes. The Rapid Recovery Card in 00_Inbox serves as the activation trigger and field reference.

## 2. Six-State Machine — State Definitions

|#|State|Label|Definition|Max Duration|
|---|---|---|---|---|
|S0|NOMINAL|Baseline|Operator at full function. No recovery actions required. All systems within tolerance.|Indefinite|
|S1|ALERT|Degradation Detected|Early-warning signals present. Operator awareness engaged. Function still within acceptable bounds but trending toward breach.|4 hours|
|S2|CONTAIN|Stop the Bleed|Active containment of disruption source. Reduce exposure surface. Halt discretionary commitments. Protect invariants.|12 hours|
|S3|STABILIZE|Minimum Viable Function|Restore the minimum operational baseline — sleep, hydration, essential obligations only. No new inputs.|24 hours|
|S4|RECOVER|Systematic Rebuild|Controlled, incremental restoration of full operational capacity. Re-engage systems one at a time. Monitor for relapse signals.|48 hours|
|S5|INTEGRATE|Lessons Extracted|Post-recovery review. What triggered the disruption? What held? What failed? Update protocols, adjust thresholds, return to S0.|24 hours|

## 3. State Transition Triggers

|Transition|Trigger Condition|
|---|---|
|S0 → S1|Any two early-warning signals detected within a 4-hour window (see Signal List below).|
|S1 → S2|Any single signal escalates to threshold breach, OR three or more signals co-present.|
|S2 → S3|Bleed contained — no new disruption sources active; operator confirms containment.|
|S3 → S4|Minimum viable function restored for 8+ continuous hours; sleep cycle completed.|
|S4 → S5|Operator self-assesses at 80%+ baseline across all domains for 24 hours.|
|S5 → S0|Post-recovery review completed and logged; protocol card updated.|
|Any → S2|**Emergency override:** acute disruption detected at any state; jump to CONTAIN.|

### Signal List (Early-Warning Indicators)

- Sleep disruption (< 6 hrs or fragmented for 2+ nights)
- Appetite dysregulation (skipping meals or compulsive intake)
- Cognitive fog or decision fatigue beyond normal load
- Social withdrawal or irritability spike
- Task avoidance on critical-path items
- Somatic signals (tension, headache, chest tightness without medical cause)
- Rumination loops or fixation on unresolvable problems
- Loss of interest in maintenance routines (hygiene, environment, exercise)

## 4. Operator Actions per State

|State|Required Actions|Prohibited Actions|
|---|---|---|
|S0 NOMINAL|Maintain routines; periodic self-check (daily); keep protocol card accessible.|None.|
|S1 ALERT|Log signals; set 4-hour check-in timer; reduce discretionary load by 25%; notify accountability partner if applicable.|No new commitments; no high-stakes decisions.|
|S2 CONTAIN|Cancel or defer all non-essential obligations; isolate disruption source; secure sleep environment; activate minimal input mode (no news, no social media, minimal screens).|No problem-solving on the disruption source; no social performance; no stimulants beyond baseline caffeine.|
|S3 STABILIZE|Sleep priority (8+ hrs); hydration (3L/day); single meal prep; brief movement (walk only); one grounding practice per waking block.|No work output; no creative projects; no analysis; no screens after 2100.|
|S4 RECOVER|Re-engage one domain per 12-hour block; monitor for relapse signals after each re-engagement; journal briefly (3–5 lines) at end of day.|No simultaneous multi-domain activation; no "catching up" on backlog.|
|S5 INTEGRATE|Complete post-recovery log (template below); identify root cause; update signal thresholds if needed; file protocol card notes.|No skipping the review; no premature return to full load.|

## 5. Invariants

These conditions must hold across **all states**. If any invariant is violated, immediately transition to the nearest appropriate state (default: S2 CONTAIN).

- **Sleep floor:** Minimum 6 hours per 24-hour cycle. Non-negotiable.
- **Hydration floor:** Minimum 2L water per 24-hour cycle.
- **Safety:** No self-harm, substance misuse, or reckless behavior at any state.
- **Communication:** At least one check-in with a trusted contact per 48-hour cycle during S1–S5.
- **Protocol integrity:** The Rapid Recovery Card remains accessible and current. Protocol is not modified mid-recovery (changes logged at S5 only).
- **Honesty:** Self-assessment is accurate, not performative. No "I'm fine" overrides.

## 6. Failure Modes

|Failure Mode|Description|Mitigation|
|---|---|---|
|FM-1: Signal Blindness|Operator fails to detect or acknowledge early-warning signals due to normalization or denial.|Externalize detection — use daily checklist; enlist accountability partner for cross-check.|
|FM-2: Premature Escalation|Operator jumps to S4 RECOVER without completing CONTAIN and STABILIZE, leading to incomplete reset.|Enforce state gate: each transition requires explicit self-assessment logged on the protocol card.|
|FM-3: Containment Leak|Operator continues discretionary commitments during S2/S3, preventing stabilization.|Hard-cancel rule: all non-essential commitments are canceled, not deferred, during CONTAIN.|
|FM-4: Recovery Theater|Operator performs recovery actions superficially without genuine disengagement.|Invariant check: if sleep and hydration floors are not met, state does not advance.|
|FM-5: Integration Skip|Operator returns to S0 without completing S5, losing the learning signal.|Gate: S5 → S0 transition requires a completed post-recovery log entry.|
|FM-6: Chronic Low-Grade|Operator cycles between S0 and S1 without fully resolving, leading to slow degradation.|Threshold rule: if S1 is entered 3+ times in 14 days, auto-escalate to S2 regardless of signal count.|

## 7. Binding References

- **Rapid Recovery Card (00_Inbox):** The card is the field-level activation interface. When the operator detects signals, the card is pulled and used as a quick-reference checklist. The card references this protocol for full state definitions and transition logic. Card updates are logged at S5.
- **Vault Path:** This protocol lives at **Ops Vault / 30-PROTOCOLS / Rapid Recovery Protocol**. The card in 00_Inbox points here. If the protocol is revised, the card must be updated to reflect the current version number.
- **Post-Recovery Log:** Each completed recovery cycle generates a log entry stored in the Ops Vault (suggested path: **03_Logs / Recovery_Log**). The log template is referenced below.

## 8. Post-Recovery Log Template

--- POST-RECOVERY LOG --- Date: Protocol Version: Entry State: S__ → Exit State: S0 Duration (total): Root Cause: Signals Detected: What Held: What Failed: Protocol Adjustments: Notes: ---

## 9. Version History

|Version|Date|Change|
|---|---|---|
|1.0|2026-04-25|Initial protocol. Six-state machine, triggers, actions, invariants, failure modes defined.|

---

RRP-001 v1.0 — Ops Vault / 30-PROTOCOLS — ACTIVE