import { Router } from "@lightningjs/sdk";
import { Details, Library, Splash } from "../pages";
import { getMovieDetails, getPopularMovies, getSimilarMovies } from "./api";

export const routes: Router.Config = {
    root: "splash",
    routes: [
        {
            path: "splash",
            component: Splash,
        },
        {
            path: "library",
            component: Library,
            before: async (page: Library) => {
                page.moviesResponse = await getPopularMovies();
            },
        },
        {
            path: "details/:id",
            component: Details,
            before: async (page: Details, { id }: Record<"id", string>) => {
                const movieDetails = await getMovieDetails(id);
                const similarMovies = await getSimilarMovies(id);

                page.assetDetailsData = {
                    detailsResponse: movieDetails,
                    similarResponse: similarMovies,
                };
            },
        },
    ],
};
