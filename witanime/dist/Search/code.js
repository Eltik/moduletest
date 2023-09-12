"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function logic(payload) {
    var _a, _b, _c, _d, _e;
    const baseURL = "https://witanime.link"; //https://witanime.me/?search_param=animes&s=vermeil
    const searchHTML = await sendRequest(`${baseURL}/?search_param=animes&s=${encodeURIComponent(payload.query)}`, {});
    const searchDOM = (new DOMParser()).parseFromString(searchHTML, "text/html");
    const searchElem = searchDOM.querySelector(".anime-list-content");
    const searchItems = searchElem.querySelectorAll(".anime-card-container");
    const titles = [];
    if (searchItems.length === 0) {
        throw new Error("No results found. Use Romanji For Some Titles.");
    }
    for (let i = 0; i < searchItems.length; i++) {
        const currentElem = searchItems[i];
        titles.push({
            url: `${(_a = currentElem.querySelector("a")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")}`,
            img: (_c = (_b = currentElem.querySelector("img")) === null || _b === void 0 ? void 0 : _b.getAttribute("src")) !== null && _c !== void 0 ? _c : "",
            title: (_e = (_d = currentElem.querySelector("img")) === null || _d === void 0 ? void 0 : _d.getAttribute("alt")) !== null && _e !== void 0 ? _e : "",
            indicatorText: "",
            currentCount: NaN,
            totalCount: NaN
        });
    }
    sendResult({
        action: "search",
        result: titles
    });
}
