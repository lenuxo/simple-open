class User_language {
    constructor(lang) {
        if (lang != "zh") {
            this.language = "en";
        } else {
            this.language = "zh";
        }
        this.words = {
            zh: {
                open: "打开",
                delete: "删除",
                close: "关闭",
                about: "关于",
                quit: "退出",
                edit: "编辑",
                undo: "撤销",
                copy: "粘贴",
                paste: "复制",
                cut: "剪切",
                selectAll: "全选"
            },
            en: {
                open: "Open",
                delete: "Delete",
                close: "Close",
                about: "About",
                quit: "Quit",
                edit: "Edit",
                undo: "Undo",
                copy: "Copy",
                paste: "Paste",
                cut: "Cut",
                selectAll: "Select All"
            }
        };
    }
    readAppLocale(app) {
        if (!app.getLocale) return;
        let local = app.getLocale();
        if (local == "zh" || local == "zh-CN" || local == "zh-TW") {
            this.language = "zh";
        } else {
            this.language = "en";
        }
    }
    setLanguage(lang) {
        if (lang != "zh") {
            this.language = "en";
        } else {
            this.language = "zh";
        }
    }
    get(word) {
        if (typeof word != "string") return;
        return this.words[this.language][word];
    }
}
module.exports = User_language;
