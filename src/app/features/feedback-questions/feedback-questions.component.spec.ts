import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsComponent } from './feedback-questions.component';
import { CreateFeedbackFormService } from '../create-feedback-forms/services/create-feedback-form.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { configureTestSuite } from 'ng-bullet';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


describe('FeedbackQuestionsComponent', () => {
  let component: FeedbackQuestionsComponent;
  let fixture: ComponentFixture<FeedbackQuestionsComponent>;
  const formBuilder = new FormBuilder();
  let addForm: FormGroup;
  let rows: FormArray;
  let config: any;
  addForm = formBuilder.group({
    items: [null, Validators.required],
    items_value: ['no', Validators.required]
  });
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 10
  };

  rows = formBuilder.array([]);
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, ReactiveFormsModule, NgxPaginationModule
      ],
      providers: [CreateFeedbackFormService, NgxSpinnerService
      ],
      declarations: [FeedbackQuestionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
