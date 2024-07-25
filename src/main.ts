import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';  // Import your routes
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    BrowserAnimationsModule,
    importProvidersFrom(
      RouterModule.forRoot(routes), // Configure routing with routes
      BrowserAnimationsModule, // Add BrowserAnimationsModule
      ToastrModule.forRoot(),
      FullCalendarModule,
    ),
  ]
})
.catch((err) => console.error(err));
