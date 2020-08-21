// this will contain all the 1.generate 2.handle and 3. render functions!

import $ from 'jquery';

import store from './store';
import api from './api';

function generateBookmarkElement(bookmark) {
    if(bookmark.expanded === true){
        return`
        <li class='js-bookmark-element' data-bookmark-id="${bookmark.id}">
            <section class='expanded-view'>
                <span>${bookmark.title}</span> 
                <button type='button' id='delete-bookmark' class="fas fa-trash-alt"></button>
            </section>
            <div class='expanded-bd'>
                <section class='expanded-url'>
                    <button id='js-visit-url'>Visit Site</button>
                    <p>rating: ${bookmark.rating}</p>
                </section>
                <p>${bookmark.desc}</p>
            </div>
        </li>`
    }
    return `<li class='js-bookmark-element home-bookmarks' data-bookmark-id="${bookmark.id}"><span>${bookmark.title}</span><span>${bookmark.rating}</span></li>`       
}

function generateBookmarkElementString(bookmarkList) {
    let bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark))
    bookmarks = bookmarks.join('');
    return `   
        <div class='group'>
            <h1>My Bookmarks</h1>
            <section class='home-buttons-section'>
                <button type='button' id='add-bookmark'>+ New</button>
                <select id='filter' name='filter-bookmarks'>
                    <option class='js-filter' id='js-option1' value="1">Filter By</option>
                    <option class='js-filter' id='js-option1' value="1">X</option>
                    <option class='js-filter' id='js-option2' value="2">XX</option>
                    <option class='js-filter' id='js-option3' value="3">XXX</option>
                    <option class='js-filter' id='js-option4' value="4">XXXX</option>
                    <option class='js-filter' id='js-option5' value="5">XXXXX</option>
                </select>
            </section>
            <section>
                <ul class='home-bookmarks-ul'>
                ${bookmarks}
                </ul>
            </section> 
        </div>`
}

function generateCreateBookmark() {
    return `
    <h1>My Bookmarks</h1>
    <form id="js-create-item-form" >
        <section class='add-bookmark'>
            <label>Add New Bookmark</label>
            <input class ="js-url-input" type="text" placeholder="Enter URL Here" name="url" required>
            <input class= 'js-title-input' type="text" name='title' placeholder="URL title" required>
            <label for="url-description"></label>
        </section>

        <section class='add-bookmark'>
            <div>
                <label for="radio1"><input class='fas fa-star js-rating-input' id='radio1' name='rating' type="radio" value='1' checked></label>
                <label for="radio2"><input class='fas fa-star js-rating-input' id='radio2' name='rating' type="radio" value='2'></label>            
                <label for="radio3"><input class='fas fa-star js-rating-input' id='radio3' name='rating' type="radio" value='3'></label>          
                <label for="radio4"><input class='fas fa-star js-rating-input' id='radio4' name='rating' type="radio" value='4'></label>
                <label for="radio5"><input class='fas fa-star js-rating-input' id='radio5' name='rating' type="radio" value='5'></label>
            </div>
            <textarea class="width js-desc-input" id="url" name='desc-input' rows="10"
                placeholder="Add a description (optional)"></textarea>
            <div class='add-buttons'>
                <button type='button' id='cancel'>Cancel</button>
                <button type='submit' id='submit'>Create</button>
            </div>
            <div class="error-container">
            </div>
        </section>
    </form>`

}

// The following 3 functions generate render and handle the error display
// when a user tries to create an invalid bookmark
function generateError(message) {
    store.addNewBookmark = !store.addNewBookmark
    return `
        <section class='error-content'>
            <button id="cancel-error">X</button>
            <p>${message}</p>
        </section>`
};

function renderError() {
    if (store.error) {
        const el = generateError(store.error)
        $('.error-container').html(el);
        $('#cancel').addClass('hidden')
        $('#submit').addClass('hidden')
    } else {
        $('.error-container').empty();
        $('#cancel').removeClass('hidden')
        $('#submit').removeClass('hidden')
    }
};

const handleCloseError = function () {
  $('main').on('click', '#cancel-error', () => {
    store.addNewBookmark = !store.addNewBookmark
    store.setError(null);
    renderError();
  });
};

function render() {
   renderError();

    let generate;
    if(store.addNewBookmark === true) {
        generate = generateCreateBookmark()
    } else {
    // renderError() still needs to be implemented

    // this will filter the bookmarks that get renderred based on the current 
    // value of store.filter
    let bookmarks = store.bookmarks.filter(currentBookmark => currentBookmark.rating >= store.filter);
    // render the shopping list in the DOM
    
    generate = generateBookmarkElementString(bookmarks);
    store
    }
    // insert that HTML into the DOM
    $(`main`).html(generate);
};

// This will successfully handle the submit button when creating a new bookmark entry
// The data in the input filelds will be placed into an object called newBookmarkData
// This object will then be passed into the api function
function handleNewBookmarkSubmit() {
    $('main').on('submit', `#js-create-item-form`, function (event) {
        event.preventDefault();
        const newBookmarkData =
            {
                title: $('.js-title-input').val(),
                url: $('.js-url-input').val(),
                desc: $('.js-desc-input').val(),
                rating: $("input[name='rating']:checked").val()
            }
        api.createBookmark(newBookmarkData)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                store.addNewBookmark = !store.addNewBookmark
                render();
            })
             .catch((error) => {
                 store.setError(error.message);
                 renderError();
            });
    });
};

// this allows the user to cancel adding a new bookmark and returns them to the initial view
function handleNewBookmarkCancel() {
    $('main').on('click', '#cancel', function (event) {
        store.addNewBookmark = !store.addNewBookmark;
        render();
    }) 
}

// this allows the user to navigate to the add bookmark view
function handleAddNewBookmark() {
    $("main").on("click", "#add-bookmark", function (event) {
        store.addNewBookmark = !store.addNewBookmark;
        render();
    })
}


function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
       .closest('.js-bookmark-element')
       .data('bookmark-id');
}


//This will work, but there should be a better way to append the expanded: true key value pair
function handleBookmarkExpandedClicked() {
    $('main').on('click', 'li', function(event) {
        const id = getBookmarkIdFromElement(event.currentTarget);
        let bookmark = store.findById(id)
        if (typeof bookmark.expanded === 'undefined') {
            store.findAndUpdate(id, {expanded: true})
            render()
        } else {
            store.findAndUpdate(id, {expanded: !bookmark.expanded})
            render()
        }
    })
}


// on the drop down menu, the user can now delete any bookmark. 
// The page will automatically rerender
function handleBookmarkDeleteClicked() {
    $('main').on('click','#delete-bookmark', function (event) {
        const id = getBookmarkIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                store.findAndDelete(id);
                render();
            })
    })
}

// this allows the user to select from a dropdown menu the rating to filter
// the bookmarks by. This will change the store.filter value which
// will be used to filter the bookmarks when rendering
function handleFilterSelected() {
    $('main').on('change', '#filter', function(event) {
        store.filter = $(this).val()
        render();
    })
}

// When the drop down menu is viewed, this will allow the user to click
// the 'visit' button which will open a new window to the bookmark's url
function handleVisitUrl() {
    $('main').on('click', '#js-visit-url', function (event){
        const id = getBookmarkIdFromElement(event.currentTarget);
        window.open(store.findById(id).url);
    })
}


function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleNewBookmarkCancel();
    handleAddNewBookmark();
    handleBookmarkExpandedClicked();
    handleBookmarkDeleteClicked();
    handleFilterSelected();
    handleCloseError();
    handleVisitUrl();
};

export default {
    render,
    bindEventListeners,
};
