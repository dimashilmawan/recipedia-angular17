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
          return this.formatRecipes({
            meals: response.meals,
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
          return this.formatRecipes({
            meals: response.meals,
            category: category,
          });
        }),
      );
  }

  private formatRecipes({
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
}

//   private formatRecipes({
//     meals,
//     full,
//     category,
//   }: {
//     meals: Array<any>;
//     full: boolean;
//     category?: string;
//   }): Recipe[] | RecipeOverview[] {
//     return meals.map((meal: any) => {
//       if (full) {
//         const ingredients = [];
//         const measures = [];

//         for (let i = 1; i <= 20; i++) {
//           const ingredientKey = `strIngredient${i}`;
//           const measureKey = `strMeasure${i}`;
//           const ingredient = meal[ingredientKey];
//           const measure = meal[measureKey];

//           if (ingredient && ingredient.trim()) {
//             ingredients.push(ingredient.trim());
//           }

//           if (measure && measure.trim()) {
//             measures.push(measure.trim());
//           }
//         }
//         return {
//           id: meal.idMeal,
//           name: meal.strMeal,
//           category: meal.strCategory,
//           origin: meal.strArea,
//           instructions: meal.strInstructions,
//           thumbnail: meal.strMealThumb,
//           youtube: meal.strYoutube,
//           ingredients,
//           measures,
//         };
//       } else {
//         return {
//           id: meal.idMeal,
//           name: meal.strMeal,
//           category:
//             (category as string).charAt(0).toUpperCase() +
//             (category as string).slice(1),
//           thumbnail: meal.strMealThumb,
//         };
//       }
//     });
//   }
// }
