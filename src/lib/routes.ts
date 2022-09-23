import { Router } from "@lightningjs/sdk";
import { Splash } from "../pages";

export const routes: Router.Config = {
    root: "splash",
    routes: [
        {
            path: "splash",
            component: Splash,
        },
    ],
};
