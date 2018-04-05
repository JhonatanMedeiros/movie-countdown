import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Movie } from '../../models/movie';

@Injectable()
export class FavoritesProvider {

  favStorageName: string = 'favorites';

  constructor(
    public http: HttpClient,
    private storage: Storage
  ) { }

  getAllFavorites(): Promise<Movie> {

    return this.storage.get(this.favStorageName)
      .then((val) => {

        let list: Array<Movie> = [];

        try {
          list = JSON.parse(val);
        } catch (e) {
          list = val;
        }

        return list
      })
      .catch((err) => {
        return err;
      });

  }

  getFavorite(movie: any): Promise<boolean> {

    return this.storage.get(this.favStorageName)
      .then((val) => {

        let list: Array<any> = [];

        if (val) {
          try {
            list = JSON.parse(val);
          } catch (e) {
            list = val;
          }
        }

        let index = list.findIndex(value => value.id === movie.id);

        if (index > -1) {

          return true;

        } else {
          return false;
        }

      })
      .catch((err) => {
        console.log(err);
        return false;
      });

  }

  editFavorite(movie): Promise<boolean> {

    return this.storage.get(this.favStorageName)
      .then((val) => {

        let list: Array<any> = [];

        if (val) {
          list = JSON.parse(val);
        }

        let index = list.findIndex(value => value.id === movie.id);

        if (index > -1) {

          list.splice(index, 1);

          this.saveListFavorites(list);

          return false

        } else {

          list.push(movie);

          this.saveListFavorites(list);

          return true

        }

    })
      .catch((err) => {
        console.log(err);
        return false
      });

  }

  private saveListFavorites(list: Array<any>): void {
    this.storage.set(this.favStorageName, JSON.stringify(list));
  }

}
