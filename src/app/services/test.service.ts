import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class TestService {
  firstName = 'dimas';

  changeName() {
    this.firstName = 'hilmawan';
  }
}
