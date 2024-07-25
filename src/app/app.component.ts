import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnimationService } from './services/animation.service';  // Ensure this path is correct

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],  // Import RouterOutlet for standalone component setup
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'absolute', width: '100%' }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend';

  constructor(private router: Router, private animationService: AnimationService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Re-initialize Flowbite components here
        initFlowbite();
      }
    });
  }

  ngAfterViewInit() {
    // Initial Flowbite initialization
    initFlowbite();
  }

  // Method to prepare route for animations
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
