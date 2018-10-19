let parse_path_string = function(path) {
    let type, str;
    if (path.match(reg0)) {
        type = "url";
        str = "http://" + path;
    } else if (path.match(reg1)) {
        type = "url";
        str = path;
    } else if (path.match(reg2)) {
        type = "file with file://";
        str = path;
    } else if (path.match(reg3)) {
        type = "file";
        str = path;
    } else if (path.match(reg4)) {
        type = "url";
        str = "http://" + path;
    } else if (path.match(reg5)) {
        type = "url";
        str = "http://" + path;
    } else {
        type = "invalid";
        str = "";
    }

    return {
        type: type,
        path: str
    };
};

// ip地址
let reg0 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\:[0-9]{1,5}$|$)/gi;

// https:// http://
let reg1 = /(^http:\/\/)|(^https:\/\/)(\w|\d)/gi;

// file:///
let reg2 = /(^file:\/\/\/)[^\/]/gi;

// / ~
let reg3 = /(^\/[^\/])|(^\~\/)/gi;

//  localhost:
let reg4 = /(^localhost\:)\d{1,5}$/gi;

let reg5 = /^[\w\d]+\.[\w\d]+/gi;
// url

module.exports = parse_path_string;
