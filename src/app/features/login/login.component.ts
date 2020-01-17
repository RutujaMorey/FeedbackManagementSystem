import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  canSubscribe: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private changeDetector: ChangeDetectorRef, private ngxSpinnerService: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.ngxSpinnerService.show();
    if (localStorage.getItem('Role')) {
      localStorage.clear();
    }
    this.loginForm = new FormGroup({
      emailaddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      checkbox: new FormControl()
    });

    this.canSubscribe = true;
  }

  get emailaddress() {
    return this.loginForm.get('emailaddress');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.ngxSpinnerService.show();
    this.submitted = true;
    this.loading = true
    if (this.loginForm.invalid) {
      return;
    }

    const request = {
      email: this.emailaddress.value,
      password: this.password.value
    }

    this.loginService.getUserCredentials(request)
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {
          if (data) {
            this.ngxSpinnerService.hide();
            this.loading = false;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Login successful !!!',
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });


            if (data.role === 'Admin') {
              this.saveInLocal('Role', 'Admin');
              this.router.navigate(['dashboard']);
            } else if (data.role === 'Pmo') {
              this.saveInLocal('Role', 'Pmo');
              this.router.navigate(['dashboard']);
            } else if (data.role === 'Poc') {
              this.saveInLocal('Role', 'Poc');
              this.router.navigate(['dashboard']);
            } else if (data.role === 'Participant') {
              this.saveInLocal('Role', 'Participant');
              this.router.navigate(['dashboard']);
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No Role configured for you.!!!',
                showConfirmButton: false,
                timer: 1500,
                width: 400,
              });

            }

          } else {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              width: 400,
              title: 'You are Unauthorized to login!!!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
          (error: Error) => {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              width: 400,
              title: 'Error while logging. Please try again later!!!',
              showConfirmButton: false,
              timer: 1500
            });
          });

  }
  saveInLocal(key, val): void {
    localStorage.setItem(key, val);
  }
  encryptPassword() {

  }

}
