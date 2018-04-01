import { Component, OnDestroy } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { MovieDetailPage } from '../movie-detail/movie-detail';

import { MovieProvider } from '../../providers/movie/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  movies: any[] = [];

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

  getMovieDetail(movie): void {

    this.navCtrl.push(MovieDetailPage, {
      id: movie.id,
      title: movie.title
    });

  }

}
