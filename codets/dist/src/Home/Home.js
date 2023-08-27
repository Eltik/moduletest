"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function logic(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const html = yield sendRequest("https://witanime.live/", {});
        const DOMParserInstance = new DOMParser();
        const DOM = DOMParserInstance.parseFromString(html, "text/html");
        const spotlights = DOM.querySelectorAll(".owl-stage .owl-item:not(.cloned)");
        let spotlight_data = [];
        spotlights.forEach((item) => {
            var _a, _b, _c, _d, _e;
            spotlight_data.push({
                url: `https://witanime.top${item.querySelector(".owl-stage .owl-item").getAttribute("href")}`,
                titles: {
                    primary: (_a = item.querySelector(".desi-head-title.dynamic-name")) === null || _a === void 0 ? void 0 : _a.innerText,
                },
                image: (_c = (_b = item.querySelector(".film-poster-img")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-src")) !== null && _c !== void 0 ? _c : "",
                subtitle: (_d = item.querySelector(".desi-description")) === null || _d === void 0 ? void 0 : _d.innerText.trim(),
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: (_e = item.querySelector(".sc-detail > div:nth-child(1)")) === null || _e === void 0 ? void 0 : _e.innerText.trim(),
                showIcon: false,
                indicator: "Spotlight"
            });
        });
    });
}
//# sourceMappingURL=Home.js.map