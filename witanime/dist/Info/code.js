"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getVRF(query, action) {
    const WitAnimeURL = "witanime.link";
    let reqURL = WitAnimeURL;
    const source = await sendRequest(reqURL, {});
    try {
        const parsedJSON = JSON.parse(source);
        if (parsedJSON.url) {
            return parsedJSON.url;
        }
        else {
            throw new Error(`${action}-VRF1: Received an empty URL or the URL was not found.`);
        }
    }
    catch (err) {
        throw new Error(`${action}-VRF1: Could not parse the JSON correctly.`);
    }
}
async function logic(payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    let infoHTML = await sendRequest(payload.query, {});
    const infoDOM = (new DOMParser()).parseFromString(infoHTML, "text/html");
    const infoMainDOM = (_a = infoDOM.querySelector(".anime-info-container")) === null || _a === void 0 ? void 0 : _a.querySelector(".anime-info-left");
    const WitAnimeID = (infoDOM.querySelectorAll(".episodes-list-content .overlay "));
    let decode = "";
    // let epListURLs :  NonEmptyArray<string> ;
    //const epListURLs = [];
    for (let j = 0; j < WitAnimeID.length; j++) {
        const AllElement = WitAnimeID[j];
        const onclickAttr = AllElement === null || AllElement === void 0 ? void 0 : AllElement.getAttribute("onclick");
        const b64 = (_c = (_b = onclickAttr === null || onclickAttr === void 0 ? void 0 : onclickAttr.match(/openEpisode\('([^']+)'\)/)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : "bm8gdXJsIHByb3ZpZGVk";
        decode = atob(b64);
        //epListURLs.push(decode);
    }
    const titles = {
        primary: (_d = infoMainDOM.querySelector(".anime-details-title").innerText) !== null && _d !== void 0 ? _d : "",
        secondary: "",
    };
    const description = (_f = (_e = infoMainDOM.querySelector(".anime-story")) === null || _e === void 0 ? void 0 : _e.innerText) !== null && _f !== void 0 ? _f : "";
    const poster = (_h = (_g = infoDOM.querySelector(".anime-info-container")) === null || _g === void 0 ? void 0 : _g.querySelector("img")) === null || _h === void 0 ? void 0 : _h.getAttribute("src");
    const status = (_l = (_k = (_j = infoMainDOM.querySelector(".row")) === null || _j === void 0 ? void 0 : _j.querySelector("div:nth-child(3) a")) === null || _k === void 0 ? void 0 : _k.innerText) !== null && _l !== void 0 ? _l : "";
    let seasons = [];
    sendResult({
        result: {
            id: "",
            titles: titles,
            epListURLs: [
                //epListURLs
                decode
            ],
            altTitles: [],
            description: description,
            poster: poster,
            status: status,
            totalMediaCount: NaN,
            mediaType: "Episodes",
            seasons: seasons,
            mediaList: []
        },
        action: "metadata",
    });
}
async function getEpList(payload) {
    var _a, _b, _c, _d, _e;
    const baseURL = "https://witanime.link";
    const IDVRF = await getVRF(payload.query, "vrf");
    const episodesHTML = JSON.parse(await sendRequest(baseURL, {})).result;
    const episodesDOM = (new DOMParser()).parseFromString(episodesHTML, "text/html");
    const episodesElem = episodesDOM.querySelectorAll(".row .display-flex");
    const allEpInfo = [];
    for (let i = 0; i < episodesElem.length; i++) {
        const curElem = episodesElem[i];
        const overlayEle = curElem === null || curElem === void 0 ? void 0 : curElem.querySelector(".overlay");
        const onclickAttr = overlayEle === null || overlayEle === void 0 ? void 0 : overlayEle.getAttribute("onclick");
        const b64 = (_b = (_a = onclickAttr === null || onclickAttr === void 0 ? void 0 : onclickAttr.match(/openEpisode\('([^']+)'\)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "";
        const decode = atob(b64);
        const episodeElement = curElem === null || curElem === void 0 ? void 0 : curElem.querySelector("a");
        const text = (_c = episodeElement === null || episodeElement === void 0 ? void 0 : episodeElement.innerText) !== null && _c !== void 0 ? _c : "";
        const match = text.match(/\d+/);
        const episodeNumber = match ? parseInt(match[i]) : 0;
        allEpInfo.push({
            url: decode,
            title: (_e = (_d = curElem.querySelector(".episodes-card-title a")) === null || _d === void 0 ? void 0 : _d.innerText) !== null && _e !== void 0 ? _e : "",
            number: episodeNumber
        });
    }
    sendResult({
        result: [{
                title: "Season 1",
                list: allEpInfo
            }],
        action: "eplist"
    }, true);
}
