import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { Recipe, RecipeOverview } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  http = inject(HttpClient);

  searchRecipes(query: string) {
    return this.http
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .pipe(
        map((response: any) => {
          if (!response.meals) return [];
          return this.formatRecipeOverviews({
            meals: response.meals,
          });
        }),
      );
  }

  searchRecipeById(id: string) {
    return this.http
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .pipe(
        map((response: any) => {
          if (!response.meals) return null;
          return this.formatRecipes({ meals: response.meals });
        }),
      );
  }

  searchRelatedRecipes(category: string, categoryId: string) {
    return this.http
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .pipe(
        map((response: any) => {
          if (!response.meals) return [];
          const meals = response.meals
            .sort(() => Math.random() - 0.3)
            .filter((meal: any) => meal.idMeal !== categoryId)
            .slice(0, 5);

          return this.formatRecipeOverviews({
            meals: meals,
            category: category,
          });
        }),
      );
  }

  searchRecipesByCategory(category: string) {
    return this.http
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .pipe(
        map((response: any) => {
          if (!response.meals) return [];
          return this.formatRecipeOverviews({
            meals: response.meals,
            category: category,
          });
        }),
      );
  }

  private formatRecipeOverviews({
    meals,
    category,
  }: {
    meals: Array<any>;
    category?: string;
  }): RecipeOverview[] {
    return meals.map((meal: any) => {
      if (category) {
        return {
          id: meal.idMeal,
          name: meal.strMeal,
          category:
            (category as string).charAt(0).toUpperCase() +
            (category as string).slice(1),
          thumbnail: meal.strMealThumb,
        };
      } else {
        return {
          id: meal.idMeal,
          name: meal.strMeal,
          category: meal.strCategory,
          thumbnail: meal.strMealThumb,
        };
      }
    });
  }

  private formatRecipes({ meals }: { meals: Array<any> }): Recipe {
    const meal = meals[0];
    const ingredients = [];
    const measures = [];
    const instructions = meal.strInstructions;

    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      const ingredient = meal[ingredientKey];
      const measure = meal[measureKey];

      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient.trim());
      }

      if (measure && measure.trim()) {
        measures.push(measure.trim());
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      origin: meal.strArea,
      thumbnail: meal.strMealThumb,
      youtube: meal.strYoutube,
      ingredients,
      instructions,
      measures,
    };
  }
}
