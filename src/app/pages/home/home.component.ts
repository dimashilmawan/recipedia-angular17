import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { CATEGORIES_OVERVIEW } from '../../constants/categories';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
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
import { TestService } from '../../services/test.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink,
    FontAwesomeModule,
    HeroComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // testService = inject(TestService);

  @ViewChild('input') private inputElement!: ElementRef<HTMLInputElement>;
  private inputSubscription!: Subscription;

  faXmark = faXmark;
  faCircleChevronDown = faCircleChevronDown;
  faSpinner = faSpinner;

  categoriesOverview = CATEGORIES_OVERVIEW;

  recipeResults: RecipeOverview[] | null = null;
  loading = false;
  error: any = null;

  constructor(private recipeService: RecipeService) {}

  ngAfterViewInit(): void {
    this.inputSubscription = fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((value) => {
          console.log(value);
          this.loading = true;
          this.error = null;
          this.recipeResults = null;
          return this.recipeService.searchRecipes(value);
        }),
      )
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.recipeResults = value;
        },
        error: (err) => {
          console.log('err');
          this.loading = false;
          this.error = err.message;
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.inputSubscription) return this.inputSubscription.unsubscribe();
  }

  // onSubmit(event: SubmitEvent, query: string) {
  //   event.preventDefault();

  //   if (!query) return;

  //   this.loading = true;
  //   this.error = null;
  //   this.recipeResults = null;

  //   this.recipeService.searchRecipes(query).subscribe({
  //     next: (value) => {
  //       this.recipeResults = value;
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       this.error = err.message;
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
}
