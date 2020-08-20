//this will run our main function

import $ from 'jquery';

// //import 'normalize.css';
// import './index.css';

import api from './api';
import store from './store';
import bookmarks from './bookmarks';


function main() {
    api.getBookmarks()
        .then(bookmarks1 => {
            bookmarks1.forEach(bookmark1 => store.addBookmark(bookmark1));
            bookmarks.render();
        });

        bookmarks.bindEventListeners();
        bookmarks.render();
};

$(main);


