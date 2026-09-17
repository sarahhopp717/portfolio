import { flyers } from "./flyers";
import type { Act } from "./types";

export const searchableActs: Act[] = flyers.flatMap((flyer, flyerIndex) =>
  [...flyer.headliners, ...flyer.alsoFeatured].map((name) => ({
    name,
    flyerIndex,
  })),
);
