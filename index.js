//This will generate the intial screen the user will view upon loading the app
function generateInitialView(){
    return `
    <main>
        <section class='group'>
            <div class='item'>
                <button>+ New</button>
            </div>
            <div class='item'>
                <button>Filter By</button>
            </div>
        </section>
        <section class='group'>
            <ul>
                <li><span>Title 1</span><span>XXXXX</span></li>
            </ul>
        </section>  
    </main>
    `
}

//This function will allow the user to add new bookmarks to the list
//This will need to take the following inputs from the user: title, url link, description, and rating
function addBookmarks() {

} 

function render() {
    let x = ''
    x = generateInitialView();
    $('main').html(x);

}

function main () {
    render()

}

$(main)