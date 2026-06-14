// ─────────────────────────────────────────────────────────────
// BEAT 8: Predictive Affordances
// The substrate begins generating proto‑options based on operator trajectory.
// Nothing auto-executes. Everything remains reversible.
// ─────────────────────────────────────────────────────────────

export const Beat8 = {
  id: 8,
  name: "PredictiveAffordances",
  state: "latent",

  // The operator's stance becomes a gravitational vector.
  ingestOperatorStance(stance) {
    this.vector = this._deriveTrajectory(stance)
    this._preRenderPossibilities()
    this._surfaceGhostHandles()
  },

  // Derive a trajectory from micro-signals (non-invasive, non-binding).
  _deriveTrajectory(stance) {
    return {
      direction: stance.intentDirection ?? "undetermined",
      amplitude: stance.energyLevel ?? 0.5,
      coherence: stance.focus ?? 0.7,
    }
  },

  // Pre-render possibilities just outside the operator’s current view.
  _preRenderPossibilities() {
    this.possibilities = this._generatePossibilityField(this.vector)
  },

  _generatePossibilityField(vector) {
    // No commitments — only latent structures.
    return [
      { id: "ghost-handle-1", weight: vector.coherence * 0.8 },
      { id: "ghost-handle-2", weight: vector.amplitude * 0.6 },
      { id: "ghost-handle-3", weight: vector.direction === "forward" ? 0.9 : 0.4 },
    ]
  },

  // Surface faint interaction points ("ghost handles").
  _surfaceGhostHandles() {
    this.ghostHandles = this.possibilities
      .filter(p => p.weight > 0.5)
      .map(p => ({
        id: p.id,
        visible: true,
        reversible: true,
        affordance: "latent-action",
      }))
  },

  // The operator may choose to activate or ignore any affordance.
  activate(handleId) {
    const handle = this.ghostHandles.find(h => h.id === handleId)
    if (!handle) return { error: "Unknown handle" }

    return {
      status: "activated",
      handle: handleId,
      reversible: true,
      note: "Activation does not commit the system; it only sharpens the next beat."
    }
  }
}import { Affordances } from "00-engine/affordances"

export const Beat8 = {
  id: 8,
  name: "PredictiveAffordances",

  run(stance) {
    return Affordances.PredictiveAffordances.ingestOperatorStance(stance)
  }
}