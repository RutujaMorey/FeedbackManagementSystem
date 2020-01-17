import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardGuard } from './authguard.guard';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthguardGuard', () => {
  let authguardGuard: AuthguardGuard
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthguardGuard]
    });
  });
  beforeEach(() => {
    authguardGuard = TestBed.get(AuthguardGuard);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authguardGuard).toBeTruthy();
  });
});




