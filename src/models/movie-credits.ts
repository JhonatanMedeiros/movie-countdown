export class MovieCredits {
  id?: number;
  cast?: Array<MovieCreditsCast>;
  crew?: Array<MovieCreditsCrew>;
}

export class MovieCreditsCast {
  cast_id?: number;
  character?: string;
  credit_id?: number;
  gender?: number;
  id?: number;
  name?: string;
  order?: number;
  profile_path?: string;
}

export class MovieCreditsCrew {
  credit_id?: number;
  department?: string;
  gender?: number;
  id?: number;
  job?: string;
  name?: string;
  profile_path?: string;
}
