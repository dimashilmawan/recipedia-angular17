import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { ContainerComponent } from './components/container/container.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MobileService } from './services/mobile.service';

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
export class AppComponent {
  title = 'recipedia-angular17';

  modalService = inject(ModalService);
  mobileService = inject(MobileService);
}
