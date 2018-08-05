const apiImgURL = 'https://image.tmdb.org/t/p/';
export const config = {
  apiUrl: `https://api.themoviedb.org/3`,
  apiKey: '',
  apiLanguage: 'pt-BR',
  apiRegion: 'BR',
  imgSizesUrl: {
    original: `${apiImgURL}original`,
    w400: `${apiImgURL}w400`,
    backdrop_sizes: {
      w300: `${apiImgURL}w300`,
      w780: `${apiImgURL}w780`,
      w1280: `${apiImgURL}w1280`
    },
    logo_sizes: {
      w45: `${apiImgURL}w45`,
      w92: `${apiImgURL}w92`,
      w154: `${apiImgURL}w154`,
      w185: `${apiImgURL}w185`,
      w300: `${apiImgURL}w300`,
      w500: `${apiImgURL}w500`
    },
    poster_sizes: {
      w92: `${apiImgURL}w92`,
      w154: `${apiImgURL}w154`,
      w185: `${apiImgURL}w185`,
      w342: `${apiImgURL}w342`,
      w780: `${apiImgURL}w780`,
      w500: `${apiImgURL}w500`
    },
    profile_sizes: {
      w45: `${apiImgURL}w45`,
      w185: `${apiImgURL}w185`,
      h632: `${apiImgURL}w632`
    },
    still_sizes: {
      w92: `${apiImgURL}w92`,
      w185: `${apiImgURL}w185`,
      w300: `${apiImgURL}w300`
    }
  }
};
