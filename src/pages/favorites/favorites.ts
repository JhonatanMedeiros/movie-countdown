import { Component, ViewChild } from '@angular/core';
import { Content, Events, LoadingController, NavController, NavParams } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites/favorites';

import { Movie } from '../../models/movie';
import { MovieDetailPage } from '../movie-detail/movie-detail';


@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  @ViewChild(Content) content: Content;

  movies: Movie[] = [];

  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    private favService: FavoritesProvider
  ) { }

  ionViewWillEnter() {
    this.getFavorites();
  }

  /**
   * Services
   */

  getFavorites(refresher?): void {

    if (!refresher) {
      this.loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });

      this.loading.present();
    }

    this.favService.getAllFavorites()
      .then((res => {

        if (res) {

          try {
            this.movies = JSON.parse(JSON.stringify(res));
          } catch (e) {
            this.movies = [];
          }

          this.movies.sort((a, b) => {
            let aDate = new Date(a.release_date);
            let bDate = new Date(b.release_date);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
          });
        }


        this.hideLoader(refresher);

      }))
      .catch((err => {

        this.hideLoader(refresher);

      }))

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

  hideLoader(refresher?): void {
    if (refresher) {
      refresher.complete();
    } else {
      this.loading.dismiss();
    }
  }


}
