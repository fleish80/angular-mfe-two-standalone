import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShareLibService, SharedPlatformService, SharedRootService } from 'share-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    Mfe Standalone
    <ul>
      <li><button (click)="sendData()">Send data to shared service</button></li>
      <li><button (click)="sendText()">Send data to platform service</button></li>
      <li><button (click)="sendToRoot()">Send data to root service</button></li>
    </ul>
    <ul>
    <li>{{ sharedText$ | async }}</li>
    <li>{{ platformText$ | async }}</li>
    <li>{{ rootText$ | async }}</li>
    </ul>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  #shareLibService = inject(ShareLibService);
  #sharedPlatformService = inject(SharedPlatformService);
  #sharedRootService = inject(SharedRootService);

  sharedText$ = this.#shareLibService.text$;
  platformText$ = this.#sharedPlatformService.text$;
  rootText$ = this.#sharedRootService.text$;

  sendData() {
    this.#shareLibService.addName('mfe two standalone');
  }

  sendText() {
    this.#sharedPlatformService.addName('mfe two standalone');
  }

  sendToRoot() {
    this.#sharedRootService.addName('mfe two standalone');
  }
}
