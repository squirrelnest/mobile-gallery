import {
  login,
  titleText,
  openSlide,
  closeSlide,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd
} from './interactions.js'

// IMAGE ASSETS - to be replaced with API

export const photos = [
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

// LOGIN

document.getElementById('loginBtn').onclick = (event) => { login(event); }

// OVERLAY

const tools = document.getElementById('tools')
tools.onclick = () => { tools.classList.toggle('show'); }
tools.ontouchstart = (event) => { handleTouchStart(event); }
tools.ontouchmove = (event) => { handleTouchMove(event); }
tools.ontouchend = (event) => { handleTouchEnd(event); }

const backBtn = document.createElement('IMG')
backBtn.src = 'icons/back.svg'
backBtn.id = 'backBtn'
backBtn.className = 'icon'
backBtn.onclick = (event) => { closeSlide(event); }

const closeBtn = document.createElement('H1')
closeBtn.className = 'closeBtn'
closeBtn.innerHTML = '&#10005;'
closeBtn.onclick = (event) => { closeSlide(event); }

const titlebar = document.createElement('DIV')
titlebar.id = 'titlebar'
titlebar.className = 'tool titlebar'
titlebar.appendChild(backBtn)
titlebar.appendChild(titleText())
titlebar.appendChild(closeBtn)
document.getElementById('tools').appendChild(titlebar)

const footer = document.createElement('DIV')
footer.className = 'tool footer'
footerIcons.forEach(icon => {
  let action = document.createElement('IMG')
  action.src = icon.url
  action.id = icon.name
  action.className = 'icon'
  footer.appendChild(action)
})
document.getElementById('tools').appendChild(footer)

// GALLERY

photos.forEach(photo => {
  // create tile to contain image
  let tile = document.createElement('DIV')
  tile.id = photo.id
  tile.title = photo.name
  tile.className = 'tile'
  tile.setAttribute('role', 'img')
  tile.setAttribute('aria-label', photo.name)
  tile.style.backgroundImage = 'url(' + photo.url + ')'
  tile.onclick = (event) => { openSlide(event); }
  document.getElementById('gallery').appendChild(tile)
})

const scrim = document.createElement('DIV')
scrim.id = 'scrim'
scrim.className = 'scrim'
document.getElementById('gallery').prepend(scrim)
