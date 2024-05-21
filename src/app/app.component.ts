import { Component, OnInit, inject } from '@angular/core';
import {
  EventType,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ContainerComponent } from './components/container/container.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MobileService } from './services/mobile.service';
import { ViewportScroller } from '@angular/common';
import { RecipeService } from './services/recipe.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    ContainerComponent,
    ModalComponent,
    MobileNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'recipedia-angular17';

  constructor(
    public modalService: ModalService,
    public mobileService: MobileService,
    private recipeService: RecipeService,
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd && !event.url.startsWith('/?')) {
          this.viewportScroller.scrollToPosition([0, 0]);
        } else {
          this.viewportScroller.scrollToAnchor('search');
        }
      });

    this.recipeService.loadRecipesFromLocalStorage();
  }
}
