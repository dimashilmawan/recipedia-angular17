import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { CATEGORIES_OVERVIEW } from '../../constants/categories';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faCircleChevronDown,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../services/recipe.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { Recipe } from '../../types/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

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
export class HomeComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faCircleChevronDown = faCircleChevronDown;
  faSpinner = faSpinner;

  recipeResults: Recipe[] | null = null;
  // recipeResults: Recipe[] | null = [
  //   {
  //     id: '12',
  //     category: 'wd',
  //     ingredients: ['wd'],
  //     instructions: '',
  //     measures: [''],
  //     name: 'awd',
  //     origin: 'awd',
  //     thumbnail: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
  //     youtube: 'awd',
  //   },
  // ];

  loading = false;
  error: any = null;

  categoriesOverview = CATEGORIES_OVERVIEW;

  private recipeService = inject(RecipeService);

  onSubmit(event: SubmitEvent, query: string) {
    event.preventDefault();
    this.loading = true;
    this.recipeResults = null;

    this.recipeService.searchRecipes(query).subscribe({
      next: (value) => {
        this.recipeResults = value;
      },
      error: (err) => {
        this.error = err;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
