import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedChangesAuthGuard } from './unsaved-changes-auth.guard';

describe('UnsavedChangesAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedChangesAuthGuard]
    });
  });

  it('should ...', inject([UnsavedChangesAuthGuard], (guard: UnsavedChangesAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
