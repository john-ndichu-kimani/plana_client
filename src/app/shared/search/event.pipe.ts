import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../interfaces/event.interface';

@Pipe({
  name: 'event',
  standalone: true
})
export class EventPipe implements PipeTransform {

  transform(events: Event[], searchTerm: string, location: string): Event[] {
    if (!events || (!searchTerm && !location)) {
      return events;
    }

    return events.filter(event => {
      const textMatches = searchTerm
        ? (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      const locationMatches = location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true;

      return textMatches && locationMatches;
    });
  }
}
