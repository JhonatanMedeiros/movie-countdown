// Angular Imports
import { NgModule } from '@angular/core';

// Models
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
