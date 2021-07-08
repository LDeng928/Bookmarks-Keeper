# Bookmarks-Keeper
#### This project is created by following one of ZTM's tutorials. 
#### I will continue to make UI changes.

Live demo: https://ldeng928.github.io/Bookmarks-Keeper/

------------------------------------------------------------------
#### Thought process
Store bookmarks function
1. Create a bookmarks array
2. create a js object 
3. push the js object into the bookmarks array
4. reset the bookmarkForm
5. refocus the websiteNameEl.
6. push to local storage (Need to convert a JS object into a string.) (Use JSON.stringigy())
7. get the string back from JSON. Use JSON.parse()

Fetch bookmarks from local strorage
1. Create a fetch function. fetchBookmarks()
2. Check if there is anything in local storage. 
3. Else create a bookmarks array. Pass in one object to show how the app works.
4. Save that to the local storage
5. Call the function
6. Load the fetchBookmark function on page load.

Build DOM elements.
1. Use forEach loop
2. Use destruction to store name and url
3. Create all the elements from
4. Remove the items in the bookmarksContainer before the loop.

Delete Bookmark
1. Pass url parameter
2. Pass the url and loop through the array  and delete the matched array.
3. Use the array splice() method, which changes the contents of an array by removing or replacing existing elements and/or adding new elements.
4. forEach loop - pass in the individual bookmark and the index.
5. Use if statement to check if there is a match between the url and bookmarks array.
6. Update bookmarks array in local storage and re-populate DOM.

##### Use object instead array to store bookmarks.
Advantage: 
1. Avoid long loops in deleteBookmark()
2. Better data structures
