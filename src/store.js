// this will handle all the code that will modify our local stored data

const bookmarks = [];
let addNewBookmark = false;

function addBookmark(bookmark) {
    this.bookmarks.push(bookmark)
}


export default {
    addNewBookmark,
    bookmarks,
    addBookmark,
}