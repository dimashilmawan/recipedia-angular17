export type Recipe = {
  id: string;
  name: string;
  category: string;
  origin: string;
  instructions: string[];
  thumbnail: string;
  youtube: string;
  ingredients: {
    firstHalf: string[];
    secondHalf: string[];
  };
  // measures: string[];
};

export type RecipeOverview = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
};
