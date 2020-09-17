import {RedditEntry} from "./RedditEntry.js";

export class RedditListing {
    constructor(data) {
        this.after = data.after;
        this.before = data.before;
        this.children = [];
        data.children.forEach((entry) => {
            this.children.push(new RedditEntry(entry.data));
        });
    }
}