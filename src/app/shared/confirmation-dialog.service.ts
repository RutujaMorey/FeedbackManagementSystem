import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor() { }
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Changes done in this page wil be discarded. Are you sure you want to leave this page?');

    return Observable.of(confirmation);
  };


}
