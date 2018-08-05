// Angular Imports
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs';

// Config Import
import { config } from '../../config/config';

@Injectable()
export class HttpsRequestInterceptorProvider implements HttpInterceptor {

  private apiUrl: string = config.apiUrl;
  private apiKey: string = config.apiKey;
  private language: string = config.apiLanguage;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const params = new HttpParams()
      .append('api_key', this.apiKey)
      .append('language', this.language);

    request = request.clone({
      url: `${this.apiUrl + request.urlWithParams}`,
      params: params
    });

    return next.handle(request);
  }

}
