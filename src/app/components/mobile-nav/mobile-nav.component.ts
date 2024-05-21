import { Component, inject } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [FontAwesomeModule, ModalComponent, RouterLink, RouterLinkActive],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
})
export class MobileNavComponent {
  faBars = faBars;
  faCircleXmark = faCircleXmark;

  links = [
    { title: 'Home', url: '/' },
    { title: 'Category', url: '/category' },
    { title: 'My Recipes', url: '/my-recipes' },
  ];

  mobileService = inject(MobileService);
}
