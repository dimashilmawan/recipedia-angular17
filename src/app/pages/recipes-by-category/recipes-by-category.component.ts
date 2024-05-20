import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeOverview } from '../../types/recipe';
import { ContainerComponent } from '../../components/container/container.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { Subscription, switchMap } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    ContainerComponent,
    LoadingSpinnerComponent,
    RecipeCardComponent,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './recipes-by-category.component.html',
})
export class RecipesByCategoryComponent implements OnInit, OnDestroy {
  private httpSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;

  recipesByCategoryResults: {
    data: RecipeOverview[] | null;
    loading: boolean;
    error: any;
  } = {
    data: null,
    loading: true,
    error: null,
  };

  currentPage: number = 1;
  itemsPerPage: number = 10;

  category: string = this.route.snapshot.paramMap.get('name') as string;

  get totalPages() {
    return Math.ceil(
      this.recipesByCategoryResults.data
        ? this.recipesByCategoryResults.data.length / this.itemsPerPage
        : 0,
    );
  }

  get paginatedData(): any[] | undefined {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recipesByCategoryResults.data?.slice(startIndex, endIndex);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
  ) {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate(['categories', this.category], {
        queryParams: { page: this.currentPage },
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate(['categories', this.category], {
        queryParams: { page: this.currentPage },
      });
    }
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParamMap.subscribe(
      (value) => {
        this.currentPage = value.get('page')
          ? Number(value.get('page') as string)
          : 1;
      },
    );

    this.httpSubscription = this.recipeService
      .searchRecipesByCategory(this.category)
      .subscribe({
        next: (value) => {
          if (value.length === 0) this.router.navigateByUrl('/categories');
          this.recipesByCategoryResults.data = value;
        },
        error: (err) => {
          this.recipesByCategoryResults.error = err.message;
        },
        complete: () => {
          this.recipesByCategoryResults.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
