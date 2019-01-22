// GLOBALS

// IMAGE ASSETS - to be replaced with API

const photos = [
    {id: 1, url: 'images/air.jpg', name: 'air'},
    {id: 2, url: 'images/desks.jpg', name: 'desks'},
    {id: 3, url: 'images/hive.jpg', name: 'hive'},
    {id: 4, url: 'images/logo.jpg', name: 'logo'},
    {id: 5, url: 'images/lounge.jpg', name: 'lounge'},
    {id: 6, url: 'images/lounge2.jpg', name: 'lounge2'},
    {id: 7, url: 'images/mountainview.jpg', name: 'mountainview'},
    {id: 8, url: 'images/racecar.jpg', name: 'racecar'}
  ]

const icons = [
    {id: 'plusOne', url: 'icons/plusOne.svg', name: 'plusOne'},
    {id: 'comment', url: 'icons/comment.svg', name: 'comment'},
    {id: 'add', url: 'icons/add.svg', name: 'add'},
    {id: 'share', url: 'icons/share.svg', name: 'share'}
  ]

// OVERLAY

const tools = document.getElementById('tools')
tools.onclick = function () {
  this.classList.remove('showOverlay')
}

const closeBtn = document.createElement("DIV")
closeBtn.className = 'closeBtn'
closeBtn.innerHTML = '&#10005;'
closeBtn.onclick = function () {
  document.getElementsByClassName('isAnimating')[0].classList.remove('isAnimating')
}

const titlebar = document.createElement("DIV")
titlebar.className = 'tool titlebar'
titlebar.innerHTML = selected
titlebar.appendChild(closeBtn)
document.getElementById('tools').appendChild(titlebar)

const footer = document.createElement("DIV")
footer.className = 'tool footer'
icons.forEach(icon => {
  let action = document.createElement("IMG")
  action.src = icon.url
  action.id = icon.name
  footer.appendChild(action)
})
document.getElementById('tools').appendChild(footer)

// GALLERY

var selected = '';

photos.forEach(photo => {
  // create tile to contain image
  let tile = document.createElement("DIV")
  tile.id = photo.id
  tile.title = photo.name
  tile.className = 'tile'
  tile.setAttribute('role', 'img')
  tile.setAttribute('aria-label', photo.name)
  tile.style.backgroundImage = "url(" + photo.url + ")"
  // handle clicks
  tile.onclick = function (event) {
    selected = event.target.title
    console.log(event.target.title)
    this.classList.add('isAnimating')
    tools.classList.add('showOverlay')
  };
  document.getElementById('gallery').appendChild(tile)
})
