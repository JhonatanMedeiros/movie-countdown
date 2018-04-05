import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { FavoritesPage } from '../pages/favorites/favorites';

import { MovieProvider } from '../providers/movie/movie';
import { FavoritesProvider } from '../providers/favorites/favorites';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    MovieDetailPage,
    FavoritesPage,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    MovieDetailPage,
    FavoritesPage,
    AboutPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider,
    FavoritesProvider
  ]
})
export class AppModule {}
