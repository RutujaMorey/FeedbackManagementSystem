import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditFeedbackFormComponent } from './edit-feedback-form.component';
import { CreateFeedbackFormService } from '../create-feedback-forms/services/create-feedback-form.service';
import { Router } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { configureTestSuite } from 'ng-bullet';
import { of, throwError } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

describe('EditFeedbackFormComponent', () => {
  let component: EditFeedbackFormComponent;
  let fixture: ComponentFixture<EditFeedbackFormComponent>;
  let createFeedbackFormService: CreateFeedbackFormService;
  let ngxSpinnerService: NgxSpinnerService;
  let editForm: FormGroup;
  let itemForm: FormGroup;
  const formBuilder = new FormBuilder();
  const rows = formBuilder.array([]);
  editForm = formBuilder.group({
    allowMultipleQuestion: [],
    freeTextAnswer: [],
    customQuestion: [],
    participatedOpt: [],
    notparticipatedOpt: [],
    unregisteredOpt: [],
    question: []
  });

  class RouterStub {
    getCurrentNavigation() {
      return {
        extras: {
          state: {
            rowToEdit: {
              feedbackType: 'someId',
              eventId: 'eventId',
              question: 'question',
              answers: []
            }
          }
        }
      }
    }
    navigate() { }
  }

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, ReactiveFormsModule
      ],
      providers: [CreateFeedbackFormService, ConfirmationDialogService, NgxSpinnerService, { provide: Router, useClass: RouterStub }
      ],
      declarations: [EditFeedbackFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeedbackFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should onRemoveRow', () => {
    component.onRemoveRow(0);
    expect(component.onRemoveRow).toBeTruthy();
  });
  it('should createItemFormGroup', () => {
    const i = 0;
    const answer = 'answer';
    const result = component.createItemFormGroup(i, answer);
    expect(result.controls['name'].value).toEqual('answer0');
  });
  it('should onCheck', () => {
    const event = {
      target: {
        value: 'test'
      }
    }
    component.onCheck(event);
    expect(component.questionType).toEqual('test');
  });
  it('should editFeedbackForm', () => {
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'editFeedbackForm').and.returnValue(of(''));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.editFeedbackForm();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should editFeedbackForm else', () => {
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'editFeedbackForm').and.returnValue(throwError(Error));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.editFeedbackForm();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should onCancel', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should populateEditForm', () => {
    const rowToEdit = {
      question: 'list',
      answers: ['test']

    }
    component.populateEditForm(rowToEdit);
    expect(component.question).toEqual('list');
  });
  it('should deleteQuestion', () => {
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'deleteFeedbackForm').and.returnValue(of(''));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.deleteQuestion();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should deleteQuestion else', () => {
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'deleteFeedbackForm').and.returnValue(throwError(Error));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.deleteQuestion();
    expect(router.navigate).toHaveBeenCalled();
  });
});
