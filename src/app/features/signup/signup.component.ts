import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { takeWhile, finalize } from 'rxjs/operators';
import { SignupService } from './services/signup.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  userCredentailsFilePath: string = 'user-credentials.ts';
  userDetailsFilePath: string = 'user-details.json';
  canSubscribe: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, private signupService: SignupService, private changeDetector: ChangeDetectorRef,
    private ngxSpinnerService: NgxSpinnerService

  ) {

  }

  ngOnInit() {
    this.canSubscribe = true;
    this.ngxSpinnerService.show();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailaddress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.ngxSpinnerService.show();

    let userDetails = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      emailAddress: this.f.emailaddress.value,
      password: this.f.password.value,
      role: ''
    };


    if (userDetails.role === '') {
      userDetails.role = 'Participant';
    }
    this.signupService.createNewUser(userDetails).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        if (data.status === '201') {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            width: 400,
            title: 'You have been registerd to the Cognizant Outreach Successfully. Please login.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }, (error: Error) => {
      this.ngxSpinnerService.hide();

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        width: 400,
        title: 'Problem registering to Cognizant Outreach. Please try later.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['login']);
    });

  }
}
