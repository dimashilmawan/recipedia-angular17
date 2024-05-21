import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContainerComponent } from '../container/container.component';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    ContainerComponent,
    NgOptimizedImage,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  faCircleChevronDown = faCircleChevronDown;
}
