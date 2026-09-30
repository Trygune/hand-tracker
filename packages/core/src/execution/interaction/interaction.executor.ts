import type { Interaction } from "../../interaction/interaction.types.js";

export interface InteractionExecutor {
  execute: (interaction: Interaction) => void;
}
