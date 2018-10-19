const fse = require("fs-extra");
const { shell } = require("electron");

const operate = {
    openFile: function(path) {
        return shell.openItem(path);
    },
    openURL: function(url) {
        return shell.openExternal(url);
    },
    testValid: function(path) {
        return fse.pathExists(path);
    },
    write: function(path, data) {
        return new Promise((res, rej) => {
            fse.ensureFile(path)
                .then(() => {
                    return fse.outputJSON(path, data);
                })
                .then(() => res(true))
                .catch(err => rej(err));
        });
    },
    read: function(path) {
        return fse.readJSON(path);
    }
};

module.exports = operate;
