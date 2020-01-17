import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewEventReportsService } from './view-event-reports.service';

describe('ViewEventReportsService', () => {
  let viewEventReportsService: ViewEventReportsService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
  }));

  beforeEach(() => {
    viewEventReportsService = TestBed.get(ViewEventReportsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(viewEventReportsService).toBeTruthy();
  });
  it('check getEventReports method is calling "GET"', () => {
    viewEventReportsService.getEventReports().subscribe();
    const req = httpTestingController.expectOne(viewEventReportsService.endpoint.api.getOutreachEvents);
    expect(req.request.method).toEqual('GET');
  });
  it('check getEventDetailedInfo method is calling "GET"', () => {
    viewEventReportsService.getEventDetailedInfo('').subscribe();
    const req = httpTestingController.expectOne(`${viewEventReportsService.endpoint.api.getOutreachEventDetails}/${''}`);
    expect(req.request.method).toEqual('GET');
  });
  it('should be getVolunteersStatistics', () => {
    expect(viewEventReportsService.getVolunteersStatistics).toBeTruthy();
  });
  it('check getEventFeedbackDetails method is calling "GET"', () => {
    viewEventReportsService.getEventFeedbackDetails('').subscribe();
    const req = httpTestingController.expectOne(`${viewEventReportsService.endpoint.api.getEventFeedbackDetails}/${''}`);
    expect(req.request.method).toEqual('GET');
  });
});
