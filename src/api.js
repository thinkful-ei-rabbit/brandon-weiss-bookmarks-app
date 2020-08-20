// this will handle all the fetch and CRUD function to and from our server

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brandon';

// this will successfully run the fetch function and 'POST' a new bookmark to the api. Error checking still needs to be implemented.
function booksApitFetch(...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if(!res.ok) {
                // if response is not 2xx, start building error object
                error = {code: res.status};

                // if response is not JSON type, place statusText in error object and
                // immediately reject promise
                if(!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusTexxt;
                    return Promise.reject(error);
                }
            }

            // otherwise, return parsed JSON
            return res.json();
        })
        .then(data => {
            // if error exists, place the JSON message into the error object and 
            // reject the Promise with your error object so it lands in the next
            // catch.
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }

            // otherwise, return the json as normal resolved Promise
            return data;
        })
};

function getBookmarks() {
    return booksApitFetch(`${BASE_URL}/bookmarks`)
}


//This is now successfully posting to the API!
function createBookmark(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    return booksApitFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
     });
};


export default {
    getBookmarks,
    createBookmark,
};