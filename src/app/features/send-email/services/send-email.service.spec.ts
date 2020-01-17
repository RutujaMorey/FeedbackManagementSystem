import { TestBed } from '@angular/core/testing';

import { SendEmailService } from './send-email.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SendEmailService', () => {
  let sendEmailService: SendEmailService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [SendEmailService]
  }));
  beforeEach(() => {
    sendEmailService = TestBed.get(SendEmailService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {

    expect(sendEmailService).toBeTruthy();
  });
  it('check getEmailBody method is calling "POST"', () => {
    sendEmailService.getEmailBody({}).subscribe();
    const req = httpTestingController.expectOne(sendEmailService.endpoint.api.getEmailBody);
    expect(req.request.method).toEqual('POST');
  });

  it('check sendEmail method is calling "POST"', () => {
    sendEmailService.sendEmail({}).subscribe();
    const req = httpTestingController.expectOne(sendEmailService.endpoint.api.sendEmail);
    expect(req.request.method).toEqual('POST');
  });
});

