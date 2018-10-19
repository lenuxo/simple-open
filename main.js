const isDev = process.env.NODE_ENV == "development";
const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron");
const path = require("path");
const user_lang = new (require("./backend/user_language"))();
// const app_data_store = new (require("./backend/app_data_store"))(
//     app.getPath("userData") + "/data.json"
// );

let mainWindow;
function createWindow() {
    // todo 更正文件位置
    let VIEW_PATH = isDev
        ? "file://" + __dirname + "/dev/index.html"
        : `file://${path.join(__dirname, "/view/build/index.html")}`;
    mainWindow = new BrowserWindow({
        titleBarStyle: "hiddenInset",
        backgroundColor: "#ffffff",
        width: 600,
        minWidth: 350,
        height: 500,
        minHeight: 450,
        show: false,
        icon: path.join(__dirname, "/assets/icons/icon.png")
        // TODO: app icon
    });
    mainWindow.loadURL(VIEW_PATH);
    let menuTemplate = [
        {
            label: "File",
            submenu: [
                {
                    label: user_lang.get("about") + " Simple Open",
                    click: function() {
                        createAboutWindow();
                    }
                },
                {
                    label: user_lang.get("close"),
                    role: "close",
                    visible: false,
                    accelerator:
                        process.platform == "darwin" ? "command+W" : "Ctrl+W"
                },
                {
                    label: user_lang.get("quit"),
                    role: "quit",
                    accelerator:
                        process.platform == "darwin" ? "command+Q" : "Ctrl+Q"
                }
            ]
        },
        {
            label: user_lang.get("edit"),
            submenu: [
                { label: user_lang.get("undo"), role: "undo" },
                { label: user_lang.get("copy"), role: "copy" },
                {
                    role: "pasteAndMatchStyle",
                    label: user_lang.get("paste"),
                    accelerator:
                        process.platform == "darwin" ? "command+V" : "Ctrl+V"
                },
                { label: user_lang.get("cut"), role: "cut" },
                { label: user_lang.get("selectAll"), role: "selectAll" }
            ]
        }
    ];
    if (isDev)
        menuTemplate.push({
            label: "dev",
            submenu: [{ role: "forcereload" }, { role: "toggledevtools" }]
        });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    let webContents = mainWindow.webContents;
    mainWindow.once("ready-to-show", () => {
        webContents.executeJavaScript(
            `window.set_user_lang('${user_lang.language}')`
        );
        mainWindow.show();
        return isDev && webContents.openDevTools();
    });
    mainWindow.on("closed", () => {
        app.quit();
    });

    const contextMenu = new Menu();
    contextMenu.append(
        new MenuItem({
            label: user_lang.get("open"),
            click: function() {
                // TODO: open
            }
        })
    );
    contextMenu.append(
        new MenuItem({
            label: user_lang.get("delete"),
            click: function() {
                // todo: delete
            }
        })
    );
    ipcMain.on("show-list-item-menu", (e, data) => {
        contextMenu.popup(mainWindow, data.mouse.x, data.mouse.y);
    });
}

function init() {
    user_lang.readAppLocale(app);
    createWindow();
}

let aboutWindow;
function createAboutWindow() {
    if (aboutWindow) return;
    let VIEW_PATH = isDev
        ? "file://" + __dirname + "/dev/about.html"
        : `file://${path.join(__dirname, "/view/build/index.html")}`;
    aboutWindow = new BrowserWindow({
        width: 350,
        height: 350,
        show: false,
        titleBarStyle: "hiddenInset",
        backgroundColor: "#ffffff",
        resizable: false,
        minimizable: false,
        maximizable: false
    });
    aboutWindow.loadURL(VIEW_PATH);
    let webContents = aboutWindow.webContents;
    aboutWindow.once("ready-to-show", () => {
        webContents.executeJavaScript(
            `window.set_user_lang('${user_lang.language}')`
        );
        aboutWindow.show();
    });
    aboutWindow.on("closed", () => {
        aboutWindow = null;
    });
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
