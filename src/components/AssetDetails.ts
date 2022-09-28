import { Lightning } from "@lightningjs/sdk";
import { Carousel } from "@lightningjs/ui";
import { getImageUrl } from "../lib/api";
import { IAssetDetailsData } from "../pages/Details";
import { SimilarAsset } from "./Asset";

interface AssetDetailsTemplateSpec extends Lightning.Component.TemplateSpec {
    Container: {
        Header: {
            Image: object;
            GeneralInfo: {
                Title: object;
                Genres: object;
                Runtime: object;
                Description: object;
            };
        };
        Suggestions: {
            Title: object;
            SimilarMovies: typeof Carousel;
        };
    };
}

export default class AssetDetails
    extends Lightning.Component<AssetDetailsTemplateSpec>
    implements
        Lightning.Component.ImplementTemplateSpec<AssetDetailsTemplateSpec> {
    private _container = this.getByRef("Container")!;
    private _suggestions = this._container.getByRef("Suggestions")!;
    private _similarCarousel = this._suggestions.getByRef("SimilarMovies")!;
    private _assetDetailsData: IAssetDetailsData = Object.create(null);

    static _template(): Lightning.Component.Template<AssetDetailsTemplateSpec> {
        return {
            Container: {
                rect: true,
                w: AssetDetails.width,
                h: AssetDetails.height,
                rtt: true,
                colorTop: 0xff172e0e,
                colorBottom: 0xff0e282f,
                shader: {
                    type: Lightning.shaders.RoundedRectangle,
                    radius: 75,
                    stroke: 10,
                    strokeColor: 0xffffffff,
                },
                flexItem: {
                    margin: 128,
                },
                flex: {
                    direction: "column",
                    padding: AssetDetails.spacing,
                },

                Header: {
                    flex: {
                        direction: "row",
                        padding: AssetDetails.spacing / 2,
                    },

                    Image: {
                        w: 185,
                        h: 278,
                    },
                    GeneralInfo: {
                        w: 1200,
                        flexItem: {
                            marginLeft: AssetDetails.spacing / 2,
                        },
                        flex: {
                            direction: "column",
                        },

                        Title: {
                            text: {
                                textColor: 0xffffffff,
                                fontSize: 32,
                            },
                        },
                        Genres: {
                            alpha: 0.9,
                            text: {
                                textColor: 0xffffffff,
                                fontSize: 16,
                            },
                        },
                        Runtime: {
                            alpha: 0.9,
                            text: {
                                textColor: 0xffffffff,
                                fontSize: 16,
                            },
                        },
                        Description: {
                            text: {
                                textColor: 0xffffffff,
                                fontSize: 24,
                                wordWrapWidth: 1200 - AssetDetails.spacing / 2,
                                textOverflow: "ellipsis",
                                maxLines: 7,
                            },
                        },
                    },
                },
                Suggestions: {
                    flex: {
                        direction: "column",
                    },

                    Title: {
                        flexItem: {
                            marginBottom: AssetDetails.spacing / 2,
                            marginLeft: AssetDetails.spacing / 2
                        },
                        text: {
                            textColor: 0xffffffff,
                            fontSize: 32,
                            text: "Similar movies",
                        },
                    },
                    SimilarMovies: {
                        w: AssetDetails.width,
                        h: 278,
                        type: Carousel,
                        scroll: 0.5,
                        direction: "row",
                        signals: { onIndexChanged: true },
                    },
                },
            },
        };
    }

    static get width() {
        return 1536;
    }

    static get height() {
        return 696;
    }

    static get spacing() {
        return 64;
    }

    get similarCarousel() {
        return this._similarCarousel;
    }

    set assetDetailsData(data: IAssetDetailsData) {
        this._assetDetailsData = data;

        const posterPath = this._assetDetailsData.detailsResponse.poster_path;
        const genres = this._assetDetailsData.detailsResponse.genres
            ? this._assetDetailsData.detailsResponse.genres
                  .map((genre) => genre.name)
                  .join(", ")
            : undefined;

        this.patch({
            Container: {
                Header: {
                    Image: {
                        src: posterPath
                            ? getImageUrl(posterPath, "w185")
                            : undefined,
                    },
                    GeneralInfo: {
                        Title: {
                            text: {
                                text: this._assetDetailsData.detailsResponse
                                    .title,
                            },
                        },
                        Genres: {
                            text: {
                                text: genres,
                            },
                        },
                        Runtime: {
                            text: {
                                text: this._assetDetailsData.detailsResponse
                                    .runtime
                                    ? `${this._assetDetailsData.detailsResponse.runtime} minutes`
                                    : undefined,
                            },
                        },
                        Description: {
                            text: {
                                text: this._assetDetailsData.detailsResponse
                                    .overview,
                            },
                        },
                    },
                },
            },
        });

        if (this._assetDetailsData.similarResponse.results) {
            const similarMovies = this._assetDetailsData.similarResponse.results.map(
                (movie, index) => {
                    return {
                        margin: 15,
                        type: SimilarAsset,
                        assetIndex: index,
                        imagePath: movie.poster_path,
                        imageSize: "w185"
                    };
                }
            );

            this._similarCarousel.add(similarMovies);
        }
    }
}
