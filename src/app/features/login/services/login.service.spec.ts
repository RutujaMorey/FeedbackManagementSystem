import { TestBed } from '@angular/core/testing';


import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [LoginService]
  }));

  beforeEach(() => {
    loginService = TestBed.get(LoginService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });
  it('check createNewUser method is calling "POST"', () => {
    loginService.getUserCredentials({}).subscribe();
    const req = httpTestingController.expectOne(loginService.endpoint.api.validateUserCredentials);
    expect(req.request.method).toEqual('POST');
  });
});

