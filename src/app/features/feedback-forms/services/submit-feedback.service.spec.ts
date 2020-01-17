import { TestBed } from '@angular/core/testing';


import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UnregisteredFeedback, NotParticpatedFeedback, ParticpatedFeedback } from '../model/submit-feedback';
import { SubmitFeedbackService } from './submit-feedback.service';
const unregisteredFeedback: UnregisteredFeedback = {
  eventId: '',
  email: '',
  unregisteredReason: ''
}
const particpatedFeedback: ParticpatedFeedback = {
  eventId: '',
  email: '',
  rating: 1,
  improvements: '',
  likes: ''
}
const notParticpatedFeedback: NotParticpatedFeedback = {
  eventId: '',
  email: '',
  notParticpatedReason: ''

}

describe('SubmitFeedbackService', () => {
  let submitFeedbackService: SubmitFeedbackService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [SubmitFeedbackService]
  }));

  beforeEach(() => {
    submitFeedbackService = TestBed.get(SubmitFeedbackService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(submitFeedbackService).toBeTruthy();
  });
  it('check sendParticipatedFeedback method is calling "POST"', () => {
    submitFeedbackService.sendParticipatedFeedback(particpatedFeedback).subscribe();
    const req = httpTestingController.expectOne(submitFeedbackService.endpoint.api.sendParticipatedFeedback);
    expect(req.request.method).toEqual('POST');
  });
  it('check sendUnregisteredFeedback method is calling "POST"', () => {
    submitFeedbackService.sendUnregisteredFeedback(unregisteredFeedback).subscribe();
    const req = httpTestingController.expectOne(submitFeedbackService.endpoint.api.sendUnregisteredFeedback);
    expect(req.request.method).toEqual('POST');
  });
  it('check sendNotParticipatedFeedback method is calling "POST"', () => {
    submitFeedbackService.sendNotParticipatedFeedback(notParticpatedFeedback).subscribe();
    const req = httpTestingController.expectOne(submitFeedbackService.endpoint.api.sendNotParticipatedFeedback);
    expect(req.request.method).toEqual('POST');
  });
});

