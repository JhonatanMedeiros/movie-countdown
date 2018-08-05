// Angular Imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs Imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class MovieProvider {

  constructor(public http: HttpClient) { }

  getMovieById(id: number): Observable<any> {

    const url = `/movie/${id}`;

    const params = new HttpParams()
      .append('append_to_response', 'videos,credits');

    const opts = { params: params };

    return this.http.get(url, opts)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));
  }

  getUpcoming(page: number = 1): Observable<any> {

    const url = `/movie/upcoming`;

    const params = new HttpParams()
      .append('page', page.toString());

    const opts = { params: params };

    return this.http.get(url, opts)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));
  }

  searchMovie(query: string, page: number = 1): Observable<any> {

    const url = `/search/movie`;

    const params = new HttpParams()
      .append('query', query)
      .append('page', page.toString());

    const opts = { params: params };

    return this.http.get(url, opts)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));
  }

}
