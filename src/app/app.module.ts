import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { DashboardService } from './features/dashboard/services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertsComponent } from './features/alerts/alerts.component';
import { EventsComponent } from './features/events/events.component';
import { ReportsComponent } from './features/reports/reports.component';
import { ConfigurationModule } from './features/configuration/configuration.module';
import { FeedbackFormsModule } from './features/feedback-forms/feedback-forms.module';
import { LoginService } from './features/login/services/login.service';
import { ConfigurationService } from './features/configuration/services/configuration.service';
import { ViewEventDetailsComponent } from './features/events/view-event-details/view-event-details.component';
import { SendEmailComponent } from './features/send-email/send-email.component';
import { InboxComponent } from './features/inbox/inbox.component';
import { SplitViewEventDetailsComponent } from './features/dashboard/split-view-event-details/split-view-event-details.component';
import { LocalStorageService } from './shared/local-storage-service.service';
import { CreateFeedbackFormsComponent } from './features/create-feedback-forms/create-feedback-forms.component';
import { FeedbackFormRoutingModule } from './features/feedback-forms/feedback-form-routing.moule';
import { GridFilterPipe } from './shared/pipes/GridFilterPipe.pipe';
import { EditFeedbackFormComponent } from './features/edit-feedback-form/edit-feedback-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewEventReportsService } from './features/events/services/view-event-reports.service';
import { SendEmailService } from './features/send-email/services/send-email.service';
import { FeedbackQuestionsComponent } from './features/feedback-questions/feedback-questions.component';
import { AuthguardGuard } from './shared/authguard.guard';

@NgModule({

  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AlertsComponent,
    EventsComponent,
    ReportsComponent,
    ViewEventDetailsComponent,
    SendEmailComponent,
    InboxComponent,
    SplitViewEventDetailsComponent,
    CreateFeedbackFormsComponent,
    GridFilterPipe,
    EditFeedbackFormComponent,
    FeedbackQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgbModule,
    StorageServiceModule,
    ConfigurationModule,
    FeedbackFormsModule,
    FeedbackFormRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [DashboardService, LoginService, ConfigurationService, LocalStorageService, ViewEventReportsService, SendEmailService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
