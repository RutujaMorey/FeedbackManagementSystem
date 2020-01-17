import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { of } from 'rxjs/internal/observable/of';
import { configureTestSuite } from 'ng-bullet';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;
  let ngxSpinnerService: NgxSpinnerService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule
      ],
      providers: [DashboardService
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should getFeedbackStatistics', () => {
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    dashboardService = TestBed.get(DashboardService);
    spyOn(dashboardService, 'getFeedbackStatistics').and.returnValue(of('test'));
    component.getFeedbackStatistics();
    expect(component.eventStatistics).toEqual('test');
  });
  it('should getFeedbackStatistics', () => {
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    dashboardService = TestBed.get(DashboardService);
    spyOn(dashboardService, 'getFeedbackStatistics').and.returnValue(throwError(Error));
    component.getFeedbackStatistics();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should onViewDetail', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.onViewDetail();
    expect(router.navigate).toHaveBeenCalled();
  });
});
