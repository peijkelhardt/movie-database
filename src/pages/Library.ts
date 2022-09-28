import { Lightning, Router } from "@lightningjs/sdk";
import { Carousel } from "@lightningjs/ui";
import { getImageUrl, IMoviesResponse } from "../lib/api";
import { Asset } from "../components/Asset";
import AssetInfo from "../components/AssetInfo";

interface LibraryTemplateSpec extends Lightning.Component.TemplateSpec {
    Background: object;
    MovieCarousel: Carousel;
    AssetInfo: typeof AssetInfo;
}

interface LibraryTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
}

export default class Library
    extends Lightning.Component<LibraryTemplateSpec, LibraryTypeConfig>
    implements Lightning.Component.ImplementTemplateSpec<LibraryTemplateSpec> {
    private _background = this.getByRef("Background")!;
    private _movieCarousel = this.getByRef("MovieCarousel")!;
    private _assetInfo = this.getByRef("AssetInfo")!;
    private _moviesResponse: IMoviesResponse = Object.create(null);

    static _template(): Lightning.Component.Template<LibraryTemplateSpec> {
        return {
            ...super._template(),
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
            },
            MovieCarousel: {
                y: 200,
                w: 1920,
                h: 513,
                type: Carousel,
                scroll: 0.5,
                direction: "row",
                signals: { onIndexChanged: true },
            },
            AssetInfo: {
                x: 960,
                type: AssetInfo,
            },
        };
    }

    set moviesResponse(data: IMoviesResponse) {
        this._moviesResponse = data;
    }

    _onDataProvided(): void {
        if (
            this._moviesResponse.results &&
            this._moviesResponse.results.length
        ) {
            const movies = this._moviesResponse.results.map((movie, index) => {
                return {
                    margin: 15,
                    type: Asset,
                    assetIndex: index,
                    imagePath: movie.poster_path,
                    imageSize: "w342"
                };
            });

            this._movieCarousel.add(movies);
        }
    }

    _getFocused() {
        return this._movieCarousel;
    }

    onIndexChanged(): void {
        if (
            this._moviesResponse.results &&
            this._moviesResponse.results.length
        ) {
            const assetIndex = this._movieCarousel.currentItem.assetIndex;
            const movie = this._moviesResponse.results[assetIndex];
            if (movie.backdrop_path) {
                this._background.patch({
                    alpha: 0.3,
                    src: getImageUrl(movie.backdrop_path, "w1280"),
                });
            }

            this._assetInfo.movieData = movie;
        }
    }

    pageTransition(pageIn: Router.PageInstance, pageOut: Router.PageInstance | null): Router.PageTransition {
        return "left";
    }

    _handleBack() {

    }
        
    _handleEnter() {
        if (this._moviesResponse.results && this._moviesResponse.results.length) {
            const movie = this._moviesResponse.results[this._movieCarousel.currentItem.assetIndex];
            Router.navigate(`details/${movie.id}`);
        }
    }
}
