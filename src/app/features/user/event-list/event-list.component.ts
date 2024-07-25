import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventService } from '../../../services/events/event.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Event } from '../../../interfaces/event.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { CountyService } from '../../../services/kenya/counties.service';
import { EventPipe } from '../../../shared/search/event.pipe';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/users/user-service.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FooterComponent, EventPipe, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class EventListComponent {
  events: Event[] = [];
  paginatedEvents: Event[] = [];
  currentPage: number = 1;
  eventsPerPage: number = 6;
  totalPages: number = 1;
  counties: string[] = [];
  searchTerm: string = '';
  selectedCounty: string = '';

  error:boolean = false;
  success:boolean = false;
  notificationMsg?:string = '';
  notificationErrorMsg?:string = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    private countyService: CountyService,
    private userService:UserService,

  ) {
    this.fetchCounties();
    this.fetchEvents();
  }

  private fetchCounties() {
    this.countyService.getCounties().subscribe(
      (data: string[]) => {
        this.counties = data; // Directly use the filtered county names
      },
      error => {
        console.error('Error fetching counties', error);
      }
    );
  }

  private fetchEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.events = res.events;
      this.totalPages = Math.ceil(this.events.length / this.eventsPerPage);
      this.updatePaginatedEvents();
    });
  }


  requestToBeEventOrganizer(){
   this.userService.requestToBeManager().subscribe((res)=>{
    if(res.message){
      this.notificationMsg = res.message
      this.success=true;
      setTimeout(()=>{
         this.success=false
      },3000)
      
    }
    else{
      this.notificationErrorMsg = res.error;
      this.error=true
      setTimeout(()=>{
        this.error=false
     },3000)
    }
   })
  }

  navigateToJoinManagerPage(){
   this.router.navigate(['user/events/join-manager']);
  }


  private filterEvents(): Event[] {
    let filteredEvents = this.events;

    if (this.searchTerm) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCounty) {
      filteredEvents = filteredEvents.filter(event =>
        event.location?.toLowerCase() === this.selectedCounty.toLowerCase()
      );
    }

    return filteredEvents;
  }

  searchEvents() {
    const filteredEvents = this.filterEvents();
    this.totalPages = Math.ceil(filteredEvents.length / this.eventsPerPage);
    this.currentPage = 1; // Reset to the first page
    this.paginatedEvents = filteredEvents.slice(0, this.eventsPerPage); // Display first page
  }

  updatePaginatedEvents() {
    const filteredEvents = this.filterEvents();
    const startIndex = (this.currentPage - 1) * this.eventsPerPage;
    const endIndex = startIndex + this.eventsPerPage;
    this.paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

  viewEventDetails(eventId: string) {
    this.router.navigate(['/user/book-event', eventId]);
  }
}
