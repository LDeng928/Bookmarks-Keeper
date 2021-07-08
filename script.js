const modal = document.getElementById('modal');
const modalShow =document.getElementById('show-modal');
const bookmarksContainer = document.getElementById('bookmarks-container');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');

// create an empty bookmarks array
let bookmarks = [];

// Show modal, Focus on Input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event listener
window.addEventListener('click', (e)=>{(e.target === modal ? modal.classList.remove('show-modal') : false)})
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()=>{modal.classList.remove('show-modal')});

// Validate form
function validate(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue) {
        alert('Please submit values for both fields.')
        return false;
    }
    if(!urlValue.match(regex)){       
        alert('Please provide a valid web address.')
        return false;
    }
    // Valid 
    return true;
}



// Build Bookmarks DOM
function buildBookmarks() {
     // Remove all bookmarks elements
     bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {       
        // Destruction
        const{name, url} = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-trash-alt');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
        // Favicon / Link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // Append to bookmarks container. Must append from smallest to the largest.
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    })
}

// Fetch bookmarks
function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        // Create bookmarks array in local storage
        bookmarks = [
            {
                name: 'Google',
                url: 'https://www.google.com/'
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
}

// Delete Bookmarks
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i)=>{
        if(bookmark.url === url){
            bookmarks.splice(i,1);
        }
    });
    // Update bookmarks array in local storage. Re-populate DOM.
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Handle data from form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue =websiteUrlEl.value;
    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`;
    }
    //console.log(nameValue, urlValue);
    if(!validate(nameValue,urlValue)){
        return false;
    }

    // Set bookmark object. Push JS object into the array.
    const bookmark = {
        name: nameValue,
        url: urlValue
    }   
    bookmarks.push(bookmark);    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
    console.log(JSON.stringify(bookmarks));
}

// Event listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On load. Fetch bookmarks
fetchBookmarks()
