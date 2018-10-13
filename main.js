const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_ENV == "development";
const path = require("path");

let user_lang;

let mainWindow;
function createWindow() {
    let VIEW_PATH = isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "./view/build/index.html")}`;
    mainWindow = new BrowserWindow({
        titleBarStyle: "hiddenInset",
        backgroundColor: "#ffffff",
        width: 600,
        minWidth: 350,
        height: 500,
        minHeight: 450,
        show: false,
        icon: path.join(__dirname, "./assets/icons/icon.png")
        // TODO: app icon
    });
    mainWindow.loadURL(VIEW_PATH);
    const mainMenu = Menu.buildFromTemplate([
        {
            label: "File",
            submenu: [
                { role: "about" },
                {
                    label: "Quit",
                    accelerator:
                        process.platform == "darwin" ? "command+Q" : "Ctrl+Q",
                    click: function() {
                        app.quit();
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
    mainWindow.on("close", () => {
        mainWindow = null;
    });
    mainWindow.on("closed", () => {
        app.quit();
    });
}

function init() {
    let local = app.getLocale();
    if (local == "zh" || local == "zh-CN" || local == "zh-TW") {
        user_lang = "zh";
    } else {
        user_lang = "en";
    }
    createWindow();
}

app.on("ready", init);
app.on("window-all-closed", () => {
    app.quit();
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
