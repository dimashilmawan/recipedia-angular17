export type Recipe = {
  id: string;
  name: string;
  category: string;
  origin: string;
  instructions: string[];
  thumbnail: string;
  youtube: string;
  ingredients: string[];
  measures: string[];
};

export type RecipeOverview = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
};
