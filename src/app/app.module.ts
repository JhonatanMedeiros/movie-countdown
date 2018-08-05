import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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

import { PipesModule } from '../pipes/pipes.module';

import { MovieProvider } from '../providers/movie/movie';
import { FavoritesProvider } from '../providers/favorites/favorites';
import { HttpsRequestInterceptorProvider } from '../providers/https-request-interceptor/https-request-interceptor';

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
    IonicStorageModule.forRoot(),
    PipesModule
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MovieProvider,
    FavoritesProvider,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptorProvider, multi: true }
  ]
})
export class AppModule {}
