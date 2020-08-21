// this will handle all the code that will modify our local stored data

const bookmarks = [];
let addNewBookmark = false;
let filter = 1;
let error = null;

function addBookmark(bookmark) {
    this.bookmarks.push(bookmark)
}

function findById(id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id)
}

function findAndUpdate(id, newData) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData)
}

function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

function setError(error) {
    this.error = error;
}

export default {
    addNewBookmark,
    bookmarks,
    filter,
    error,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    setError,
}