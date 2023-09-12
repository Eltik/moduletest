export {};
async function getVRF(query: string, action: string): Promise<string> {
    const WitAnimeURL = "witanime.link";
    let reqURL = WitAnimeURL;

    const source = await sendRequest(reqURL, {});
    try {
        const parsedJSON = JSON.parse(source);

        if (parsedJSON.url) {
            return parsedJSON.url;
        } else {
            throw new Error(`${action}-VRF1: Received an empty URL or the URL was not found.`);
        }
    } catch (err) {
        throw new Error(`${action}-VRF1: Could not parse the JSON correctly.`);
    }
}


async function logic(payload: BasePayload) {
    let infoHTML = await sendRequest(payload.query, {});
    const infoDOM = (new DOMParser()).parseFromString(infoHTML, "text/html");
    const infoMainDOM = infoDOM.querySelector(".anime-info-container")?.querySelector(".anime-info-left")!;

    const WitAnimeID = (infoDOM.querySelectorAll(".episodes-list-content .overlay "));
    let decode="";
   // let epListURLs :  NonEmptyArray<string> ;
    //const epListURLs = [];
    for(let j =0 ;j < WitAnimeID.length; j++ ){
        const AllElement = WitAnimeID[j];
        const onclickAttr = AllElement?.getAttribute("onclick");
        const b64 = onclickAttr?.match(/openEpisode\('([^']+)'\)/)?.[1] ?? "bm8gdXJsIHByb3ZpZGVk";
        decode = atob(b64);
        //epListURLs.push(decode);
    }
 
    const titles = {
        primary: (infoMainDOM.querySelector(".anime-details-title") as HTMLElement).innerText ?? "",
        secondary: "",
    };
    const description = (infoMainDOM.querySelector(".anime-story") as HTMLElement)?.innerText ?? "";
    const poster = infoDOM.querySelector(".anime-info-container")?.querySelector("img")?.getAttribute("src");
    const status = (infoMainDOM.querySelector(".row")?.querySelector("div:nth-child(3) a") as HTMLElement)?.innerText ?? "";
    let seasons = [] as any[];

    sendResult({
        result: {
            id: "",
            titles: titles,
            epListURLs: [
                //epListURLs
                decode
            ] ,
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


async function getEpList(payload: BasePayload) {
    const baseURL = "https://witanime.link";
    const IDVRF = await getVRF(payload.query, "vrf");
    const episodesHTML = JSON.parse(await sendRequest(baseURL, {})).result;
    const episodesDOM = (new DOMParser()).parseFromString(episodesHTML, "text/html");
    const episodesElem = episodesDOM.querySelectorAll(".row .display-flex");
    
    const allEpInfo: {
        url: string,
        title: string,
        number: number
    }[] = [];

    for (let i = 0; i < episodesElem.length; i++) {
        const curElem = episodesElem[i];
        const overlayEle = curElem?.querySelector(".overlay");
        const onclickAttr = overlayEle?.getAttribute("onclick");
        const b64 = onclickAttr?.match(/openEpisode\('([^']+)'\)/)?.[1] ?? "";
        const decode = atob(b64);
        const episodeElement = curElem?.querySelector("a") as HTMLElement;
        const text = episodeElement?.innerText ?? "";
        const match = text.match(/\d+/);
        const episodeNumber = match ? parseInt(match[i]) : 0;


        allEpInfo.push({
            url: decode ,
            title:  (curElem.querySelector(".episodes-card-title a") as HTMLElement)?.innerText ?? "",
            number: episodeNumber
        })
    }

    sendResult({
        result: [{
            title: "Season 1",
            list: allEpInfo
        }],
        action: "eplist"
    }, true);
}
