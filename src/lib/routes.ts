import { Router } from "@lightningjs/sdk";
import { Library, Splash } from "../pages";
import { getPopularMovies } from "./api";

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
    ],
};
