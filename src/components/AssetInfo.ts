import { Lightning } from "@lightningjs/sdk";
import { IMovie } from "../lib/api";

interface AssetInfoTemplateSpec extends Lightning.Component.TemplateSpec {
    Container: {
        Asset: {
            Title: object;
            ReleaseDate: object;
            Description: object;
        };
    };
}

export default class AssetInfo
    extends Lightning.Component<AssetInfoTemplateSpec>
    implements
        Lightning.Component.ImplementTemplateSpec<AssetInfoTemplateSpec> {
    private _assetAnimation = this.animation({
        duration: 1,
        actions: [
            {
                t: "Container",
                p: "y",
                v: {
                    0: { v: AssetInfo.positionY },
                    0.5: { v: 1180 },
                    1: { v: AssetInfo.positionY },
                },
            },
        ],
    });

    static _template(): Lightning.Component.Template<AssetInfoTemplateSpec> {
        return {
            Container: {
                w: AssetInfo.width,
                h: AssetInfo.height,
                mountX: 0.5,
                y: AssetInfo.positionY,
                rtt: true,
                shader: {
                    type: Lightning.shaders.RoundedRectangle,
                    radius: 10,
                },
                transitions: {
                    y: {
                        duration: 0.3,
                        timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)",
                    },
                },

                Asset: {
                    rect: true,
                    w: (w) => w,
                    h: (h) => h,
                    color: 0xff000000,
                    alpha: 0.5,
                    flex: {
                        direction: "column",
                        padding: AssetInfo.padding,
                        wrap: true,
                    },

                    Title: {
                        text: {
                            fontSize: 32,
                            textColor: 0xffffffff,
                            wordWrapWidth:
                                AssetInfo.width - AssetInfo.padding * 2,
                            textOverflow: "ellipsis",
                            maxLines: 1,
                        },
                    },
                    ReleaseDate: {
                        text: {
                            fontSize: 24,
                            textColor: 0xffffffff,
                        },
                    },
                    Description: {
                        text: {
                            fontSize: 24,
                            textColor: 0xffffffff,
                            wordWrapWidth:
                                AssetInfo.width - AssetInfo.padding * 2,
                            textOverflow: "ellipsis",
                            maxLines: 2,
                        },
                    },
                },
            },
        };
    }

    set movieData(movieData: IMovie) {
        this._assetAnimation.start();

        setTimeout(() => {
            this.patch({
                Container: {
                    smooth: { y: AssetInfo.positionY },
                    Asset: {
                        Title: {
                            text: {
                                text: movieData.title,
                            },
                        },
                        ReleaseDate: {
                            text: {
                                text: movieData.release_date,
                            },
                        },
                        Description: {
                            text: {
                                text: movieData.overview,
                            },
                        },
                    },
                },
            });
        }, 500);
    }

    static get width() {
        return 960;
    }

    static get height() {
        return 200;
    }

    static get padding() {
        return 32;
    }

    static get positionY() {
        return 848;
    }
}
