/**
 * Beat 11 — Territory Crystallizes
 *
 * This module sharpens the notion of territory. Fuzzy regions
 * become crisp; edges become meaningful; patterns become
 * consequential. Territory is inferred, negotiated, and
 * operator‑overridable.
 */

import { SubstrateState } from "../engine/types";
import { anomalyPressure } from "../engine/anomalies";
import { registerGlyph, glyphInvoke } from "../engine/glyphs";

export type TerritoryKind = "known" | "emergent" | "wild" | "forbidden";

export interface TerritoryRegion {
  id: string;
  kind: TerritoryKind;
  stability: number; // 0–1
  pattern?: string;
  operatorNamed?: boolean;
}

export interface TerritoryModel {
  regions: Record<string, TerritoryRegion>;
}

export const territoryModel: TerritoryModel = {
  regions: {}
};

/**
 * Crystallization rule: when a pattern repeats or is named,
 * it becomes a region.
 */
export function crystallizeTerritory(
  id: string,
  kind: TerritoryKind,
  pattern?: string,
  operatorNamed: boolean = false
) {
  const existing = territoryModel.regions[id];

  if (!existing) {
    territoryModel.regions[id] = {
      id,
      kind,
      stability: operatorNamed ? 0.8 : 0.4,
      pattern,
      operatorNamed
    };
  } else {
    existing.stability = Math.min(1, existing.stability + 0.1);
    if (pattern) existing.pattern = pattern;
    if (operatorNamed) existing.operatorNamed = true;
  }
}

/**
 * Glyph representing the Go‑board — the grid of territory.
 */
export const TERRITORY_GLYPH = registerGlyph("☷", {
  description: "Territory grid; crystallized, negotiable space.",
  onInvoke: (ctx) => {
    // Territory glyph invocation slightly increases global stability
    ctx.state.territory.stability = Math.min(
      1,
      ctx.state.territory.stability + 0.05
    );
  }
});

/**
 * Infer territory from the current substrate state.
 */
export function inferTerritory(state: SubstrateState) {
  const pattern = state.boundaries.map((b) => b.type).join("-");
  const id = pattern || "default";

  // Simple heuristic: more boundaries → more "known"
  const kind: TerritoryKind =
    state.boundaries.length > 3 ? "known" : "emergent";

  crystallizeTerritory(id, kind, pattern, !!state.operatorNamedRegion);

  // If operator explicitly named a region, treat it as known
  if (state.operatorNamedRegion) {
    crystallizeTerritory(
      state.operatorNamedRegion,
      "known",
      pattern,
      true
    );
  }

  glyphInvoke(TERRITORY_GLYPH, { reason: "territory-infer" });
}

/**
 * Apply crystallized territory back into the substrate.
 */
export function applyTerritoryCrystallization(
  state: SubstrateState
): SubstrateState {
  // Aggregate stability from regions
  const regionValues = Object.values(territoryModel.regions);
  if (regionValues.length > 0) {
    const avgStability =
      regionValues.reduce((acc, r) => acc + r.stability, 0) /
      regionValues.length;

    state.territory.stability = avgStability;
  }

  // More stable territory → lower anomaly pressure
  anomalyPressure.adjust(
    -0.03 * state.territory.stability,
    "territory-stability"
  );

  return state;
}

/**
 * Main entry point for Beat 11.
 */
export function territoryCrystallizes(state: SubstrateState): SubstrateState {
  inferTerritory(state);
  return applyTerritoryCrystallization(state);
}
