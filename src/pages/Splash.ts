import { Lightning, Utils } from "@lightningjs/sdk";

interface SplashTemplateSpec extends Lightning.Component.TemplateSpec {
    Background: object;
    Loader: object;
}

interface SplashTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
}

export default class Splash
    extends Lightning.Component<SplashTemplateSpec, SplashTypeConfig>
    implements Lightning.Component.ImplementTemplateSpec<SplashTemplateSpec> {
    loader = this.getByRef("Loader")!;

    private loaderAnimation = this.animation({
        duration: 2,
        repeat: -1,
        actions: [
            {
                t: "Loader",
                p: "y",
                v: {
                    0: { v: 560, sm: 0.8, s: 0 },
                    0.1: { v: 760, sm: 0.1, s: 0 },
                    0.2: { v: 640, sm: 0.8, s: 0 },
                    0.3: { v: 760, sm: 0.1, s: 0 },
                    0.4: { v: 700, sm: 0.8, s: 0 },
                    0.5: { v: 760, sm: 0.1, s: 0 },
                    0.6: { v: 730, sm: 0.8, s: 0 },
                    0.7: { v: 760, sm: 0.1, s: 0 },
                    0.8: { v: 750, sm: 0.8, s: 0 },
                    0.9: { v: 760, sm: 0.1, s: 0 },
                    1: { v: 760, sm: 0.8 },
                },
            },
        ],
    });

    static _template(): Lightning.Component.Template<SplashTemplateSpec> {
        return {
            Background: {
                w: 1920,
                h: 1080,
                src: Utils.asset("images/splash_1920_1080.png"),
            },
            Loader: {
                mount: 0.5,
                x: 960,
                y: 560,
                text: {
                    text: "\ue96f",
                    fontFace: "Icomoon",
                    fontSize: 140,
                },
            },
        };
    }

    _init() {
        this.loaderAnimation.start();
    }

    _inactive() {
        this.loaderAnimation.stop();
    }
}
