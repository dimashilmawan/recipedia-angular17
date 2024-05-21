import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../types/recipe';
import { RecipeService } from '../../services/recipe.service';
import { ContainerComponent } from '../../components/container/container.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [RecipeCardComponent, ContainerComponent, RouterLink],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent implements OnInit {
  myRecipes!: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.myRecipes = this.recipeService.getSavedRecipes();
  }
}
