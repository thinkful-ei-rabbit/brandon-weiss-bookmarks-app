// this will contain all the 1.generate 2.handle and 3. render functions!

import $ from 'jquery';

import store from './store';
import api from './api';

function generateBookmarkElement(bookmark) {
    // if(bookmark.expand = true){
    //     return`
    //     <li data-bookmark-id="${bookmark.id}" class="expanded-bookmark">
    //     <span>${bookmark.title}</span> <span>DELETE</span>
    //     <section>
    //         <div>
    //             <button>Visit Site</button>
    //             <span>${bookmark.rating}</span>
    //         </div>
    //         <p>This will be the description for the app</p>
    //     </section>
    //     </li>`
    // }
    return `<li data-bookmark-id="${bookmark.id}">${bookmark.title} ${bookmark.rating}</li>`       
}

function generateBookmarkElementString(bookmarkList) {
    let bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark))
    bookmarks = bookmarks.join('');
    return `
        <h1>My Bookmarks</h1>
        <section class='group'>
            <button type='button' id='add-bookmark'>+ New</button>
            <button>Filter By</button>
        </section>
        <section class='group'>
            <ul>
            ${bookmarks}
            </ul>
        </section>` 
}

function generateCreateBookmark() {
    return `
    <div class='group'>
    <h1>My Bookmarks</h1>
    <div class='border'>
        <form id="js-create-item-form">
            <section>
                <label class="block">Add New Bookmark</label>
                <input class ="width js-url-input" type="text" placeholder="Enter URL Here" name="url" required>
            </section>
            <section class='group border'>
                <input class= 'js-title-input' type="text" name='title' placeholder="URL title" required>
                <section>
                    <div class='center'>
                        <input class= 'js-rating-input' name='rating' type="radio" value='1'>
                         <label for='1'></label>
                        <input class= 'js-rating-input' name='rating' type="radio" value='2'>
                         <label for='1'></label>
                        <input class= 'js-rating-input' name='rating' type="radio" value='3'>
                         <label for='1'></label>
                        <input class= 'js-rating-input' name='rating' type="radio" value='4'>
                         <label for='1'></label>
                        <input class= 'js-rating-input' name='rating' type="radio" value='5'>
                         <label for='1'></label>
                    </div>
                    <label for="url-description"></label>
                    <textarea class="width js-desc-input" id="url" name='desc-input' rows="10"
                        placeholder="Add a description (optional)"></textarea>
                </section>
            </section>
            <section>
                <button type='button' id='cancel'>Cancel</button>
                <button type='submit' id='submit'>Create</button>
            </section>
        </form>
    </div>`
}

function render() {
    console.log('render was run')
    let generate;
    if(store.addNewBookmark === true) {
        generate = generateCreateBookmark()
    } else {
    //console.log(`2 ${store.bookmarks}`)
    //renderError() still needs to be implemented

    let bookmarks = store.bookmarks;
    // render the shopping list in the DOM
    
    generate = generateBookmarkElementString(bookmarks);
    }
    // insert that HTML into the DOM
    $(`main`).html(generate);
};

// This will successfully handle the submit button when creating a new bookmark entry
// The data in the input filelds will be placed into an object called newBookmarkData
// This object will then be passed into the api function
function handleNewBookmarkSubmit() {
    $('main').on('submit', `#js-create-item-form`, function (event) {
        console.log('submit is running')
        event.preventDefault();
        store.addNewBookmark = !store.addNewBookmark
        const newBookmarkData =
            {
                title: $('.js-title-input').val(),
                url: $('.js-url-input').val(),
                desc: $('.js-desc-input').val(),
                rating: $('.js-rating-input').val()
            }
        api.createBookmark(newBookmarkData)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                render();
            })
            // .catch((error) => {
            //     store.setError(error.message);
            //     renderError();
            // });
    });
};

// this allows the user to cancel adding a new bookmark and returns them to the initial view
function handleNewBookmarkCancel() {
    $('main').on('click', '#cancel', function (event) {
        console.log('cancel is running')
        store.addNewBookmark = !store.addNewBookmark;
        render();
    }) 
}

// this allows the user to navigate to the add bookmark view
function handleAddNewBookmark() {
    $("main").on("click", "#add-bookmark", function (event) {
        store.addNewBookmark = !store.addNewBookmark;
        console.log(store.addNewBookmark);
        render();
    })
}

function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleNewBookmarkCancel();
    handleAddNewBookmark();
}

export default {
    render,
    bindEventListeners,
};
