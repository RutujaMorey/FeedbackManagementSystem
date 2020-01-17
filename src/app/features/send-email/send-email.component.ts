import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewEventReportsService } from '../events/services/view-event-reports.service';
import {
  takeWhile, finalize
} from 'rxjs/operators';

import Swal from 'sweetalert2';
import { SendEmailService } from './services/send-email.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  autoComposedEmailBody: Document;
  autoComposeInput: string;
  canSubscribe: boolean;
  subject: string;
  sendToEmailAddress: string;
  receiveFromEmailAddress: string = 'Omar.Kinksley@cognizant.com'

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute, private readonly sendEmailService: SendEmailService,
    private readonly changeDetector: ChangeDetectorRef, private readonly ngxSpinnerService: NgxSpinnerService) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation != null && navigation.extras != null && navigation.extras.state != null) {
      const state = navigation.extras.state as {
        composeDetails: string
      };
      this.autoComposeInput = state.composeDetails;
      this.sendToEmailAddress = this.autoComposeInput['emailAddress'];
      this.subject = `Feedback Required for Outreach event ${this.autoComposeInput['eventName']}`
    }
  }

  ngOnInit() {

    this.canSubscribe = true;
    this.callComposeEmailService(this.autoComposeInput);

  }
  callComposeEmailService(composeDetails: any): any {
    this.ngxSpinnerService.show();
    this.sendEmailService.getEmailBody(composeDetails).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();



        this.autoComposedEmailBody = this.toHTML(data.response);

      }
    }, (error: Error) => {
      this.ngxSpinnerService.hide();
    });
  }

  toHTML(input): any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }
  onSendEmail() {
    this.ngxSpinnerService.show();
    const sendEmailBody = {
      'receiveFromEmailAddress': this.receiveFromEmailAddress,
      'sendToEmailAddresses': [this.sendToEmailAddress],
      'subject': this.subject,
      'body': this.autoComposedEmailBody
    }
    this.sendEmailService.sendEmail(sendEmailBody).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      this.ngxSpinnerService.hide();
      if (data) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Email sent successfully.`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });
      }
    }, (error: Error) => {
      this.ngxSpinnerService.hide();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error sending mail. Please try later.`,
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      });
    });

  }

}
