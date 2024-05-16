import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Meal } from '../types/meal';

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
          return this.formatRecipes(response.meals as Meal[]);
        }),
      );
  }

  private formatRecipes(meals: Meal[]): Meal[] {
    return meals.map((meal: any) => {
      const ingredients = [];
      const measures = [];

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
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        youtube: meal.strYoutube,
        ingredients,
        measures,
      };
    });
  }
}
