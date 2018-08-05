// Angular Imports
import { Component, ViewChild } from '@angular/core';

// Ionic Imports
import { AlertController, Content, Events, LoadingController, NavController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';

// Provider Imports
import { FavoritesProvider } from '../../providers/favorites/favorites';

// Page Imports
import { MovieDetailPage } from '../movie-detail/movie-detail';

// Models Imports
import { Movie } from '../../models/movie';

// Config Imports
import { config } from '../../config/config';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  @ViewChild(Content) content: Content;

  movies: Movie[] = [];

  loading: Loading;

  imgPosterURL: string = config.imgSizesUrl.poster_sizes.w342;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private favService: FavoritesProvider
  ) {

    events.subscribe('scrollToTopFav', (res) => {
      this.content.scrollToTop();
    });

  }

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

  editFavorite(movie: Movie, index: number): void {

    this.favService.editFavorite(movie)
      .then(res => {
        if (!res) {
          this.movies.splice(index, 1);
        }
      })
      .catch(err => {
        this.movies[index].isFavorite = err
      });

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

  showRemoveFav(movie: Movie, index: number) {

    let confirm = this.alertCtrl.create({
      title: 'Remover dos favoritos ?',
      buttons: [
        {
          text: 'Não',
          handler: () => { }
        },
        {
          text: 'Sim',
          handler: () => {
            this.editFavorite(movie, index)
          }
        }
      ]
    });
    confirm.present();
  }

  hideLoader(refresher?): void {
    if (refresher) {
      refresher.complete();
    } else {
      this.loading.dismiss();
    }
  }


}
