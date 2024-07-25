import { Injectable } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('300ms', style({ opacity: 0 })),
    ]),
  ]);
}
