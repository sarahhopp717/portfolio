export interface Flyer {
  genre: string;
  tagline: string;
  background: string; // CSS gradient string
  accent: string; // hex color, drives genre text + rules + arrows + active dot
  textColor: string; // hex color, base color for body text on this flyer
  pattern: "grid" | "diagonal" | "dots" | "none";
  titleFont?: string; // CSS font-family for the genre title only
  ornament?: "gothic" | "geometric" | "deco" | "floral" | "western";
  headliners: string[];
  alsoFeatured: string[];
}

export interface Act {
  name: string;
  flyerIndex: number;
}
