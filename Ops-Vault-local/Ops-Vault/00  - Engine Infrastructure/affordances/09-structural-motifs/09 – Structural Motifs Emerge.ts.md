/**
 * Beat 09 — Structural Motifs Emerge
 *
 * This module introduces motif‑level awareness into the substrate.
 * Motifs are recurring structural shapes that signal coherence,
 * lineage, and operator intent. They are not decorative — they are
 * load‑bearing and influence routing, weighting, and state transitions.
 */

import { SubstrateState, Boundary, Glyph, OperatorIntent } from "../engine/types";
import { createBoundary, makeReversible } from "../engine/boundaries";
import { registerGlyph, glyphInvoke } from "../engine/glyphs";
import { anomalyPressure } from "../engine/anomalies";
import { territoryShift } from "../engine/territory";

export interface Motif {
  id: string;
  occurrences: number;
  lastSeen: number;
  glyph?: Glyph;
}

export interface MotifState {
  motifs: Record<string, Motif>;
  activeMotifs: string[];
}

export const motifState: MotifState = {
  motifs: {},
  activeMotifs: []
};

/**
 * Registers a motif occurrence.
 * If a motif repeats enough times, it becomes "active" and begins
 * influencing substrate behavior.
 */
export function registerMotif(id: string, glyph?: Glyph) {
  const now = Date.now();

  if (!motifState.motifs[id]) {
    motifState.motifs[id] = {
      id,
      occurrences: 1,
      lastSeen: now,
      glyph
    };
  } else {
    motifState.motifs[id].occurrences++;
    motifState.motifs[id].lastSeen = now;
  }

