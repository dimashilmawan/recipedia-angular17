import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  firstName = 'dimas';

  changeName() {
    this.firstName = 'hilmawan';
  }
}
