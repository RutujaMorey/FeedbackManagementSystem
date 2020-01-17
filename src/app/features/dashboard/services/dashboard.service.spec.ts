import { TestBed } from '@angular/core/testing';


import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [DashboardService]
  }));

  beforeEach(() => {
    dashboardService = TestBed.get(DashboardService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });
  it('check getFeedbackStatistics method is calling "GET"', () => {
    dashboardService.getFeedbackStatistics().subscribe();
    const req = httpTestingController.expectOne(dashboardService.endpoint.api.getFeedbackStatistics);
    expect(req.request.method).toEqual('GET');
  });
});
