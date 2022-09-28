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

export const getPopularMovies = async () => {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    const parsedResponse = response.json() as IMoviesResponse;
    return parsedResponse;
};

export const getImageUrl = (imagePath: string, imageSize: string) => {
    return `https://image.tmdb.org/t/p/${imageSize}${imagePath}?api_key=${apiKey}`;
};
