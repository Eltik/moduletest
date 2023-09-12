export{};
async function logic(payload: BasePayload) {
    const baseURL = "https://witanime.link";//https://witanime.me/?search_param=animes&s=vermeil
    const searchHTML = await sendRequest(`${baseURL}/?search_param=animes&s=${encodeURIComponent(payload.query)}`, {});
    const searchDOM = (new DOMParser()).parseFromString(searchHTML, "text/html");
    const searchElem = searchDOM.querySelector(".anime-list-content")!;
    const searchItems = searchElem.querySelectorAll(".anime-card-container");
    const titles: SearchData = [];

    if (searchItems.length === 0) {
        throw new Error("No results found. Use Romanji For Some Titles.");
    }

    for (let i = 0; i < searchItems.length; i++) {
        const currentElem = searchItems[i];

        titles.push({
            url: `${currentElem.querySelector("a")?.getAttribute("href")}`,
            img: currentElem.querySelector("img")?.getAttribute("src") ?? "",
            title: (currentElem.querySelector("img") as HTMLElement)?.getAttribute("alt") ?? "",
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