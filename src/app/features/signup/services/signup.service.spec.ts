import { TestBed } from '@angular/core/testing';


import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let signupService: SignupService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [SignupService]
  }));

  beforeEach(() => {
    signupService = TestBed.get(SignupService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(signupService).toBeTruthy();
  });
  it('check createNewUser method is calling "POST"', () => {
    signupService.createNewUser({}).subscribe();
    const req = httpTestingController.expectOne(signupService.endpoint.api.createNewUser);
    expect(req.request.method).toEqual('POST');
  });
});
