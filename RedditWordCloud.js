import {PagesEnum, SortingEnum, subreddit} from "./RedditAPI.js";
import {RedditListing} from "./RedditListing.js";

window.onload = () => {
    document.querySelector('#fetch').onclick = async (e) => {
        let res = await subreddit({
            page: {
                name: document.querySelector("#subreddit").value,
                is_subreddit: true
            },
            filters: {
                limit: 100
            }
        });

        let listing = new RedditListing(res);

        let wc = "";
        listing.children.forEach((entry) => {
            wc += entry.title + " ";
            wc += entry.selftext + " ";
        })

        let wc_response = await fetch("https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud", {
            method: "POST",
            headers: {
                "x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
                "x-rapidapi-key": "541804da44msh6b051e611915825p104edajsn014721829931",
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({
                text: wc,
                scale: 1,
                width: 800,
                height: 800,
                colors: ["#375E97", "#FB6542", "#FFBB00", "#3F681C"],
                font: "Tahoma",
                use_stopwords: true,
                language: "en",
                uppercase: false
            })
        });
        let wc_text = await wc_response.text();
        let img = document.getElementById('wc');
        img.src = wc_text;
        img.height = 800;
        img.width = 800;
    }
}