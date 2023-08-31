"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function logic(payload) {
    var _a, _b, _c, _d, _e, _f;
    const html = await sendRequest("https://witanime.cam/", {});
    const DOMParserInstance = new DOMParser();
    const DOM = DOMParserInstance.parseFromString(html, "text/html");
    const spotlights = DOM.querySelectorAll(".owl-carousel .item");
    let spotlight_data = [];
    //spotlight
    spotlights.forEach((item) => {
        var _a, _b, _c;
        spotlight_data.push({
            url: `https://witanime.cam/${item.querySelector(".owl-carousel .item").getAttribute("href")}`,
            titles: {
                primary: (_a = item.querySelector(".owl-carousel .item")) === null || _a === void 0 ? void 0 : _a.getAttribute("title"),
            },
            image: (_c = (_b = item.querySelector(".owl-carousel .item")) === null || _b === void 0 ? void 0 : _b.style.backgroundImage) !== null && _c !== void 0 ? _c : "",
            subtitle: "",
            subtitleValue: [],
            buttonText: "Watch Now",
            iconText: "",
            showIcon: false,
            indicator: "Stage"
        });
    });
    const sliced_spotlight_data = spotlight_data.slice(0, 8);
    //main content
    let recents_wrapper = (_a = DOM.querySelector(".anime-card-container")) === null || _a === void 0 ? void 0 : _a.querySelector(".row .display-flex");
    let recents = recents_wrapper.querySelectorAll(".episodes-card-container");
    let recents_data = [];
    recents.forEach((item) => {
        var _a, _b, _c;
        recents_data.push({
            url: `https://witanime.cam/${item.querySelector(".episodes-card-title h3 a ").getAttribute("href")}`,
            titles: {
                primary: (_a = item.querySelector(".ep-card-anime-title h3 a")) === null || _a === void 0 ? void 0 : _a.innerText,
            },
            image: (_c = (_b = item.querySelector(".img-responsive")) === null || _b === void 0 ? void 0 : _b.getAttribute("src")) !== null && _c !== void 0 ? _c : "",
            subtitle: "",
            subtitleValue: [],
            buttonText: "Watch Now",
            iconText: "",
            showIcon: false,
            indicator: "Now On Witanime"
        });
    });
    //Most watched anime of the season
    let new_wrapper = (_b = DOM.querySelector("body > div:nth-child(9) > div > div > div.main-widget-body > div > div.owl-stage-outer")) === null || _b === void 0 ? void 0 : _b.querySelector(".owl-stage");
    let new_list = new_wrapper.querySelectorAll(".owl-item .active");
    let new_data = [];
    for (let i = 0; i < (new_list === null || new_list === void 0 ? void 0 : new_list.length); i++) {
        let item = new_list[i];
        new_data.push({
            url: `https://witanime.cam/${(_c = item.querySelector(".anime-card-poster > div.hover.ehover6 > a")) === null || _c === void 0 ? void 0 : _c.getAttribute("href")}`,
            titles: {
                primary: (_d = item.querySelector(".anime-card-title h3 a")) === null || _d === void 0 ? void 0 : _d.innerText
            },
            image: (_f = (_e = item.querySelector(".img-responsive")) === null || _e === void 0 ? void 0 : _e.getAttribute("src")) !== null && _f !== void 0 ? _f : "",
            subtitle: "",
            subtitleValue: [],
            showIcon: false,
            buttonText: "",
            indicator: "",
        });
    }
    const result = [
        {
            type: "Carousel",
            title: "Spotlight",
            data: sliced_spotlight_data
        },
        {
            type: "list",
            title: "main content",
            data: recents_data
        },
        {
            type: "grid_2x",
            title: "Most watched anime of the season",
            data: new_data
        },
    ];
    sendResult({
        action: "homepage",
        result
    }, true);
}
