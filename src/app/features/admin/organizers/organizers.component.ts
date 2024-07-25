import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestManager, UserService } from '../../../services/users/user-service.service';
import { User } from '../../../interfaces/user.interface';
import { FilterPipe } from '../../../shared/search/filter.pipe';

export interface OrganizerRequest {
    request_id: string;
    user_id: string;
    status: string;
    requested_at: Date;
    approved_at?: Date;
    rejected_at?: Date;
    user?: User;
}

@Component({
  selector: 'app-organizers',
  standalone: true,
  imports: [FooterComponent, CommonModule, FormsModule, FilterPipe],
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.css']  // corrected styleUrls
})
export class OrganizersComponent {
  requests: RequestManager[] = [];
  searchTerm: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {
    this.loadRequests();
  }

  loadRequests(): void {
    this.userService.getToBeManagerRequests().subscribe(
      (data) => {
     
        this.requests = data
      },
      (error) => {
        this.errorMessage = 'Failed to load requests';
        console.error('Error fetching requests', error);
      }
    );
  }

  approveRequest(requestId: string): void {
    this.userService.approveManagerRequest(requestId).subscribe({
      next: () => this.loadRequests(),
      error: (error) => console.error('Error approving request', error)
    });
  }

  rejectRequest(requestId: string): void {
    this.userService.rejectManagerRequest(requestId).subscribe({
      next: () => this.loadRequests(),
      error: (error) => console.error('Error rejecting request', error)
    });
  }

  filteredRequests(): RequestManager[] {
    if (!this.searchTerm) {
      return this.requests;
    }
    return this.requests.filter(request =>
      request.user?.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
