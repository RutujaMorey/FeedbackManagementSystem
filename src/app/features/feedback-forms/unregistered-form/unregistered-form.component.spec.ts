import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredFormComponent } from './unregistered-form.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitFeedbackService } from '../services/submit-feedback.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

describe('UnregisteredFormComponent', () => {
  let component: UnregisteredFormComponent;
  let fixture: ComponentFixture<UnregisteredFormComponent>;


  const formBuilder = new FormBuilder();
  let registerForm: FormGroup;
  registerForm = formBuilder.group({
    improvements: ['', Validators.required],
    likes: ['', Validators.required]

  });
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, ReactiveFormsModule
      ],
      providers: [SubmitFeedbackService, NgxSpinnerService, ConfirmationDialogService
      ],
      declarations: [UnregisteredFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});