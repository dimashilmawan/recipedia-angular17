import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterState,
} from '@angular/router';
import { filter } from 'rxjs';
import { ContainerComponent } from '../container/container.component';
import { MobileNavComponent } from '../mobile-nav/mobile-nav.component';

import {
  faInfoCircle,
  faBookmark as faBookmarkSolid,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../services/modal.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ContainerComponent,
    MobileNavComponent,
    FontAwesomeModule,
    ModalComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  faInfoCircle = faInfoCircle;
  faBookmarkSolid = faBookmarkSolid;
  faBookmarkOutline = faBookmarkOutline;
  faBars = faBars;

  modalService = inject(ModalService);
  mobileService = inject(MobileService);

  links = [
    { title: 'Home', url: '/' },
    { title: 'Categories', url: '/categories' },
    { title: 'My Recipes', url: '/my-recipes' },
  ];

  isRecipeDetail!: boolean;

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.isRecipeDetail = (event as NavigationEnd).url.startsWith(
          '/recipes/',
        );
      });
  }
}
