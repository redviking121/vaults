/**
 * Beat 10 — The Operator's Hand Appears
 *
 * This module formalizes the Operator Stance as a first‑class
 * architectural element. The operator's hand is modeled as
 * explicit intent, preferences, and overrides that the engine
 * must respect (operator sovereignty).
 */

import { SubstrateState, OperatorIntent } from "../engine/types";
import { anomalyPressure } from "../engine/anomalies";
import { makeReversible } from "../engine/boundaries";
import { glyphInvoke, registerGlyph } from "../engine/glyphs";

export interface OperatorPreferences {
  rhythm?: "slow" | "medium" | "fast";
  boundaryStyle?: "soft" | "firm";
  anomalyTolerance?: number; // 0–1
}

export interface OperatorChannel {
  lastIntent?: OperatorIntent;
  preferences: OperatorPreferences;
  overrides: string[]; // ids of subsystems the operator can hard‑override
}

export const operatorChannel: OperatorChannel = {
  preferences: {},
  overrides: []
};

/**
 * Register an explicit operator intent.
 */
export function setOperatorIntent(intent: OperatorIntent) {
  operatorChannel.lastIntent = intent;
}

/**
 * Update operator preferences (partial merge).
 */
export function updateOperatorPreferences(prefs: Partial<OperatorPreferences>) {
  operatorChannel.preferences = {
    ...operatorChannel.preferences,
    ...prefs
  };
}

/**
 * Declare that the operator can hard‑override a subsystem.
 */
export function registerOperatorOverride(subsystemId: string) {
  if (!operatorChannel.overrides.includes(subsystemId)) {
    operatorChannel.overrides.push(subsystemId);
  }
}

/**
 * Glyph representing the operator's hand — explicit co‑authorship.
 */
export const OPERATOR_HAND_GLYPH = registerGlyph("✋", {
  description: "The operator's hand; explicit co‑author and sovereign.",
  onInvoke: (ctx) => {
    // When the hand is invoked, reduce anomaly pressure slightly
    anomalyPressure.adjust(-0.03, "operator-hand");

    // And ensure all boundaries remain reversible
    ctx.boundaries.forEach((b) => makeReversible(b));
  }
});

/**
 * Apply operator stance to the substrate.
 * This is where preferences and intent shape the engine behavior.
 */
export function applyOperatorStance(state: SubstrateState): SubstrateState {
  const prefs = operatorChannel.preferences;

  // Rhythm → affects how aggressively we metabolize anomalies
  if (prefs.rhythm === "slow") {
    anomalyPressure.adjust(-0.01, "operator-rhythm-slow");
  } else if (prefs.rhythm === "fast") {
    anomalyPressure.adjust(+0.01, "operator-rhythm-fast");
  }

  // Boundary style → affects elasticity
  state.boundaries.forEach((b) => {
    if (prefs.boundaryStyle === "soft") {
      b.elasticity = Math.min(1, b.elasticity + 0.1);
    } else if (prefs.boundaryStyle === "firm") {
      b.elasticity = Math.max(0, b.elasticity - 0.1);
    }
  });

  // Anomaly tolerance → how much pressure we allow before reacting
  if (typeof prefs.anomalyTolerance === "number") {
    state.anomalyTolerance = prefs.anomalyTolerance;
  }

  // If there is a recent operator intent, surface it as a structural bias
  if (operatorChannel.lastIntent) {
    state.operatorIntent = operatorChannel.lastIntent;
    glyphInvoke(OPERATOR_HAND_GLYPH, { reason: "operator-intent" });
  }

  return state;
}

/**
 * Main entry point for Beat 10.
 */
export function operatorsHandAppears(state: SubstrateState): SubstrateState {
  return applyOperatorStance(state);
}
