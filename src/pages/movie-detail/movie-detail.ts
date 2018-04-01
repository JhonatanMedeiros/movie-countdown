import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';

import { MovieProvider } from '../../providers/movie/movie';

import { Movie } from '../../models/movie';


@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  movie: Movie = new Movie();

  loading: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private movieService: MovieProvider
  ) {

    this.movie.id = navParams.get('id');
    this.movie.title = navParams.get('title');

    this.getMovieDetail();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MovieDetailPage');
  }



  /**
   * Services
   */

  getMovieDetail(): void {

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    this.loading.present();

    this.subscription = this.movieService.getMovieById(this.movie.id)
      .subscribe(
        res => {
          console.log(res);

          this.movie = res;

        },
        err => {
          console.log(err)
        },
        () => {
          this.loading.dismiss();
        });

  }



  /**
   * Functions
   */


}
