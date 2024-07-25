import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-become-manager-page',
  standalone: true,
  imports: [],
  templateUrl: './become-manager-page.component.html',
  styleUrl: './become-manager-page.component.css'
})
export class BecomeManagerPageComponent {
constructor(private route:ActivatedRoute){}
}
