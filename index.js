// GLOBALS

var selected;

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

const footerIcons = [
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

const backBtn = document.createElement("DIV")
let action = document.createElement("IMG")
action.src = 'icons/back.svg'
action.id = 'backBtn'
backBtn.appendChild(action)

const closeBtn = document.createElement("H1")
closeBtn.className = 'closeBtn'
closeBtn.innerHTML = '&#10005;'
closeBtn.onclick = function () {
  document.getElementsByClassName('isAnimating')[0].classList.remove('isAnimating')
}

const titleText = (text='default') => {
  let photoTitle = document.createElement("DIV")
  let h1 = document.createElement("H1")
  let textNode = document.createTextNode(text)
  h1.appendChild(textNode);
  photoTitle.appendChild(h1)
  photoTitle.id = 'titleText'
  return photoTitle
}

const titlebar = document.createElement("DIV")
titlebar.id = 'titlebar'
titlebar.className = 'tool titlebar'
titlebar.appendChild(backBtn)
titlebar.appendChild(titleText())
titlebar.appendChild(closeBtn)
document.getElementById('tools').appendChild(titlebar)

const footer = document.createElement("DIV")
footer.className = 'tool footer'
footerIcons.forEach(icon => {
  let action = document.createElement("IMG")
  action.src = icon.url
  action.id = icon.name
  footer.appendChild(action)
})
document.getElementById('tools').appendChild(footer)

// GALLERY

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
    let newTitle = titleText(selected)
    document.getElementById('titlebar').replaceChild(newTitle, document.getElementById('titleText'))
    this.classList.add('isAnimating')
    tools.classList.add('showOverlay')
  };
  document.getElementById('gallery').appendChild(tile)
})
