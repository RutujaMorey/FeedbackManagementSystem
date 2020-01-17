import { CanDeactivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Observer } from 'rxjs';
import { ConfirmationDialogService } from './confirmation-dialog.service';

@Injectable()
export class UnsavedChangesAuthGuard implements CanDeactivate<any> {
  constructor(private readonly router: Router,
    private readonly location: Location,
    private readonly confirmationService: ConfirmationDialogService) { }
  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot): boolean {
    return this.hasChangeDetected(component, currentRoute);
  }
  hasChangeDetected(component: any, currentRoute) {
    let data$;
    if (component && component.hasChangeDetected) {
      if (!component.hasChangeDetected()) {
        return true;
      }
      data$ = new Observable((observer: Observer<boolean>) => {
        this.confirmationService.confirm(
          'You are about to lose all changes. Do you want to proceed?'
        );
      });
      return data$;
    }
    return true;
  }
}
