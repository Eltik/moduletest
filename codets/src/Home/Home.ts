    async function logic(payload: BasePayload) {
        
        const html = await sendRequest("https://witanime.live/", {});
        const DOMParserInstance = new DOMParser();
        const DOM = DOMParserInstance.parseFromString(html, "text/html");
    
        const spotlights = DOM.querySelectorAll<HTMLElement>(".owl-stage .owl-item:not(.cloned)");
    
        let spotlight_data: Array<HompageData> = [];

        spotlights.forEach((item) => {
            spotlight_data.push(
                {
                    url: `https://witanime.lol/${item.querySelector<HTMLElement>(".owl-stage .owl-item")!.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".owl-stage .owl-item:not(.cloned)")?.getAttribute("title"),
                },
                image: item.querySelector<HTMLElement>(".owl-stage .owl-item:not(.cloned)")?.style.backgroundImage ?? "",
                subtitle: "",
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: "",
                showIcon: false,
                indicator: "Stage"
                }
            );
        });

        let recents_wrapper = DOM.querySelector("body > div:nth-child(8) > div > div")?.querySelector(".row .display-flex");
        let recents = recents_wrapper!.querySelectorAll(".episodes-card-container");
        let recents_data: Array<HompageData> = []
        recents.forEach((item) => { 
            recents_data.push(
            {
                url: `https://witanime.lol/${item.querySelector<HTMLElement>(".owl-stage .owl-item")!.getAttribute("href")}`,
            titles: {
                primary: item.querySelector<HTMLElement>(".owl-stage .owl-item:not(.cloned)")?.getAttribute("title"),
            },
            image: item.querySelector<HTMLElement>(".owl-stage .owl-item:not(.cloned)")?.style.backgroundImage ?? "",
            subtitle: "",
            subtitleValue: [],
            buttonText: "Watch Now",
            iconText: "",
            showIcon: false,
            indicator: "Spotlight"
            }
        );
    });

    
    }
