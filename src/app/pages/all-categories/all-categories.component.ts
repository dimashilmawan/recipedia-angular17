import { Component, inject } from '@angular/core';
import { CATEGORIES } from '../../constants/categories';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { ContainerComponent } from '../../components/container/container.component';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryCardComponent, ContainerComponent],
  templateUrl: './all-categories.component.html',
})
export class AllCategoriesComponent {
  categories = CATEGORIES;

  // testService = inject(TestService);
}
