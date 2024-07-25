import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from "./header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,FooterComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%', opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AdminComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
