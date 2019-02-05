import {
  login,
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

// ESTABLISH REFERENCES

const loginBtn = document.getElementById('loginBtn')
const tools = document.getElementById('tools')
const backBtn = document.getElementById('backBtn')
const closeBtn = document.getElementById('closeBtn')
const titlebar = document.getElementById('titlebar')
const scrim = document.getElementById('scrim')

// ATTACH EVENT LISTENERS AND HANDLERS

loginBtn.onclick = (event) => { login(event); }
tools.onclick = () => { tools.classList.toggle('show') }
tools.ontouchstart = (event) => { handleTouchStart(event); }
tools.ontouchmove = (event) => { handleTouchMove(event); }
tools.ontouchend = (event) => { handleTouchEnd(event); }
backBtn.onclick = (event) => { closeSlide(event); }
closeBtn.onclick = (event) => { closeSlide(event); }

// CREATE GALLERY

photos.forEach(photo => {
  // create image element
  let image = document.createElement('IMG')
  image.id = photo.id
  image.title = photo.name
  image.setAttribute('role', 'img')
  image.setAttribute('aria-label', photo.name)
  // image.style.backgroundImage = 'url(' + photo.url + ')'
  image.src = photo.url
  image.className = 'tile-image'
  image.onclick = (event) => { openSlide(event); }
  // create tile to contain image
  let tile = document.createElement('DIV')
  tile.className = 'tile'
  tile.id = photo.id
  tile.title = photo.name
  tile.appendChild(image)
  // add tile to gallery
  document.getElementById('gallery').appendChild(tile)
})
