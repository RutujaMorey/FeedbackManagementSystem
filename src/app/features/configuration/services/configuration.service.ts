import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PMO_Details } from './../../../mock/pmo-details';
import { POC_DETAILS } from 'src/app/mock/poc-details';
import { FEEDBACK_QUESTIONS } from 'src/app/mock/feedback-questions';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  endpoint: any;
  appConfig: AppConfig
  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }
  getPMODetails() {
    return Observable.of(PMO_Details);
  }
  getPOCDetails() {
    return Observable.of(POC_DETAILS);
  }
  getFeedBackQuestions() {
    return Observable.of(FEEDBACK_QUESTIONS);
  }
  findEventFromEmail(email: string, role: string) {
    return this.http.get<any>(`${this.endpoint.api.findEventFromEmail}/${email}/${role}`);
  }
  findEmployeesByRoleAndEvent(eventId: string, role: string) {
    return this.http.get<any>(`${this.endpoint.api.findEmployeesByRoleAndEvent}/${role}/${eventId}`);
  }
  addRole(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.addRole, request);
  }
  deleteRole(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.deleteRole, request);

  }
}
