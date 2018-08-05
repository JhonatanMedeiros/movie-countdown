// Angular Imports
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptorProvider implements HttpInterceptor {

  private apiUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = '';

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const params = new HttpParams()
      .append('api_key', this.apiKey)
      .append('language', 'pt-BR');

    request = request.clone({
      url: `${this.apiUrl + request.urlWithParams}`,
      params: params
    });

    return next.handle(request);
  }

}
