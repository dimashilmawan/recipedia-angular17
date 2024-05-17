import { Component, Input } from '@angular/core';
import { CATEGORIES_TYPE } from '../../constants/categories';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() cat!: CATEGORIES_TYPE;
  @Input() isCategoriesPage: boolean = false;

  faEllipsisH = faEllipsisH;
}
