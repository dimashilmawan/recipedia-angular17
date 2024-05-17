import { Component, Input } from '@angular/core';
import { CATEGORIES_TYPE } from '../../constants/categories';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() cat!: CATEGORIES_TYPE;

  faEllipsisH = faEllipsisH;
}
