import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent,LandingComponent,RouterOutlet,FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%', opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LandingComponent {
    prepareRoute(outlet: RouterOutlet) {
      return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
