export const CATEGORIES = [
  {
    id: 1,
    name: 'Beef',
    thumbnail: 'https://www.themealdb.com/images/category/beef.png',
  },
  {
    id: 2,
    name: 'Chicken',
    thumbnail: 'https://www.themealdb.com/images/category/chicken.png',
  },
  {
    id: 3,
    name: 'Dessert',
    thumbnail: 'https://www.themealdb.com/images/category/dessert.png',
  },
  {
    id: 4,
    name: 'Lamb',
    thumbnail: 'https://www.themealdb.com/images/category/lamb.png',
  },
  {
    id: 5,
    name: 'Miscellaneous',
    thumbnail: 'https://www.themealdb.com/images/category/miscellaneous.png',
  },
  {
    id: 6,
    name: 'Pasta',
    thumbnail: 'https://www.themealdb.com/images/category/pasta.png',
  },
  {
    id: 7,
    name: 'Pork',
    thumbnail: 'https://www.themealdb.com/images/category/pork.png',
  },
  {
    id: 8,
    name: 'Seafood',
    thumbnail: 'https://www.themealdb.com/images/category/seafood.png',
  },
  {
    id: 9,
    name: 'Side',
    thumbnail: 'https://www.themealdb.com/images/category/side.png',
  },
  {
    id: 10,
    name: 'Starter',
    thumbnail: 'https://www.themealdb.com/images/category/starter.png',
  },
  {
    id: 12,
    name: 'Vegetarian',
    thumbnail: 'https://www.themealdb.com/images/category/vegetarian.png',
  },
  {
    id: 13,
    name: 'Breakfast',
    thumbnail: 'https://www.themealdb.com/images/category/breakfast.png',
  },
  {
    id: 14,
    name: 'Goat',
    thumbnail: 'https://www.themealdb.com/images/category/goat.png',
  },
];

export const CATEGORIES_OVERVIEW: CATEGORIES_TYPE[] = [
  {
    id: 1,
    name: 'Beef',
    thumbnail: 'https://www.themealdb.com/images/category/beef.png',
  },
  {
    id: 2,
    name: 'Chicken',
    thumbnail: 'https://www.themealdb.com/images/category/chicken.png',
  },
  {
    id: 8,
    name: 'Seafood',
    thumbnail: 'https://www.themealdb.com/images/category/seafood.png',
  },
  { id: 0, name: 'More', thumbnail: '' },
];

export type CATEGORIES_TYPE = {
  id: number;
  name: string;
  thumbnail: string;
};
