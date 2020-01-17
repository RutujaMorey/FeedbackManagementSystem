import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AlertsComponent } from './features/alerts/alerts.component';
import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';

import { EventsComponent } from './features/events/events.component';
import { InboxComponent } from './features/inbox/inbox.component';
import { SendEmailComponent } from './features/send-email/send-email.component';
import { ViewEventDetailsComponent } from './features/events/view-event-details/view-event-details.component';
import { CreateFeedbackFormsComponent } from './features/create-feedback-forms/create-feedback-forms.component';
import { FeedbackFormRoutingModule } from './features/feedback-forms/feedback-form-routing.moule';
import { ParticipatedFormComponent } from './features/feedback-forms/participated-form/participated-form.component';
import { NotParticipatedFormComponent } from './features/feedback-forms/not-participated-form/not-participated-form.component';
import { UnregisteredFormComponent } from './features/feedback-forms/unregistered-form/unregistered-form.component';
import { ConfigPocComponent } from './features/configuration/config-poc/config-poc.component';
import { EditFeedbackFormComponent } from './features/edit-feedback-form/edit-feedback-form.component';
import { FeedbackQuestionsComponent } from './features/feedback-questions/feedback-questions.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: 'alerts', component: AlertsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'config/PMO', component: ConfigPocComponent },
  { path: 'config/POC', component: ConfigPocComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/viewdetails', component: ViewEventDetailsComponent },
  { path: 'reports', component: EventsComponent },
  { path: 'send-email', component: SendEmailComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'create/forms', component: CreateFeedbackFormsComponent, canDeactivate: [AuthguardGuard] },
  { path: 'edit/forms', component: EditFeedbackFormComponent, canDeactivate: [AuthguardGuard] },
  { path: 'get/questions', component: FeedbackQuestionsComponent },
  { path: 'participated/form', component: ParticipatedFormComponent, canDeactivate: [AuthguardGuard] },
  { path: 'notparticpated/form', component: NotParticipatedFormComponent, canDeactivate: [AuthguardGuard] },
  { path: 'unregistered/form', component: UnregisteredFormComponent, canDeactivate: [AuthguardGuard] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes), FeedbackFormRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
