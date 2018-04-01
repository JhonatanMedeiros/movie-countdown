import { Component, OnDestroy } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { MovieDetailPage } from '../movie-detail/movie-detail';

import { MovieProvider } from '../../providers/movie/movie';

import { Movie } from '../../models/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  movies: Movie[] = [];

  loading: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
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

    if (!refresher) {
      this.loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });

      this.loading.present();
    }

    this.movieService.getUpcoming()
      .subscribe(
        res => {

          console.log(res);

          this.movies = res.results;

          this.movies.sort((a, b) => {
            let aDate = new Date(a.release_date);
            let bDate = new Date(b.release_date);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
          });


        },
        err => {
          console.log(err);
        },
        () => {
          if (refresher) {
            refresher.complete();
          } else {
            this.loading.dismiss();
          }
        }
      );
  }

  /**
   * Functions
   */

  getMovieDetail(movie: Movie): void {

    this.navCtrl.push(MovieDetailPage, {
      id: movie.id,
      title: movie.title
    });

  }

}
