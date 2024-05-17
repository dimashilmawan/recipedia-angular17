import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeOverview } from '../../types/recipe';
import { ContainerComponent } from '../../components/container/container.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    ContainerComponent,
    LoadingSpinnerComponent,
    RecipeCardComponent,
    CommonModule,
  ],
  templateUrl: './recipes-by-category.component.html',
})
export class RecipesByCategoryComponent implements OnInit, OnDestroy {
  private httpSubscription!: Subscription;

  recipesByCategoryResults: RecipeOverview[] | null = null;
  loading = false;
  error: any = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;

  get totalPages() {
    return Math.ceil(
      this.recipesByCategoryResults
        ? this.recipesByCategoryResults.length / this.itemsPerPage
        : 0,
    );
  }

  get paginatedData(): any[] | undefined {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recipesByCategoryResults?.slice(startIndex, endIndex);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('name') as string;

    this.loading = true;
    this.error = null;
    this.recipesByCategoryResults = null;

    this.httpSubscription = this.recipeService
      .searchRecipesByCategory(category)
      .subscribe({
        next: (value) => {
          if (value.length === 0) this.router.navigateByUrl('/categories');
          this.recipesByCategoryResults = value;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.httpSubscription) return this.httpSubscription.unsubscribe();
  }
}
