/**
 * Beat 12 — The Substrate Learns to Breathe
 *
 * This module introduces a breathing cycle: inhale (absorb state)
 * and exhale (produce structure). It gives the engine a rhythmic,
 * self‑regulating loop that prevents runaway recursion and stagnation.
 */

import { SubstrateState } from "../engine/types";
import { anomalyPressure } from "../engine/anomalies";
import { glyphInvoke, registerGlyph } from "../engine/glyphs";

export interface BreathingMetrics {
  inhaleCount: number;
  exhaleCount: number;
  lastCycleAt: number;
}

export const breathingMetrics: BreathingMetrics = {
  inhaleCount: 0,
  exhaleCount: 0,
  lastCycleAt: Date.now()
};

/**
 * Glyph representing the breathing substrate.
 */
export const BREATH_GLYPH = registerGlyph("〰", {
  description: "Breathing substrate; rhythmic inhale/exhale of structure.",
  onInvoke: (ctx) => {
    // Slightly smooth anomaly pressure on each breath
    anomalyPressure.adjust(-0.01, "breath-smoothing");
  }
});

/**
 * Inhale: absorb operator intent, motif state, territory, and anomaly pressure.
 */
export function inhale(state: SubstrateState): SubstrateState {
  breathingMetrics.inhaleCount++;
  breathingMetrics.lastCycleAt = Date.now();

  // Inhale anomaly pressure as awareness
  state.breathing = state.breathing || {};
  state.breathing.anomalyAwareness = anomalyPressure.current();

  // Inhale motif density (if present)
  if (state.motifDensity != null) {
    state.breathing.motifDensity = state.motifDensity;
  }

  // Inhale territory stability
  state.breathing.territoryStability = state.territory.stability;

  return state;
}

/**
 * Exhale: produce structure, boundaries, and stabilizing patterns.
 */
export function exhale(state: SubstrateState): SubstrateState {
  breathingMetrics.exhaleCount++;

  const awareness = state.breathing?.anomalyAwareness ?? 0;
  const stability = state.breathing?.territoryStability ?? 0;

  // If anomaly awareness is high and stability is low → exhale more structure
  if (awareness > 0.5 && stability < 0.5) {
    // Tighten boundaries slightly
    state.boundaries.forEach((b) => {
      b.elasticity = Math.max(0, b.elasticity - 0.05);
    });

    // Increase territory stability a bit
    state.territory.stability = Math.min(
      1,
      state.territory.stability + 0.05
    );
  } else {
    // Otherwise, relax boundaries a bit
    state.boundaries.forEach((b) => {
      b.elasticity = Math.min(1, b.elasticity + 0.02);
    });
  }

  // Exhale also gently nudges anomaly pressure toward neutral
  anomalyPressure.adjust(
    stability > 0.5 ? -0.02 : -0.005,
    "breath-exhale"
  );

  glyphInvoke(BREATH_GLYPH, { reason: "breath-cycle" });

  return state;
}

/**
 * Main entry point for Beat 12.
 * One full breath per engine cycle: inhale then exhale.
 */
export function substrateLearnsToBreathe(
  state: SubstrateState
): SubstrateState {
  state = inhale(state);
  state = exhale(state);
  return state;
}
