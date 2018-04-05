import { Component, ViewChild } from '@angular/core';
import { Content, Events, LoadingController, NavController } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { MovieDetailPage } from '../movie-detail/movie-detail';

import { MovieProvider } from '../../providers/movie/movie';

import { Movie } from '../../models/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  movies: Movie[] = [];

  loading: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public loadingCtrl: LoadingController,
    private movieService: MovieProvider
  ) {

    this.getUpcoming();

    events.subscribe('scrollToTopHome', (res) => {
      this.content.scrollToTop();
    });

  }

  ionViewWillUnload() {
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

          //console.log(res);

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
