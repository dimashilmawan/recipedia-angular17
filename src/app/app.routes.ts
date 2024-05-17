import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((m) => m.HomeComponent),
    component: HomeComponent,
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/all-categories/all-categories.component').then(
        (m) => m.AllCategoriesComponent,
      ),

    // component: CategoriesComponent,
  },
  {
    path: 'categories/:name',
    loadComponent: () =>
      import('./pages/recipes-by-category/recipes-by-category.component').then(
        (m) => m.RecipesByCategoryComponent,
      ),

    // component: CategoriesComponent,
  },
  {
    path: 'my-recipes',
    loadComponent: () =>
      import('./pages/my-recipes/my-recipes.component').then(
        (m) => m.MyRecipesComponent,
      ),

    // component: MyRecipesComponent,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),

    // component: NotFoundComponent,
  },
];
