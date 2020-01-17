


import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from './local-storage-service.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [LocalStorageService]
  }));

  beforeEach(() => {
    localStorageService = TestBed.get(LocalStorageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });
});
