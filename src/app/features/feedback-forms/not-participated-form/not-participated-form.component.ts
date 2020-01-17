import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmitFeedbackService } from '../services/submit-feedback.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-not-participated-form',
  templateUrl: './not-participated-form.component.html',
  styleUrls: ['./not-participated-form.component.scss']
})
export class NotParticipatedFormComponent implements OnInit {
  isUpdating: boolean = false;

  loading = false;
  submitted = false;
  canSubscribe: boolean;
  question: string;
  answers: string[];
  eventId: string;
  email: string;
  notParticipatedReasonValue: string;
  constructor(public confirmationDialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder,
    private router: Router, private submitFeedbackService: SubmitFeedbackService, private changeDetector: ChangeDetectorRef,
    private readonly ngxSpinnerService: NgxSpinnerService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.ngxSpinnerService.show();
    this.canSubscribe = true

    this.activatedRoute.queryParams.subscribe((routeParams) => {
      this.eventId = routeParams.eventId;
      this.email = routeParams.email;
    });
    this.getFeedabckQuestionForEvent();
  }


  onReasonSelect(event: any) {
    this.notParticipatedReasonValue = event.target.textContent;

  }
  onResetNotParticpatedForm() {
    this.notParticipatedReasonValue = '';
  }

  getFeedabckQuestionForEvent() {
    this.ngxSpinnerService.show();
    const requestBody = {
      'eventId': this.eventId,
      'feedbackType': 'Not Participated',
      'questionType': '',
      'questionAnswers': []
    };
    this.submitFeedbackService.getFeedbackQuestionForEvent(requestBody)
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {
          if (data) {
            this.ngxSpinnerService.hide();
            this.question = data.questionAnswers.question,
              this.answers = data.questionAnswers.answers
          }
        }),
      (error: Error) => {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Error fetching feedback questions.`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });

      }
  }
  submitNotParticpatedFeedback(eventId: string) {
    this.isUpdating = true;
    this.ngxSpinnerService.show();
    this.loading = true;
    let notparticipatedFeedbackDetails = {
      eventId: this.eventId,
      email: this.email,
      notParticpatedReason: this.notParticipatedReasonValue

    };

    this.submitFeedbackService.sendNotParticipatedFeedback(notparticipatedFeedbackDetails).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          width: 400,
          title: 'Your feedback has been submitted successfully.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (error: Error) => {
      this.ngxSpinnerService.hide();
      this.loading = false;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: 400,
        title: 'Sending feedback failed. Please try later.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['notparticpated/form']);
    });

  }

  canDeactivate(): Observable<boolean> | boolean {

    if (!this.isUpdating && this.notParticipatedReasonValue.length > 1) {

      return this.confirmationDialogService.confirm();
    }
    return true;
  }

}
