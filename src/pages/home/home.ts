import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { MovieDetailPage } from '../movie-detail/movie-detail';

import { MovieProvider } from '../../providers/movie/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  movies: any[] = [];

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private movieService: MovieProvider
  ) {

    this.getUpcoming();
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  /**
   * Services
   */

  getUpcoming(refresher?): void {

    this.movieService.getUpcoming()
      .subscribe(
        res => {
          console.log(res);

          this.movies = res.results;

        },
        err => {
          console.log(err);
        },
        () => {
          if (refresher) {
            refresher.complete();
          }
        }
      );
  }

  /**
   * Functions
   */

  getMovieDetail(movie): void {

    console.log(movie);

    this.navCtrl.push(MovieDetailPage, {
      id: movie.id,
      title: movie.title
    });

  }

}
