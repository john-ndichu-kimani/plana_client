import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/home/home.component';
import { AboutPageComponent } from './features/pages/about-page/about-page.component';
import { EventPageComponent } from './features/pages/event-page/event-page.component';
import { TestimonialPageComponent } from './features/pages/testimonial-page/testimonial-page.component';
import { ContactPageComponent } from './features/pages/contact-page/contact-page.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { AdminComponent } from './features/admin/admin.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { EventsManageComponent } from './features/manager/events-manage/events-manage.component';
import { AttendeesComponent } from './features/admin/attendees/attendees.component';
import { LogoutComponent } from './features/admin/logout/logout.component';
import { ProfileComponent } from './features/admin/profile/profile.component';
import { ChatComponent } from './features/admin/chat/chat.component';
import { OrganizersComponent } from './features/admin/organizers/organizers.component';
import { UserComponent } from './features/user/user.component';
import { PasswordResetComponent } from './features/password-reset/password-reset.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { EventDetailsComponent } from './features/pages/event-details/event-details.component';
import { ManagerComponent } from './features/manager/manager.component';
import { EventListComponent } from './features/user/event-list/event-list.component';
import { TicketsComponent } from './features/manager/tickets/tickets.component';
import { TicketService } from './services/ticket/ticket-service.service';
import { ReportsComponent } from './features/admin/reports/reports.component';
import { HeroComponent } from './features/landing/hero/hero.component';
import { BookingsComponent } from './features/user/bookings/bookings.component';
import { ApproveEventComponent } from './features/admin/approve-event/approve-event.component';
import { animation } from '@angular/animations';
import { BookEventTicketComponent } from './features/user/book-event-ticket/book-event-ticket.component';
import { BecomeManagerPageComponent } from './features/user/become-manager-page/become-manager-page.component';

export const routes: Routes = [
  // Landing routes
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'about',
    component: AboutPageComponent,
    data: { animation: 'AboutPage' },
  },
  { path: 'events', component: EventPageComponent,data:{animation:'eventLandingPage'} },
  { path: 'view-details', component: EventDetailsComponent,data:{animation:'eventLandingPage'}  },
  { path: 'reviews', component: TestimonialPageComponent,data:{animation:'reviewsLandingPage'}  },
  { path: 'contact', component: ContactPageComponent,data:{animation:'contactLandingPage'}  },
  { path: 'register', component: RegisterComponent,data:{animation:'registerPage'}  },
  { path: 'login', component: LoginComponent,data:{animation:'loginPage'}  },
  { path: 'reset', component: PasswordResetComponent,data:{animation:'resetPage'}  },

  // Admin dashboard routes
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path:
        'dashboard',
        component: DashboardComponent,
        data:{animation:'dashboardPage'},
      },

      { path: 'approve-event', component: ApproveEventComponent,data:{animation:'approvePage'} },
      { path: 'organizers', component: OrganizersComponent,data:{animation:'organizerPage'} },
      { path: 'attendees', component: AttendeesComponent,data:{animation:'attendeesPage'} },
      { path: 'profile', component: ProfileComponent,data:{animation:'profilePage'} },
      { path: 'reports', component: ReportsComponent,data:{animation:'reportPage'} },
      { path: 'chats', component: ChatComponent,data:{animation:'chatsPage'} },
      { path: 'logout', component: LogoutComponent,data:{animation:'logoutPage'} },
    ],
  },

  // User dashboard routes
  {
    path: 'user',
    component: UserComponent,
    data: { animation: 'UserPage' },
    children: [
      {
        path: 'events',
        component: EventListComponent,
        data: { animation: 'EventsPage' },
      },
      {
        path: 'bookings',
        component: BookingsComponent,
        data: { animation: 'BookingsPage' },
      },
      {
        path: 'chats',
        component: ChatComponent,
        data: { animation: 'ChatsPage' },
      },

      {
        path: 'logout',
        component: LogoutComponent,
        data: { animation: 'LogoutPage' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { animation: 'ProfilePage' },
      },
      // {
      //   path: 'join-manager',
      //   component:BecomeManagerPageComponent,
      //   data: { animation: 'ManagerJoinPage' },
      // },
      { path: '', redirectTo: 'events', pathMatch: 'full' },
     // Add this to your routes configuration
{
  path: 'book-event/:event_id',
  component: BookEventTicketComponent,
  data: { animation: 'BookEventPage' }
}

    ],
  },



  // Manager dashboard routes
  {
    path: 'manager',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      { path: 'events', component: EventsManageComponent,data:{animation:'managereventPage'} },
      { path: 'attendees', component: AttendeesComponent ,data:{animation:'managerattendeePage'}},
      { path: 'tickets', component: TicketsComponent,data:{animation:'managerticketPage'} },
      { path: 'chats', component: ChatComponent,data:{animation:"managerchatPage"} },
      { path: 'logout', component: LogoutComponent,data:{animation:'managerlogoutPage'} },
      { path: 'profile', component: ProfileComponent,data:{animation:'managerProfile'} },
    ],
  },

  // Default and wildcard routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
