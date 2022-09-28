import { Lightning, Router } from "@lightningjs/sdk";
import AssetDetails from "../components/AssetDetails";
import { getImageUrl, IDetailsResponse, IMoviesResponse } from "../lib/api";

interface DetailsTemplateSpec extends Lightning.Component.TemplateSpec {
    Background: object;
    AssetDetails: typeof AssetDetails;
}

interface DetailsTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
}

export interface IAssetDetailsData {
    detailsResponse: IDetailsResponse;
    similarResponse: IMoviesResponse;
}

export default class Details
    extends Lightning.Component<DetailsTemplateSpec, DetailsTypeConfig>
    implements Lightning.Component.ImplementTemplateSpec<DetailsTemplateSpec> {
    private _assetDetails = this.getByRef("AssetDetails")!;
    private _assetDetailsData: IAssetDetailsData = Object.create(null);

    static _template(): Lightning.Component.Template<DetailsTemplateSpec> {
        return {
            ...super._template(),
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
            },
            AssetDetails: {
                w: 1920,
                h: 1080,
                type: AssetDetails,
                flex: {
                    direction: "row",
                }
            },
        };
    }

    set assetDetailsData(data: IAssetDetailsData) {
        this._assetDetailsData = data;
    }

    _onDataProvided(): void {
        const backDropPath = this._assetDetailsData.detailsResponse.backdrop_path;

        this.patch({
            Background: {
                src: backDropPath
                    ? getImageUrl(backDropPath, "w1280")
                    : undefined,
            },
        });

        this._assetDetails.assetDetailsData = this._assetDetailsData;
    }

    _getFocused() {
        return this._assetDetails.similarCarousel;
    }

    _handleEnter() {
        const movies = this._assetDetailsData.similarResponse.results;
        if (movies) {
            const movie = movies[this._assetDetails.similarCarousel.currentItem.assetIndex];
            Router.navigate(`details/${movie.id}`);
        }
    }

    pageTransition(pageIn: Router.PageInstance, pageOut: Router.PageInstance | null): Router.PageTransition {
        return "left";
    }
}
