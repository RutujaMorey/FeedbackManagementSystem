import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { EventsComponent } from './events.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ViewEventReportsService } from './services/view-event-reports.service';
import { configureTestSuite } from 'ng-bullet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  const formBuilder = new FormBuilder();
  let eventListForm: FormGroup;
  let compsoseEmailForm: FormGroup;
  let viewEventReportsService: ViewEventReportsService;
  let ngxSpinnerService: NgxSpinnerService;
  eventListForm = formBuilder.group({
    eventIdSearch: [''],
    monthSearch: [''],
    baseLocationSearch: [''],
    beneficiaryNameSearch: [''],
    venueAddressSearch: [''],
    councilNameSearch: [''],
    projectSearch: [''],
    categorySearch: [''],
    eventNameSearch: [''],
    eventDescriptionSearch: [''],
    eventDateSearch: [''],
    totalNoVolunteersSearch: [''],
    totalVolunteersHoursSearch: [''],
    totalTravelHoursSearch: [''],
    overallVolunteeringHoursSearch: [''],
    livesImpactedSearch: [''],
    activityTypeSearch: [''],
    statusSearch: [''],
    POCIDSearch: [''],
    POCNameSearch: [''],
    POCContactNumberSearch: ['']
  });
  compsoseEmailForm = formBuilder.group({
    feedbackType: ['', Validators.required],
    recipientEmail: ['', Validators.required],
    eventId: ['', Validators.required]
  });

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, ReactiveFormsModule, NgxPaginationModule
      ],
      providers: [ViewEventReportsService, NgxSpinnerService
      ],
      declarations: [EventsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getEventReports', () => {
    const data = [{
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
    }]
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    spyOn(viewEventReportsService, 'getEventReports').and.returnValue(of(data));
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    component.getEventReports();
    expect(component.eventData).toEqual(data);
  });
  it('should getEventReports else', () => {
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    spyOn(viewEventReportsService, 'getEventReports').and.returnValue(throwError(Error));
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    component.getEventReports();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should onSearchChange', () => {
    spyOn(component, 'searchInputListener');
    spyOn(component.userInputSearchSubject, 'next');
    component.onSearchChange();
    expect(component.searchInputListener).toHaveBeenCalled();
  });
  it('should pageChanged', () => {
    component.pageChanged({});
    expect(component.config.currentPage).toEqual({});
  });
  it('should searchInputListener', () => {
    component.searchInputListener();
    expect(component.searchInputListener).toBeTruthy();
  });
  it('should exportToExcel', () => {
    spyOn(component, 'getEventReports');
    spyOn(component, 'getxlsx');
    component.exportToExcel();
    expect(component.getxlsx).toHaveBeenCalled();
  });
  it('should onRowSelect', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onRowSelect({});
    expect(component.isSplitPanelOpen).toEqual(true);
  });
  it('should onSendMail', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onSendMail();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should onClearFilters', () => {
    component.onClearFilters();
    expect(component.onClearFilters).toBeTruthy();
  });
  it('should getEmailBody', () => {
    spyOn(component, 'enrichEventDetails');
    component.getEmailBody();
    expect(component.getEmailBody).toBeTruthy();
  });
  // it('should enrichEventDetails', () => {
  //   const data = {
  //     EventID: '568',
  //      Month: 'Jan', 
  //      BaseLocation: 'Salem',
  //   BeneficiaryName: 'Rutuja',
  //   VenueAddress: '48, bazaar st, Salem',
  //   CouncilName: 'FSE',
  //   Project: 'fse',
  //   Category: 'development',
  //   EventName: 'developing',
  //   EventDescription: 'Thank you for all your donations',
  //   EventDate: '15-12-18',
  //   TotalNoVolunteers: 21,
  //   TotalVolunteersHours: 48,
  //   TotalTravelHours: 69,
  //   OverallVolunteeringHours: 130,
  //   LivesImpacted: 80,
  //   ActivityType: 1,
  //   Status: 'Approved',
  //   POCID: '456346',
  //   POCName: 'Yeswanth',
  //   POCContactNumber: '9346346231'
  //   };
  //   viewEventReportsService = TestBed.get(ViewEventReportsService);
  //   spyOn(viewEventReportsService, 'getEventDetailedInfo').and.returnValue(of(data));
  //   ngxSpinnerService = TestBed.get(NgxSpinnerService);
  //   spyOn(ngxSpinnerService, 'show');
  //   spyOn(ngxSpinnerService, 'hide');
  //   component.getEventReports();
  //   expect(component.eventData).toEqual(data);
  // });
  it('should openModalDialog', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.openModalDialog();
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should closeModalDialog', () => {
    component.closeModalDialog();
    expect(component.display).toEqual('none');
  });
});
