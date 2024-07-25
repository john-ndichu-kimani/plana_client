import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../../services/events/event.service';
import { Event } from '../../../interfaces/event.interface';
import { FilterPipe } from '../../../shared/search/filter.pipe';

@Component({
  selector: 'app-events-manage',
  standalone: true,
  imports: [FooterComponent, CommonModule, ReactiveFormsModule, FormsModule,FilterPipe],
  templateUrl: './events-manage.component.html',
  styleUrls: ['./events-manage.component.css'],
})
export class EventsManageComponent {
  events: Event[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  eventForm!: FormGroup;
  isLoading = false;
  isUpdateMode = false;
  imageUrl: string | null = null;
  error = false;
  success = false;
  successMsg = '';
  errorMsg = '';
  selectedEventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.initializeForm();
    this.fetchEvents();
  }

  private initializeForm() {
    this.eventForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      location: [null, Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      images: [''],
    });
  }

  onImageSelect(event: any) {
    this.isLoading = true;
    const files = event.target.files;

    if (files && files.length > 0) {
      this.uploadImage(files[0]);
    } else {
      this.isLoading = false;
    }
  }

  openCreateModal(): void {
    this.isUpdateMode = false;
    this.resetForm();
    this.showModal();
  }

  openUpdateModal(eventId: string): void {
    this.isUpdateMode = true;
    this.selectedEventId = eventId;
    this.eventService.getEventById(eventId).subscribe(
      event => {
        this.eventForm.patchValue(event);
        this.showModal();
      },
      error => this.handleError('Failed to load event details.')
    );
  }

  resetForm(): void {
    this.eventForm.reset();
  }

  showModal(): void {
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      (modalElement as any).classList.add('show');
    }
  }

  closeModal() {
    // Hide the modal
    document.getElementById('crud-modal')?.classList.add('hidden');
    this.eventForm.reset(); // Reset form
    this.selectedEventId = null;
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'plana_project');
    formData.append('cloud_name', 'day0akv3d');

    fetch('https://api.cloudinary.com/v1_1/day0akv3d/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (res.url) {
          this.imageUrl = res.url;
          this.handleSuccess('Image uploaded successfully');
        } else {
          this.handleError('Image upload failed');
        }
      })
      .catch(() => this.handleError('Image upload failed'))
      .finally(() => (this.isLoading = false));
  }

  private handleError(message: string) {
    this.error = true;
    this.errorMsg = message;
    setTimeout(() => {
      this.error = false;
      this.errorMsg = '';
    }, 2000);
  }

  private handleSuccess(message: string) {
    this.success = true;
    this.successMsg = message;
    setTimeout(() => {
      this.success = false;
      this.successMsg = '';
    }, 2000);
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      res => {
        this.events = res.events;
      },
      error => this.handleError('Failed to fetch events')
    );
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      const { date, time, ...rest } = this.eventForm.value;

      if (date && time) {
        const isoDateTime = this.combineDateAndTime(date, time);
        const eventData = { ...rest, date: isoDateTime, time: isoDateTime };

        if (this.isUpdateMode && this.selectedEventId) {
          this.eventService.updateEvent(this.selectedEventId, eventData).subscribe(
            () => {
              this.handleSuccess('Event updated successfully.');
              this.fetchEvents();
              this.closeModal();
            },
            error => this.handleError('Failed to update event.')
          );
        } else {
          this.eventService.createEvent(eventData).subscribe(
            () => {
              this.handleSuccess('Event created successfully.');
              this.fetchEvents();
              this.closeModal();
            },
            error => this.handleError('Failed to create event.')
          );
        }
      } else {
        this.handleError('Date and time are required.');
      }
    }
  }

  private combineDateAndTime(dateStr: string, timeStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    return date.toISOString();
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          this.handleSuccess('Event deleted successfully.');
          this.fetchEvents();
        },
        error => this.handleError('Failed to delete event.')
      );
    }
  }
}
