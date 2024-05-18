import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input({ required: true }) nextPage!: () => void;
  @Input({ required: true }) previousPage!: () => void;
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
}
