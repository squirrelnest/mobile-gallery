import {
  login,
  openSlideShow,
  closeSlideShow,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd
} from './interactions.js'

// GLOBAL VARIABLES

var slideCounter = 0 // total number of slides created
var node_index = 0;
var slideshowFragment = document.createDocumentFragment();
var galleryFragment = document.createDocumentFragment();


// IMAGE ASSETS - to be replaced with API

export const photos = [
  {id: 1, url: 'images/jpeg/air.jpg', thumb: 'images/thumbnails/S-air.jpg', webp: 'images/webp/air.webp', name: 'air'},
  {id: 2, url: 'images/jpeg/desks.jpg', thumb: 'images/thumbnails/S-desks.jpg', webp: 'images/webp/desks.webp', name: 'desks'},
  {id: 3, url: 'images/jpeg/hive.jpg', thumb: 'images/thumbnails/S-hive.jpg', webp: 'images/webp/hive.webp', name: 'hive'},
  {id: 4, url: 'images/jpeg/logo.jpg', thumb: 'images/thumbnails/S-logo.jpg', webp: 'images/webp/logo.webp', name: 'logo'},
  {id: 5, url: 'images/jpeg/lounge.jpg', thumb: 'images/thumbnails/S-lounge.jpg', webp: 'images/webp/lounge.webp', name: 'lounge'},
  {id: 6, url: 'images/jpeg/lounge2.jpg', thumb: 'images/thumbnails/S-lounge2.jpg', webp: 'images/webp/lounge2.webp', name: 'lounge2'},
  {id: 7, url: 'images/jpeg/mountainview.jpg', thumb: 'images/thumbnails/S-mountainview.jpg', webp: 'images/webp/mountainview.webp', name: 'mountainview'},
  {id: 8, url: 'images/jpeg/racecar.jpg', thumb: 'images/thumbnails/S-racecar.jpg', webp: 'images/webp/racecar.webp', name: 'racecar'},
  {id: 9, url: 'images/jpeg/hive.jpg', thumb: 'images/thumbnails/S-hive.jpg', webp: 'images/webp/hive.webp', name: 'hive'}
]

// ESTABLISH REFERENCES

const loginBtn = document.getElementById('loginBtn')
const titlebar = document.getElementById('titlebar')
const tools = document.getElementById('tools')
const backBtn = document.getElementById('backBtn')
const closeBtn = document.getElementById('closeBtn')
const scrim = document.getElementById('scrim')
const slideshow = document.getElementById('slideshow')

// ATTACH EVENT LISTENERS AND HANDLERS

loginBtn.onclick = (event) => { login(event); }
tools.onclick = () => { tools.classList.toggle('show'); }
tools.ontouchstart = (event) => { handleTouchStart(event); }
tools.ontouchmove = (event) => { handleTouchMove(event); }
tools.ontouchend = (event) => { handleTouchEnd(event); }
backBtn.onclick = (event) => { closeSlideShow(event); }
closeBtn.onclick = (event) => { closeSlideShow(event); }

// INITIALIZE 'GALLERY'

export const createThumbnail = (photo) => {
  // create thumbnail
  let thumbnail = document.createElement('DIV')
  thumbnail.className = 'thumbnail'
  thumbnail.id = `thumbnail_${photo.id}`
  thumbnail.title = photo.name
  thumbnail.style.backgroundImage = 'url(' + photo.thumb + ')'
  thumbnail.onclick = (event) => { openSlideShow(event); }
  // add thumbnail to gallery fragment
  galleryFragment.appendChild(thumbnail)
}
photos.slice(0,8).forEach(photo => { createThumbnail(photo); })
document.getElementById('gallery').appendChild(galleryFragment)

// INITIALIZE 'SLIDESHOW'

photos.slice(0,8).forEach(photo => {
  // set image sources
  let sourceWebP = document.createElement('SOURCE')
  sourceWebP.type = 'image/webp'
  sourceWebP.srcset = photo.webp
  let sourceDefault = document.createElement('IMG')
  sourceDefault.src = photo.url
  sourceDefault.alt = photo.name
  sourceDefault.className = 'image'
  // create image element
  let image = document.createElement('PICTURE')
  image.setAttribute('role', 'img')
  image.setAttribute('aria-label', photo.name)
  image.appendChild(sourceWebP)
  image.appendChild(sourceDefault)
  // create slide to contain image
  let slide = document.createElement('DIV')
  slide.className = 'slide'
  slide.id = photo.id
  slide.title = photo.name
  slide.appendChild(image)
  // add slide to slideshow fragment
  slideshowFragment.appendChild(slide)
  slideCounter++
})
document.getElementById('slideshow').appendChild(slideshowFragment)

// FETCH NEXT SET OF PHOTOS

export const fetchPhotos = (currentId) => {
  // get data for next batch of photos 

  // append data to local photos store
  
  // replace slide content
  for (var i=1; i<=8; i++) {
    if (node_index == 7) {
      node_index = 0
    } else {
      node_index++
    }
    createSlide(photos[currentId], node_index)
    createThumbnail(photos[currentId])
  }
  // add thumbnails
  document.getElementById('gallery').appendChild(galleryFragment)
}

// UPDATE SLIDES WITH NEXT SET OF PHOTOS

export const createSlide = (photo, node_index) => { // leave slide node in place and replace its content with new photo
  let slide = document.querySelectorAll('.slide')[node_index] 
  slide.setAttribute('id', photo.id)
  slide.setAttribute('title', photo.name)
  let image = slide.querySelector('picture')
  image.setAttribute('aria-label', photo.name)
  let sourceWebP = slide.querySelector('source')
  sourceWebP.setAttribute('srcset', photo.webp)
  let sourceDefault = slide.querySelector('img')
  sourceDefault.setAttribute('src', photo.url)
  sourceDefault.setAttribute('alt', photo.name)
}
