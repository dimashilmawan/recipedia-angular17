import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { CATEGORIES, CATEGORIES_TYPE } from '../../constants/categories';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisH,
  faMagnifyingGlass,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../services/recipe.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../../types/meal';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContainerComponent, RouterLink, FontAwesomeModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  faEllipsisH = faEllipsisH;
  faMagnifyingGlass = faMagnifyingGlass;
  faCircleChevronDown = faCircleChevronDown;

  recipeResults: Meal[] | null = null;
  // recipeResults: Meal[] | null = [
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

  categories!: CATEGORIES_TYPE;

  constructor(private recipeService: RecipeService) {
    this.categories = CATEGORIES.filter((cat) =>
      ['Chicken', 'Beef', 'Seafood'].includes(cat.name),
    );
  }

  onSubmit(event: SubmitEvent, query: string) {
    event.preventDefault();
    this.loading = true;

    this.recipeService.searchRecipes(query).subscribe({
      next: (value) => {
        this.recipeResults = value;
        console.log(value[0].thumbnail);
      },
      error: (err) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }
}
