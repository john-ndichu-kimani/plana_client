import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/home/home.component';
import { AboutPageComponent } from './features/pages/about-page/about-page.component';
import { EventPageComponent } from './features/pages/event-page/event-page.component';
import { TestimonialPageComponent } from './features/pages/testimonial-page/testimonial-page.component';
import { ContactPageComponent } from './features/pages/contact-page/contact-page.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [

  {path:'home',component:HomeComponent,data: { animation: 'HomePage' }},
  {path:'about',component:AboutPageComponent,data: { animation: 'AboutPage' }},
  {path:'events',component:EventPageComponent},
  {path:'reviews', component:TestimonialPageComponent},
  {path:'contact',component:ContactPageComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}
];
