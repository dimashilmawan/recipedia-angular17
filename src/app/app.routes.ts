import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyRecipeComponent } from './pages/my-recipe/my-recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () =>
    //   import('./pages/home/home.component').then((m) => m.HomeComponent),
    component: HomeComponent,
  },
  {
    path: 'category',
    // loadComponent: () =>
    //   import('./pages/category/category.component').then(
    //     (m) => m.CategoryComponent,
    //   ),

    component: CategoryComponent,
  },
  {
    path: 'my-recipe',
    // loadComponent: () =>
    //   import('./pages/my-recipe/my-recipe.component').then(
    //     (m) => m.MyRecipeComponent,
    //   ),

    component: MyRecipeComponent,
  },
  {
    path: '**',
    // loadComponent: () =>
    //   import('./pages/not-found/not-found.component').then(
    //     (m) => m.NotFoundComponent,
    //   ),

    component: NotFoundComponent,
  },
];
