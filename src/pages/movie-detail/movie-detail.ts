// Angular Imports
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Ionic Imports
import { LoadingController, NavController, NavParams } from 'ionic-angular';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

// Provider Imports
import { MovieProvider } from '../../providers/movie/movie';
import { FavoritesProvider } from '../../providers/favorites/favorites';

// Models
import { Movie } from '../../models/movie';

@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  movie: Movie = new Movie();

  isFav: boolean = false;

  loading: any;

  // Countdown Timer
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private domSanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    private movieService: MovieProvider,
    private favService: FavoritesProvider
  ) {

    this.movie.id = navParams.get('id');
    this.movie.title = navParams.get('title');

    this.getMovieDetail();
    this.getFavorite();
  }

  ionViewDidLoad() { }

  ionViewWillUnload() { }


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
          this.movie = res;

          this.securityMovieVideosUrl();

          if (this.movie.release_date) {
            this.countdownTimer();
          }

        },
        err => {
          this.loading.dismiss();
        },
        () => {
          this.loading.dismiss();
        });

  }



  /**
   * Functions
   */

  countdownTimer(): void {


    let x = setInterval(() => {

      // Get todays date and time
      const now = new Date().getTime();
      const countDownDate = new Date(this.movie.release_date);

      // Find the distance between now an the count down date
      const distance = Number(countDownDate) - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished.
      if (distance < 0) {
        clearInterval(x);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      }

    }, 1000);


  }

  getFavorite(): void {
    this.favService.getFavorite(this.movie)
      .then(res => this.isFav = res )
      .catch(err => this.isFav = err );
  }

  editFavorite(): void {
    this.favService.editFavorite(this.movie)
      .then(res => this.isFav = res )
      .catch(err => this.isFav = err );
  }

  securityMovieVideosUrl(): void {

    if (this.movie.videos.results.length > 0) {

      this.movie.videos.results.map((item) => {

        const url: string  = 'https://www.youtube.com/embed/' + item.key;

        return item.urlParse = this.domSanitizer.bypassSecurityTrustResourceUrl(url);

      });


    }

  }


}
