/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
const FRONTEND = "http://localhost:8888";
const BACKEND = "http://localhost:9090";
const APP_NAME = "noteapp";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH, APP_NAME,
    NOTES_HTML: APP_PATH + "/notes.html",
    RANDOM_HTML: APP_PATH + "/random.html",

    SESSION_NOTE_ID: "com_monkshu_ts",

    API_CREATE: `${BACKEND}/apis/createnote`,
    API_GETNOTE: `${BACKEND}/apis/getnote`,
    API_DELETE: `${BACKEND}/apis/deletenote`,
    API_UPDATE: `${BACKEND}/apis/updatenote`,

    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user: [APP_PATH + "/notes.html", $$.MONKSHU_CONSTANTS.ERROR_THTML],
        guest: [APP_PATH + "/random.html", APP_PATH + "/notes.html", $$.MONKSHU_CONSTANTS.ERROR_THTML]
    },
    API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
    KEY_HEADER: "X-API-Key"
}