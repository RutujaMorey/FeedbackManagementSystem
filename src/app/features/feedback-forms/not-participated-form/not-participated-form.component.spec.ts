import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotParticipatedFormComponent } from './not-participated-form.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitFeedbackService } from '../services/submit-feedback.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

describe('NotParticipatedFormComponent', () => {
  let component: NotParticipatedFormComponent;
  let fixture: ComponentFixture<NotParticipatedFormComponent>;
  const formBuilder = new FormBuilder();
  let registerForm: FormGroup;
  registerForm = formBuilder.group({
    eventId: ['', Validators.required],
    email: ['', Validators.required],
    notParticpatedReason: ['', Validators.required]

  });
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, ReactiveFormsModule
      ],
      providers: [SubmitFeedbackService, NgxSpinnerService, ConfirmationDialogService
      ],
      declarations: [NotParticipatedFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotParticipatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
