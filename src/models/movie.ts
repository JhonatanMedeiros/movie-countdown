import { MovieGenres } from './movie-genres';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget?: number;
  genre_ids?: number[];
  genres?: MovieGenres[];
  homepage: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: any[];
  production_countries?: any[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: any[];
  status?: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isFavorite?: boolean;
  videos?: {results: Array<MovieVideos>};
}

export class MovieVideos {
  id: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  key: string;
  name: string;
  site?: string;
  size: number;
  type?: string;
  urlParse?: SafeResourceUrl
}
