import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBookmark as faBookmarkSolid,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { ContainerComponent } from '../container/container.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, ContainerComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  faBookmarkSolid = faBookmarkSolid;
  faBookmarkOutline = faBookmarkOutline;
  faXmarkCircle = faXmarkCircle;
  isOpen = false;

  modalService = inject(ModalService);
}
