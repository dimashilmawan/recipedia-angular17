import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipes-by-category.component.html',
})
export class RecipesByCategoryComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  recipeService = inject(RecipeService);

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('name') as string;
    this.recipeService.searchRecipesByCategory(category).subscribe({
      next: (value) => {
        console.log(value);
        // TODO loding ,error, recipesbycategory state
        if (value.length === 0) this.router.navigateByUrl('/categories');
      },
      error: (err) => {
        // this.error = err;
      },
      complete: () => {
        // this.loading = false;
      },
    });
  }
}
