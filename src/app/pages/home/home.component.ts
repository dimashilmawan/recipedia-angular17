import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { CATEGORIES_OVERVIEW } from '../../constants/categories';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleChevronDown,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../services/recipe.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { RecipeOverview } from '../../types/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    FontAwesomeModule,
    HeroComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    LoadingSpinnerComponent,
    CommonModule,
    PaginationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
// export class HomeComponent implements AfterViewInit, OnDestroy,OnInit {
export class HomeComponent implements OnInit {
  input = new FormControl('');

  private inputSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;

  categoriesOverview = CATEGORIES_OVERVIEW;

  faXmark = faXmark;
  faCircleChevronDown = faCircleChevronDown;
  faSpinner = faSpinner;

  recipeResults: {
    data: RecipeOverview[] | null;
    loading: boolean;
    error: any;
  } = {
    data: null,
    loading: false,
    error: null,
  };

  currentPage: number = 1;
  itemsPerPage: number = 10;

  query: string = '';

  get totalPages() {
    return Math.ceil(
      this.recipeResults.data
        ? this.recipeResults.data.length / this.itemsPerPage
        : 0,
    );
  }

  get paginatedData(): any[] | undefined {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recipeResults.data?.slice(startIndex, endIndex);
  }

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate([''], {
        queryParams: { query: this.query, page: this.currentPage },
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate([''], {
        queryParams: { query: this.query, page: this.currentPage },
      });
    }
  }

  ngOnInit(): void {
    this.inputSubscription = this.input.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((value) => {
          if (!value) {
            this.router.navigateByUrl('');
            return of(null);
          }

          this.router.navigate([''], {
            queryParams: {
              query: value,
              page: this.query === value ? this.currentPage : 1,
            },
          });

          this.recipeResults.loading = true;
          this.recipeResults.error = null;

          return this.recipeService.searchRecipes(value);
        }),
      )
      .subscribe({
        next: (value) => {
          this.recipeResults.loading = false;
          this.recipeResults.data = value;
        },
        error: (err) => {
          this.recipeResults.loading = false;
          this.recipeResults.error = err.message;
        },
      });

    this.queryParamsSubscription = this.route.queryParamMap.subscribe(
      (value) => {
        if (value.get('page') && value.get('query')) {
          console.log('get back');
          this.currentPage = Number(value.get('page'));

          this.query = value.get('query') as string;
          this.input.setValue(value.get('query'));
        }
      },
    );
  }

  ngOnDestroy(): void {
    if (this.inputSubscription) return this.inputSubscription.unsubscribe();
    if (this.queryParamsSubscription)
      return this.queryParamsSubscription.unsubscribe();
  }
}
