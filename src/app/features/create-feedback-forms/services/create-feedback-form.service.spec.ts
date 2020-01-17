import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { CreateFeedbackFormService } from './create-feedback-form.service';
import { configureTestSuite } from 'ng-bullet';

describe('CreateFeedbackFormService', () => {
  let createFeedbackFormService: CreateFeedbackFormService;
  let httpTestingController: HttpTestingController;
  configureTestSuite(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [CreateFeedbackFormService]
  }));

  beforeEach(() => {
    createFeedbackFormService = TestBed.get(CreateFeedbackFormService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(createFeedbackFormService).toBeTruthy();
  });
  it('check createFeedbackForm method is calling "POST"', () => {
    createFeedbackFormService.createFeedbackForm({}).subscribe();
    const req = httpTestingController.expectOne(createFeedbackFormService.endpoint.api.createFeedbackForm);
    expect(req.request.method).toEqual('POST');
  });
  it('check editFeedbackForm method is calling "PATCH"', () => {
    createFeedbackFormService.editFeedbackForm({}).subscribe();
    const req = httpTestingController.expectOne(createFeedbackFormService.endpoint.api.updateFeedbackForm);
    expect(req.request.method).toEqual('PATCH');
  });
  it('check getFeedbackForm method is calling "POST"', () => {
    createFeedbackFormService.getFeedbackForm({}).subscribe();
    const req = httpTestingController.expectOne(createFeedbackFormService.endpoint.api.getFeedbackForm);
    expect(req.request.method).toEqual('POST');
  });
  it('check getAllFormQuestions method is calling "GET"', () => {
    createFeedbackFormService.getAllFormQuestions().subscribe();
    const req = httpTestingController.expectOne(createFeedbackFormService.endpoint.api.getAllFormQuestions);
    expect(req.request.method).toEqual('GET');
  });
  it('check deleteFeedbackForm method is calling "POST"', () => {
    createFeedbackFormService.deleteFeedbackForm({}).subscribe();
    const req = httpTestingController.expectOne(createFeedbackFormService.endpoint.api.deleteFeedbackForm);
    expect(req.request.method).toEqual('POST');
  });
});
