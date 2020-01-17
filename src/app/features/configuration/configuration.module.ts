import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfigPmoComponent } from './config-pmo/config-pmo.component';
import { ConfigPocComponent } from './config-poc/config-poc.component';
import { ConfigurationService } from './services/configuration.service';
import { FeedbackQuestionsComponent } from './feedback-questions/feedback-questions.component';




@NgModule({
  declarations: [ConfigPmoComponent, ConfigPocComponent, FeedbackQuestionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  exports: [
    ConfigPocComponent
  ],
  providers: [ConfigurationService]
})
export class ConfigurationModule { }
