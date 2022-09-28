const apiKey = "297257be5c37ddc4ada06d69687a224f";
const baseUrl = "https://api.themoviedb.org/3";

export interface IMoviesResponse {
    page?: number;
    results?: IMovie[];
    total_results?: number;
    total_pages?: number;
}

export interface IMovie {
    poster_path?: string | null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}

export interface IDetailsResponse {
    adult?: boolean;
    backdrop_path?: string | null;
    belongs_to_collection?: null | object;
    budget?: number;
    genres?: IGenre[];
    homepage?: string | null;
    id?: number;
    imdb_id?: string | null;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: IProductionCompany[];
    production_countries?: IProductionCountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: ILanguages[];
    status?: string;
    tagline?: string | null;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

interface IGenre {
    id?: number;
    name?: string;
}

interface IProductionCompany {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
}

interface IProductionCountry {
    iso_3166_1?: string;   
    name?: string;
}

interface ILanguages {
    iso_639_1?: string;
    name?: string;
}

export const getPopularMovies = async () => {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    const parsedResponse = response.json() as IMoviesResponse;
    return parsedResponse;
};

export const getImageUrl = (imagePath: string, imageSize: string) => {
    return `https://image.tmdb.org/t/p/${imageSize}${imagePath}?api_key=${apiKey}`;
};

export const getMovieDetails = async (id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
    const parsedResponse = response.json() as IDetailsResponse;
    return parsedResponse;
}

export const getSimilarMovies = async(id: string) => {
    const response = await fetch(`${baseUrl}/movie/${id}/similar?api_key=${apiKey}`)
    const parsedResponse = response.json() as IMoviesResponse;
    return parsedResponse;
}
