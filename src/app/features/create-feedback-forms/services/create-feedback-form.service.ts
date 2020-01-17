import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFeedbackForm } from '../model/create-feedback-form.model';


@Injectable({
  providedIn: 'root'
})
export class CreateFeedbackFormService {

  endpoint: any;
  appConfig: AppConfig

  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }

  createFeedbackForm(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.createFeedbackForm, request);
  }
  editFeedbackForm(request: CreateFeedbackForm): Observable<any> {
    return this.http.patch<any>(this.endpoint.api.updateFeedbackForm, request);
  }
  getFeedbackForm(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.getFeedbackForm, request);
  }
  getAllFormQuestions(): Observable<any> {
    return this.http.get(this.endpoint.api.getAllFormQuestions);
  }
  deleteFeedbackForm(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.deleteFeedbackForm, request);
  }
}
