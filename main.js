const isDev = process.env.NODE_ENV == "development";
const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron");
const user_lang = new (require("./backend/user_language"))();
const local_operate = require("./backend/local_operate");
const LAUNCH_DATA_PATH = app.getPath("userData") + "/launch_data.json";
const { autoUpdater } = require("electron-updater");
// const checkForUpdates = require("./backend/checkForUpdates");

let mainWindow;
function createWindow() {
    // todo 更正文件位置
    let VIEW_PATH = isDev
        ? "file://" + __dirname + "/dev/index.html"
        : "file://" + __dirname + "/view/build/index.html";
    mainWindow = new BrowserWindow({
        title: "Simple Open",
        titleBarStyle: "hiddenInset",
        backgroundColor: "#ffffff",
        width: 600,
        minWidth: 350,
        height: 500,
        minHeight: 450,
        show: false,
        icon: __dirname + "/assets/icons/icon.icns"
    });
    mainWindow.loadURL(VIEW_PATH);

    // main menu
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
                    label:
                        user_lang.get("version") +
                        " " +
                        require("./package.json").version,
                    enabled: false
                },
                {
                    label: user_lang.get("update"),
                    click: function() {
                        autoUpdater.checkForUpdatesAndNotify();
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: user_lang.get("close"),
                    role: "close",
                    accelerator: "CmdOrCtrl+W"
                },
                {
                    label: user_lang.get("quit"),
                    role: "quit",
                    accelerator: "CmdOrCtrl+Q"
                }
            ]
        },
        {
            label: user_lang.get("edit"),
            submenu: [
                { label: user_lang.get("undo"), role: "undo" },
                { label: user_lang.get("redo"), role: "redo" },
                { type: "separator" },
                { label: user_lang.get("copy"), role: "copy" },
                {
                    role: "pasteAndMatchStyle",
                    label: user_lang.get("paste"),
                    accelerator: "CmdOrCtrl+V"
                },
                { label: user_lang.get("cut"), role: "cut" },
                { label: user_lang.get("selectAll"), role: "selectAll" },
                { type: "separator" },
                {
                    label: user_lang.get("openAll"),
                    click: function() {
                        if (webContents) webContents.send("open-all");
                    },
                    accelerator: "CmdOrCtrl+Down"
                }
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

    // show main window
    let webContents = mainWindow.webContents;
    mainWindow.once("ready-to-show", () => {
        webContents.executeJavaScript(
            `window.set_user_lang('${user_lang.language}')`
        );
        mainWindow.show();
        isDev && webContents.openDevTools();
    });
    mainWindow.on("closed", () => {
        app.quit();
    });

    // open item function
    let openItems = function(items) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                if (!item.valid) return;
                item.type == "url"
                    ? local_operate.openURL(item.path)
                    : local_operate.openFile(item.path);
            });
        } else {
            items.type == "url"
                ? local_operate.openURL(items.path)
                : local_operate.openFile(items.path);
        }
    };

    // ipc
    ipcMain.on("local-data-get", (event, data) => {
        local_operate
            .read(LAUNCH_DATA_PATH)
            .then(data => {
                event.sender.send("local-data-reply", data);
            })
            .catch(err => {
                event.sender.send("local-data-reply", {});
            });
    });
    ipcMain.on("local-data-post", (event, data) => {
        local_operate.write(LAUNCH_DATA_PATH, data);
    });
    ipcMain.on("item-open", (event, items) => {
        openItems(items);
    });

    // right click menu
    let contextMenu;
    ipcMain.on("show-list-item-menu", (e, data) => {
        contextMenu = new Menu();
        contextMenu.append(
            new MenuItem({
                label: user_lang.get("open"),
                enabled: !data.invalid,
                click: function() {
                    openItems(data);
                }
            })
        );
        contextMenu.append(
            new MenuItem({
                label: user_lang.get("delete"),
                click: function() {
                    e.sender.send("item-delete", { id: data.id });
                }
            })
        );
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
        : "file://" + __dirname + "/view/build/about.html";
    aboutWindow = new BrowserWindow({
        title: user_lang.get("about") + " Simple Open",
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
        aboutWindow.focus();
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
