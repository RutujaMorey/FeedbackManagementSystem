import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxSpinnerService } from 'ngx-spinner';

import { CreateFeedbackFormsComponent } from './create-feedback-forms.component';
import { CreateFeedbackFormService } from './services/create-feedback-form.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

describe('CreateFeedbackFormsComponent', () => {
  let component: CreateFeedbackFormsComponent;
  let fixture: ComponentFixture<CreateFeedbackFormsComponent>;
  let httpTestingController: HttpTestingController;
  const formBuilder: FormBuilder = new FormBuilder();
  let ngxSpinnerService: NgxSpinnerService;
  let createFeedbackFormService: CreateFeedbackFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule
      ],
      providers: [NgxSpinnerService, CreateFeedbackFormService, ConfirmationDialogService
      ],
      declarations: [CreateFeedbackFormsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeedbackFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.feedbackQuestions).toEqual([]);
    expect(component.canSubscribe).toEqual(true);
  });
  it('should pageChanged', () => {
    component.pageChanged({});
    expect(component.config.currentPage).toEqual({});
  });
  it('should onAddRow', () => {
    const rows = formBuilder.array([]);
    rows.push(formBuilder.group({
      name: `answer${0}`,
      answer: []
    }));
    component.onAddRow();
    expect(component.onAddRow).toBeTruthy();
  });
  it('should onRemoveRow', () => {
    const rows = formBuilder.array([]);
    rows.push(formBuilder.group({
      name: `answer${0}`,
      answer: []
    }));
    component.onRemoveRow(1);
    expect(component.onRemoveRow).toBeTruthy();
  });
  it('should onOptionChange', () => {
    const event = {
      target: {
        value: 'test'
      }
    }
    component.onOptionChange(event);
    expect(component.feedbackType).toEqual('test');
  });
  it('should createItemFormGroup', () => {
    const formGroup = component.createItemFormGroup(1);
    expect(formGroup.controls['name'].value).toEqual('answer1');
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
  it('should createFeedbackForm', () => {
    const rows = formBuilder.array([]);
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'createFeedbackForm').and.returnValue(of(''));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.createFeedbackForm();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should createFeedbackForm else', () => {
    const rows = formBuilder.array([]);
    rows.controls.length = 10;
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'createFeedbackForm').and.returnValue(throwError(Error));
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.createFeedbackForm();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should onCancel', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should getFeedbackForm', () => {
    const data = [{
      questionAnswers: {
        question: '',
        answers: ['test', 'tests']
      },
      feedbackType: ''
    }];
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'getAllFormQuestions').and.returnValue(of(data));
    component.getFeedbackForm();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should getFeedbackForm error', () => {
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    spyOn(createFeedbackFormService, 'getAllFormQuestions').and.returnValue(throwError(Error));
    component.getFeedbackForm();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should fetchFormToEdit', () => {
    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.fetchFormToEdit('');
    expect(router.navigate).toHaveBeenCalled();
  });
  xit('should deleteQuestion', () => {
    component.rowToEdit.eventId = 'jcnt';
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
