import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app.config';
import { HttpClient } from '@angular/common/http';
import { ParticpatedFeedback, UnregisteredFeedback, NotParticpatedFeedback } from '../model/submit-feedback';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitFeedbackService {
  endpoint: any;
  appConfig: AppConfig

  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }

  sendParticipatedFeedback(feedbackRequest: ParticpatedFeedback): Observable<any> {
    return this.http.post<any>(this.endpoint.api.sendParticipatedFeedback, feedbackRequest);
  }
  sendUnregisteredFeedback(feedbackRequest: UnregisteredFeedback): Observable<any> {
    return this.http.post<any>(this.endpoint.api.sendUnregisteredFeedback, feedbackRequest);
  }
  sendNotParticipatedFeedback(feedbackRequest: NotParticpatedFeedback): Observable<any> {
    return this.http.post<any>(this.endpoint.api.sendNotParticipatedFeedback, feedbackRequest);
  }
  getFeedbackQuestionForEvent(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.getFeedbackForm, request);
  }
}
