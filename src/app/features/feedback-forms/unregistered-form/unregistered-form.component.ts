import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmitFeedbackService } from '../services/submit-feedback.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { configureTestSuite } from 'ng-bullet';

@Component({
  selector: 'app-unregistered-form',
  templateUrl: './unregistered-form.component.html',
  styleUrls: ['./unregistered-form.component.scss']
})
export class UnregisteredFormComponent implements OnInit {

  unregisterFeedbackForm: FormGroup;
  loading = false;
  isUpdating: boolean = false;
  canSubscribe: boolean;
  unregisterationReasonValue: string;
  eventId: string;
  email: string;
  question: string;
  answers: string[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private submitFeedbackService: SubmitFeedbackService, private changeDetector: ChangeDetectorRef
    , private activatedRoute: ActivatedRoute, private ngxSpinnerService: NgxSpinnerService, private readonly confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit() {
    this.ngxSpinnerService.show();
    this.canSubscribe = true;
    this.activatedRoute.queryParams.subscribe((routeParams) => {
      this.eventId = routeParams.eventId;
      this.email = routeParams.email;
    });
    this.getFeedabckQuestionForEvent();
  }

  onReasonSelect(event: any) {
    this.unregisterationReasonValue = event.target.textContent;

  }
  onResetUnregisteredForm() {
    this.unregisterationReasonValue = ''

  }
  submitUnregisteredFeedback(eventId: string) {
    this.isUpdating = true;
    this.ngxSpinnerService.show();
    this.loading = true;
    let unregistredFeedbackDetails = {
      eventId: this.eventId,
      email: this.email,
      unregisteredReason: this.unregisterationReasonValue

    };


    this.submitFeedbackService.sendUnregisteredFeedback(unregistredFeedbackDetails).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
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
      this.router.navigate(['unregistered/form']);
    });

  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isUpdating && this.unregisterFeedbackForm.dirty) {
      return this.confirmationDialogService.confirm();
    }
    return true;
  }
  getFeedabckQuestionForEvent() {
    this.ngxSpinnerService.show();
    const requestBody = {
      'eventId': this.eventId,
      'feedbackType': 'Unregistered',
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
}
