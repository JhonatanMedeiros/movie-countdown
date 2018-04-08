import { NgModule } from '@angular/core';

import { GenresPipe } from './genres/genres';
@NgModule({
	declarations: [
	  GenresPipe
  ],
	imports: [],
	exports: [
	  GenresPipe
  ]
})
export class PipesModule {}
