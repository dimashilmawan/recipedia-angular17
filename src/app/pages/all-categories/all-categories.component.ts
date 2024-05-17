import { Component } from '@angular/core';
import { CATEGORIES } from '../../constants/categories';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ContainerComponent } from '../../components/container/container.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent, ContainerComponent],
  templateUrl: './all-categories.component.html',
})
export class AllCategoriesComponent {
  categories = CATEGORIES;
}
