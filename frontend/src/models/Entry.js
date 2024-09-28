class Entry {
    constructor({ id = '', title = '', content = '', date = '' } = {}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
    }
}

export default Entry;