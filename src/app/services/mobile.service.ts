import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  isOpen = false;

  openMobileNav() {
    this.isOpen = true;
  }

  closeMobileNav() {
    this.isOpen = false;
  }
}
