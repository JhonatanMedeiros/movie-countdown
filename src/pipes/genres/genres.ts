import { Pipe, PipeTransform } from '@angular/core';

import { MovieGenres } from '../../models/movie-genres';

@Pipe({
  name: 'genres',
})
export class GenresPipe implements PipeTransform {

  transform(itens: Array<MovieGenres>, ...args) {

    if (!itens) {
      return itens;
    }

    itens.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    return itens;



  }
}
