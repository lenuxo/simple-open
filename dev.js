const Bundler = require("parcel-bundler");
const Path = require("path");
const isDev = process.env.NODE_ENV == "development";
const entry = [
    Path.join(__dirname, "./view/src/index.html"),
    Path.join(__dirname, "./view/src/about.html")
];

const OPT_DEV = {
    outDir: "./dev",
    publicUrl: "./",
    watch: true,
    cache: true,
    cacheDir: ".cache",
    minify: false,
    target: "electron",
    sourceMaps: true,
    hmr: true,
    hmrPort: 0
};
const OPT_PROD = {
    outDir: "./view/build/",
    publicUrl: "./",
    watch: false,
    cache: false,
    minify: true,
    target: "electron",
    sourceMaps: false
};

async function runBundle() {
    const bundler = new Bundler(entry, isDev ? OPT_DEV : OPT_PROD);
    bundler.on("buildStart", entryPoints => {
        console.log("build start...");
    });
    bundler.on("buildEnd", () => {
        console.log("build success");
    });
    bundler.on("buildError", error => {
        console.log(error);
    });
    const bundle = await bundler.bundle();
}
runBundle();
