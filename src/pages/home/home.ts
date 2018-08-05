//Angular Imports
import { Component, ViewChild } from '@angular/core';

// Ionic Imports
import { Content, Events, LoadingController, NavController } from 'ionic-angular';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

// Page Imports
import { MovieDetailPage } from '../movie-detail/movie-detail';

// Provider Imports
import { MovieProvider } from '../../providers/movie/movie';
import { FavoritesProvider } from '../../providers/favorites/favorites';

// Models
import { Movie } from '../../models/movie';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  movies: Movie[] = [];

  showSearchInput: boolean = false;
  inputSearch: string = '';

  loading: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public loadingCtrl: LoadingController,
    private movieService: MovieProvider,
    private favService: FavoritesProvider
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
          this.verifyListFavs(refresher);
        }
      );
  }

  searchMovie(): void {

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    this.loading.present();

    this.subscription = this.movieService.searchMovie(this.inputSearch)
      .subscribe(
        res => {

          this.movies = res.results;

          this.movies.sort((a, b) => {
            let aDate = new Date(a.release_date);
            let bDate = new Date(b.release_date);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
          });
        },
        error => {
          this.hideLoader();
        },
        () => {
          this.verifyListFavs();
        }
      );

  }

  /**
   * Functions
   */

  verifyListFavs(refresher?) {


    if (this.movies.length > 0) {

      let listFav: Array<Movie> = [];
      return this.favService.getAllFavorites()
        .then((res) => {

          if (res) {

            try {
              listFav = JSON.parse(JSON.stringify(res));
            } catch (e) {
              listFav = [];
            }

            for (let key in listFav) {

              let index = this.movies.findIndex(value => value.id === listFav[key].id);

              if (index > -1) {
                this.movies[index].isFavorite = true;
              }

            }

            this.hideLoader(refresher);

          } else {
            this.hideLoader(refresher);
          }

        })
        .catch(err => {
          this.hideLoader(refresher);
        });

    } else {
      this.hideLoader(refresher);
    }

  }

  getMovieDetail(movie: Movie): void {

    this.navCtrl.push(MovieDetailPage, {
      id: movie.id,
      title: movie.title
    });

  }

  editFavorite(movie: Movie, index: number): void {

    this.favService.editFavorite(movie)
      .then(res => {
        this.movies[index].isFavorite = res;
      })
      .catch(err => {
        this.movies[index].isFavorite = err
      });

  }

  hideLoader(refresher?): void {
    if (refresher) {
      refresher.complete();
    } else {
      this.loading.dismiss();
    }
  }

  onCancel(event): void {
    this.showSearchInput = !this.showSearchInput;
  }

  onInput(event): void {

    if (this.inputSearch && this.inputSearch.trim()) {
      this.searchMovie();
    } else {
      this.getUpcoming();
    }

  }

}
