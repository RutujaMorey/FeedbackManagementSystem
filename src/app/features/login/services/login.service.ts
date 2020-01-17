import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_CREDENTIALS } from './../../../mock/user-credentials';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/config/app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint: any;
  appConfig: AppConfig

  constructor(private readonly http: HttpClient) {
    this.endpoint = AppConfig.getConfig();
  }

  getUserCredentials(request: any): Observable<any> {
    return this.http.post<any>(this.endpoint.api.validateUserCredentials, request);
  }
}
