import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ViewEventDetailsComponent } from './view-event-details.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ViewEventReportsService } from '../services/view-event-reports.service';
import { configureTestSuite } from 'ng-bullet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('ViewEventDetailsComponent', () => {
  let component: ViewEventDetailsComponent;
  let fixture: ComponentFixture<ViewEventDetailsComponent>;
  let viewEventReportsService: ViewEventReportsService;
  let ngxSpinnerService: NgxSpinnerService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, ReactiveFormsModule
      ],
      providers: [ViewEventReportsService, NgxSpinnerService
      ],
      declarations: [ViewEventDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getEventDetailedInfo', () => {
    const data = {
      eventID: 'string',
      month: 'string',
      baseLocation: 'string',
      beneficiaryName: 'string',
      venueAddress: 'string',
      councilName: 'string',
      project: 'string',
      category: 'string',
      eventName: 'string',
      eventDescription: 'string',
      eventDate: 'string',
      totalNoVolunteers: 'string',
      totalVolunteersHours: 'string',
      totalTravelHours: 'string',
      overallVolunteeringHours: 'string',
      livesImpacted: 'string',
      activityType: 'string',
      status: 'string',
      pocId: 'string',
      pocName: 'string',
      pocContactNumber: 'string'
    };
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    spyOn(viewEventReportsService, 'getEventDetailedInfo').and.returnValue(of(data));
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    component.getEventDetailedInfo('');
    expect(component.eventDetails).toEqual(data);
  });
  it('should getEventDetailedInfo else', () => {
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    spyOn(viewEventReportsService, 'getEventDetailedInfo').and.returnValue(throwError(Error));
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    component.getEventDetailedInfo('');
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should getEventFeedbackDetails', () => {
    const data = {
      feedbackType: 'Participated'
    }
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    spyOn(viewEventReportsService, 'getEventFeedbackDetails').and.returnValue(of(data));
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    component.getEventFeedbackDetails('');
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
});
