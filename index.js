import {
  login,
  openSlideShow,
  openSlide,
  closeSlide,
  closeSlideShow,
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
const slideshow = document.getElementById('slideshow')

// ATTACH EVENT LISTENERS AND HANDLERS

loginBtn.onclick = (event) => { login(event); }
tools.onclick = () => { tools.classList.toggle('show') }
tools.ontouchstart = (event) => { handleTouchStart(event); }
tools.ontouchmove = (event) => { handleTouchMove(event); }
tools.ontouchend = (event) => { handleTouchEnd(event); }
backBtn.onclick = (event) => { closeSlide(event); }
closeBtn.onclick = (event) => { closeSlide(event); }

// CREATE GRID VIEW - 'GALLERY'

photos.forEach(photo => {
  // create thumbnail
  let thumbnail = document.createElement('DIV')
  thumbnail.className = 'thumbnail'
  thumbnail.id = `thumbnail_${photo.id}`
  thumbnail.title = photo.name
  thumbnail.style.backgroundImage = 'url(' + photo.url + ')'
  thumbnail.onclick = (event) => { openSlideShow(event); }
  // add thumbnail to gallery
  document.getElementById('gallery').appendChild(thumbnail)
})

// CREATE DETAIL VIEW - 'SLIDESHOW'

photos.forEach(photo => {
  // create image element
  let image = document.createElement('DIV')
  image.setAttribute('role', 'img')
  image.setAttribute('aria-label', photo.name)
  image.style.backgroundImage = 'url(' + photo.url + ')'
  image.className = 'image'
  // create slide for image
  let slide = document.createElement('DIV')
  slide.className = 'slide'
  slide.id = photo.id
  slide.title = photo.name
  slide.onclick = (event) => { openSlide(event); }
  slide.appendChild(image)
  // add slide to gallery
  document.getElementById('slideshow').appendChild(slide)
})
