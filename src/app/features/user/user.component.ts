import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavComponent } from './nav/nav.component';
import { HeroComponent } from '../landing/hero/hero.component';
import { EventListComponent } from './event-list/event-list.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NavComponent,
    RouterOutlet,
    HeroComponent,
    EventListComponent,
    FooterComponent,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%', opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class UserComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
