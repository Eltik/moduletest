export {};
async function logic(payload: BasePayload) {
  
        const html = await sendRequest("https://witanime.cam/", {});
        const DOMParserInstance = new DOMParser();
        const DOM = DOMParserInstance.parseFromString(html, "text/html");
    
        const spotlights = DOM.querySelectorAll<HTMLElement>(".owl-carousel .item");
    
        let spotlight_data: Array<HompageData> = [];
        //spotlight
        spotlights.forEach((item) => {
            spotlight_data.push(
                {
                    url: `https://witanime.cam/${item.querySelector<HTMLElement>(".owl-carousel .item")!.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".owl-carousel .item")?.getAttribute("title"),
                },
                image: item.querySelector<HTMLElement>(".owl-carousel .item")?.style.backgroundImage ?? "",
                subtitle: "",
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: "",
                showIcon: false,
                indicator: "Stage"
                }
            );
        });
        const sliced_spotlight_data = spotlight_data.slice(0, 8);

        //main content
        let recents_wrapper = DOM.querySelector(".anime-card-container")?.querySelector(".row .display-flex");
        let recents = recents_wrapper!.querySelectorAll(".episodes-card-container");
        let recents_data: Array<HompageData> = []
        recents.forEach((item) => { 
            recents_data.push(
            {
                url: `https://witanime.cam/${item.querySelector<HTMLElement>(".episodes-card-title h3 a ")!.getAttribute("href")}`,
            titles: {
                primary: item.querySelector<HTMLElement>(".ep-card-anime-title h3 a")?.innerText,
            },
            image: item.querySelector<HTMLElement>(".img-responsive")?.getAttribute("src") ?? "",
            subtitle: "",
            subtitleValue: [],
            buttonText: "Watch Now",
            iconText: "",
            showIcon: false,
            indicator: "Now On Witanime"
            }
        );
    });


    //Most watched anime of the season
    let new_wrapper = DOM.querySelector("body > div:nth-child(9) > div > div > div.main-widget-body > div > div.owl-stage-outer")?.querySelector(".owl-stage");
    let new_list = new_wrapper!.querySelectorAll(".owl-item .active");

    let new_data: Array<HompageData> = [];
    for (let i = 0; i < new_list?.length; i++) {
        let item = new_list[i];

        new_data.push(
            {
                url: `https://witanime.cam/${item.querySelector<HTMLElement>(".anime-card-poster > div.hover.ehover6 > a")?.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".anime-card-title h3 a")?.innerText
                },
                image: item.querySelector<HTMLElement>(".img-responsive")?.getAttribute("src") ?? "",
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: "",
            }
        )
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
