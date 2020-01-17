import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeedbackFormRoutingModule } from './feedback-form-routing.moule';
import { UnregisteredFormComponent } from './unregistered-form/unregistered-form.component';
import { ParticipatedFormComponent } from './participated-form/participated-form.component';
import { NotParticipatedFormComponent } from './not-participated-form/not-participated-form.component';
import { FeedbackFormsComponent } from './feedback-forms.component';



@NgModule({
  declarations: [UnregisteredFormComponent, ParticipatedFormComponent, NotParticipatedFormComponent, FeedbackFormsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FeedbackFormRoutingModule]
})
export class FeedbackFormsModule { }
