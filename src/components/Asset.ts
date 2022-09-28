import { Lightning } from "@lightningjs/sdk";
import { getImageUrl } from "../lib/api";

interface AssetTemplateSpec extends Lightning.Component.TemplateSpec {
    Image: object;
}

export default class Asset extends Lightning.Component<AssetTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<AssetTemplateSpec> {
    image = this.getByRef("Image")!;

    private _assetIndex: number = 0;
    private _imagePath: string = "";
    private _focusAnimation = this.animation({
        duration: 0.5,
        actions: [
            {
                p: "scale",
                v: { 0: 1, 1: 1.075 },
            },
        ],
    });

    static _template(): Lightning.Component.Template<AssetTemplateSpec> {
        return {
            Image: {
                w: Asset.width,
                h: Asset.height,
            },
        };
    }

    get assetIndex(): number {
        return this._assetIndex;
    }

    set assetIndex(index: number) {
        this._assetIndex = index;
    }

    set imagePath(imagePath: string) {
        this._imagePath = imagePath;
    }

    _init(): void {
        this.image.patch({
            src: getImageUrl(this._imagePath, "w342"),
        });
    }

    _focus(): void {
        if (this._focusAnimation) {
            this._focusAnimation.start();
        }
    }

    _unfocus(): void {
        this._focusAnimation.stop();
    }

    static get width() {
        return 342;
    }

    static get height() {
        return 513;
    }
}
