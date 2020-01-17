import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { takeWhile, finalize } from 'rxjs/operators';
import { SubmitFeedbackService } from '../services/submit-feedback.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

@Component({
  selector: 'app-participated-form',
  templateUrl: './participated-form.component.html',
  styleUrls: ['./participated-form.component.scss']
})
export class ParticipatedFormComponent implements OnInit {
  isUpdating: boolean = false;
  registerForm: FormGroup;
  loading = false;
  eventId: any;
  email: any;
  submitted = false;
  canSubscribe: boolean;
  selectedRating: number;
  ratingMap = new Map([
    ['poorestRating', 1],
    ['poorRating', 2],
    ['averageRating', 3],
    ['goodRating', 4],
    ['excellentRating', 5],
  ]);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private submitFeedbackService: SubmitFeedbackService, private changeDetector: ChangeDetectorRef
    , private activatedRoute: ActivatedRoute, private readonly ngxSpinnerService: NgxSpinnerService, private readonly confirmationDialogService: ConfirmationDialogService
  ) { }


  ngOnInit() {
    this.canSubscribe = true;
    this.ngxSpinnerService.show();
    this.activatedRoute.queryParams.subscribe((routeParams) => {
      this.eventId = routeParams.eventId;
      this.email = routeParams.email;
    });
    this.registerForm = this.formBuilder.group({
      improvements: ['', Validators.required],
      likes: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }
  onRatingClick(ratingKey: any) {
    this.selectedRating = this.ratingMap.get(ratingKey);

  }
  onLikesKey(event: any) {
  }
  onImprovementsKey(event: any) {
  }

  submitParticpatedFeedback(eventId: string) {
    this.isUpdating = true;
    this.ngxSpinnerService.show();
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    let participatedFeedbackDetails = {
      eventId: this.eventId,
      email: this.email,
      rating: this.selectedRating,
      improvements: this.f.improvements.value,
      likes: this.f.likes.value
    };


    this.submitFeedbackService.sendParticipatedFeedback(participatedFeedbackDetails).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        if (data.status === '201') {
          this.loading = false;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your feedback has been submitted successfully.',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['alerts']);
        }
      }
    }, (error: Error) => {
      this.loading = false;
      this.ngxSpinnerService.hide();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sending feedback failed. Please try later.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['particpated/form']);
    });

  }
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isUpdating && this.registerForm.dirty) {
      return this.confirmationDialogService.confirm();
    }
    return true;
  }


}
