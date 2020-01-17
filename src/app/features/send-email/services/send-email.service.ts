import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app.config';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  endpoint: any;
  appConfig: AppConfig

  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }
  getEmailBody(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.getEmailBody, request);

  }

  sendEmail(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.sendEmail, request);

  }


}
