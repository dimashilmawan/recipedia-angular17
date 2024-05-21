import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, map, of } from 'rxjs';
import { Recipe, RecipeOverview } from '../types/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // private myRecipes: Recipe[] = [];
  // private currentRecipe: Recipe | null = null;

  // get hasRecipeSaved() {
  //   console.log(this.currentRecipe);
  //   return this.myRecipes.some((recipe) => recipe.id === recipe.id);
  // }

  // loadMyRecipesFromLocalStorage() {
  //   if (localStorage.getItem('my-recipes')) {
  //     this.myRecipes = JSON.parse(localStorage.getItem('my-recipe') as string);
  //   } else {
  //     this.myRecipes = [];
  //   }
  // }

  // setCurrentRecipe(recipe: Recipe | null) {
  //   this.currentRecipe = recipe;
  // }

  // saveRecipeToLocalStorage() {
  //   this.myRecipes.push(this.currentRecipe as Recipe);
  //   localStorage.setItem('my-recipes', JSON.stringify(this.myRecipes));
  // }

  // removeRecipeFromLocalStorage() {
  //   this.myRecipes = this.myRecipes.filter(
  //     (recipe) => recipe.id !== this.currentRecipe?.id,
  //   );
  //   localStorage.setItem('myRecipes', JSON.stringify(this.myRecipes));
  // }

  private savedRecipes: Recipe[] = [];

  private currentRecipeSubject = new Subject<Recipe | null>();
  currentRecipe$ = this.currentRecipeSubject.asObservable();

  getSavedRecipes() {
    return this.savedRecipes;
  }

  loadRecipesFromLocalStorage() {
    if (localStorage.getItem('saved-recipes')) {
      this.savedRecipes = JSON.parse(
        localStorage.getItem('saved-recipes') as string,
      );
    } else {
      this.savedRecipes = [];
    }
  }

  saveRecipeToLocalStorage(recipe: Recipe) {
    this.savedRecipes.push(recipe);
    localStorage.setItem('saved-recipes', JSON.stringify(this.savedRecipes));
  }

  removeRecipeToLocalStorage(recipeId: string) {
    this.savedRecipes = this.savedRecipes.filter(
      (recipe) => recipe.id !== recipeId,
    );
    localStorage.setItem('saved-recipes', JSON.stringify(this.savedRecipes));
  }

  setCurrentRecipe(recipe: Recipe | null) {
    this.currentRecipeSubject.next(recipe);
  }

  hasRecipeSaved(recipeId: string) {
    return this.savedRecipes.some((recipe) => recipe.id === recipeId);
  }

  // /////////////////////////////////////////////////////

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
    const ingredients: any[] = [];
    const instructions = meal.strInstructions;

    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;
      const ingredient = meal[ingredientKey]?.trim();
      const measure = meal[measureKey]?.trim();

      if (ingredient && measure) {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
      }
    }
    const midpoint = Math.ceil(ingredients.length / 2);
    const firstHalf = ingredients.slice(0, midpoint);
    const secondHalf = ingredients.slice(midpoint);
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      origin: meal.strArea,
      thumbnail: meal.strMealThumb,
      youtube: meal.strYoutube,
      ingredients: {
        firstHalf,
        secondHalf,
      },
      instructions,
      // measures,
    };
  }
}
