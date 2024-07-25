import { Component } from '@angular/core';
import { ManagerSidenavComponent } from './manager-sidenav/manager-sidenav.component';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [ManagerSidenavComponent,RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%', opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class ManagerComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
