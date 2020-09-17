import {RedditEntry} from "./RedditEntry.js";

export class RedditListing {
    constructor(data) {
        this.after = data.data.after;
        this.before = data.data.before;
        this.children = [];
        if (data.data.children) {
            data.data.children.forEach((entry) => {
                this.children.push(new RedditEntry(entry.data));
            });
        }
    }
}