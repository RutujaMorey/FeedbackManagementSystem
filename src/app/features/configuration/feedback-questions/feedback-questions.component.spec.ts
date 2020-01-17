import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsComponent } from './feedback-questions.component';
import { ConfigurationService } from '../services/configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('FeedbackQuestionsComponent', () => {
  let component: FeedbackQuestionsComponent;
  let fixture: ComponentFixture<FeedbackQuestionsComponent>;
  let configurationService: ConfigurationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule
      ],
      providers: [ConfigurationService
      ],
      declarations: [FeedbackQuestionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getFeedBackQuestions', () => {
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'getFeedBackQuestions').and.returnValue(of([]));
    component.getFeedBackQuestions();
    expect(component.feedbackQuestions).toEqual([]);
  });
});
