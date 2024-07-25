import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/users/user-service.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; // Use FormGroup type for profileForm
  profilePictureUrl: string = '';
  isEditing: boolean = false;
  isLoading: boolean = false;
  updateSuccess: boolean = false;
  successMessage: string = '';
  updateError: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      profile_picture_url: ['']
    });

    this.loadProfile();
    this.profileForm.disable(); // Initially disable the form
  }

  loadProfile(): void {
    this.userService.getUserProfile().subscribe(
      (response: { profile: User }) => {
        const userProfile = response.profile;
        this.profileForm.patchValue(userProfile);
        this.profilePictureUrl = userProfile.profile_picture_url || '';
        this.cdr.detectChanges(); // Trigger change detection after updating the form
      },
      error => {
        console.error('Error loading profile', error);
      }
    );
  }

  enableEditing(): void {
    this.isEditing = true;
    this.profileForm.enable(); // Enable form controls
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.profileForm.disable();
    this.loadProfile(); // Reload the profile to reset the form
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  saveProfile(): void {


    const updatedProfile: User = this.profileForm.value;

    if (!updatedProfile.profile_picture_url) {
      updatedProfile.profile_picture_url = 'path/to/default/avatar/image.png'; // Set the path to your default avatar image
    }

    this.isLoading = true;




    this.userService.updateProfile(updatedProfile).subscribe(
      (response: { message: string, updatedProfile: User }) => {
        this.isLoading = false;
        this.updateSuccess = true;
        this.successMessage = response.message; // Use the message from the response
        this.isEditing = false;

        // Update form with the latest profile data
        this.profileForm.patchValue(response.updatedProfile);

        console.log(response);

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.updateSuccess = false;
        }, 3000);
      },
      error => {
        this.isLoading = false;
        this.updateError = true;
        this.errorMessage = 'Failed to update profile.';
        console.error('Error updating profile', error);

        // Hide error message after 3 seconds
        setTimeout(() => {
          this.updateError = false;
        }, 3000);
      }
    );
  }


  getImagesUrl(event: any): void {
    this.isLoading = true;
    const files = event.target.files;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('upload_preset', 'plana_project');
      formData.append('cloud_name', 'day0akv3d');

      fetch('https://api.cloudinary.com/v1_1/day0akv3d/image/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        this.profilePictureUrl = res.url;
        this.profileForm.patchValue({ profile_picture_url: this.profilePictureUrl });
        this.isLoading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      })
      .catch(() => {
        this.isLoading = false;
        this.cdr.detectChanges(); // Manually trigger change detection
      });
    }
  }

  onProfilePictureClick(): void {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
