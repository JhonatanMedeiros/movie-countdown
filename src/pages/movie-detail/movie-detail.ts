import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { MovieProvider } from '../../providers/movie/movie';

import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  movieId: number;
  movieTitle: string;
  movie: any;

  loading: any;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private movieService: MovieProvider
  ) {

    this.movieId = navParams.get('id');
    this.movieTitle = navParams.get('title');

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

    this.subscription = this.movieService.getMovieById(this.movieId)
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
