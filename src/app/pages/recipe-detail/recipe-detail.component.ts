import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, RecipeOverview } from '../../types/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    ContainerComponent,
    RecipeCardComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: {
    data: Recipe | null;
    loading: boolean;
    error: any;
  } = {
    data: null,
    loading: true,
    error: null,
  };

  relatedRecipes: {
    data: RecipeOverview[] | null;
    loading: boolean;
    error: any;
  } = {
    data: null,
    loading: false,
    error: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id') as string;

      this.recipeService.searchRecipeById(categoryId).subscribe({
        next: (value) => {
          this.recipe.data = value;

          if (!value) {
            this.router.navigateByUrl('/');
          } else {
            this.relatedRecipes.loading = true;
            this.fetchRelatedRecipe(value.category, categoryId);
          }
        },
        error: (err) => {
          this.recipe.error = err.message;
        },
        complete: () => {
          this.recipe.loading = false;
        },
      });
    });
  }

  fetchRelatedRecipe(category: string, categoryId: string) {
    this.recipeService.searchRelatedRecipes(category, categoryId).subscribe({
      next: (value) => {
        this.relatedRecipes.data = value;
      },
      error: (err) => {
        this.relatedRecipes.error = err.message;
      },
      complete: () => {
        this.relatedRecipes.loading = false;
      },
    });
  }
}
