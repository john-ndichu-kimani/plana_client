import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-attendees',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './attendees.component.html',
  styleUrl: './attendees.component.css'
})
export class AttendeesComponent {

}
