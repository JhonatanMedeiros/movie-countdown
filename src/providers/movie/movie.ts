import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

@Injectable()
export class MovieProvider {

  baseUrl: string = 'https://api.themoviedb.org/3';

  apiKey: string = '';

  constructor(
    public http: HttpClient
  ) { }


  getMovieById(id: number): Observable<any> {

    let url: string = `${
    this.baseUrl
    + '/movie/' + id
    + '?api_key=' + this.apiKey
    + '&language=pt-BR'
    }`;

    return this.http.get(url)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));


  }

  getUpcoming(): Observable<any> {

    let url: string = `${
    this.baseUrl
    + '/movie/upcoming?'
    + 'api_key=' + this.apiKey
    + '&language=pt-BR'
    }`;

    return this.http.get(url)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));

  }

  searchMovie(query: string, page?: number): Observable<any> {

    let url: string = `${
      this.baseUrl
      + '/movie?'
      + 'api_key=' + this.apiKey
      + '&'
      + query
      + '&'
      + page
      + '&language=pt-BR'
    }`;

    return this.http.get(url)
      .map(res => res)
      .catch(err=> Observable.throw(err.message));

  }

}
