export interface Flyer {
  genre: string;
  tagline: string;
  background: string; // color hex, gradient class, or image path
  headliners: string[];
  alsoFeatured: string[];
}

export interface Act {
  name: string;
  flyerIndex: number;
}
