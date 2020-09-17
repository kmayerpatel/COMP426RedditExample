import {PagesEnum, SortingEnum, subreddit} from "./RedditAPI.js";

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

        console.log(res);
    }
}