import { photos } from './index.js'

// STATE

export var currentSlide = document.documentElement; // selected node
export var currentId; // id of selected node
export var startX = 0; // first x-coordinate of contact point
export var endX = 0; // final x-coordinate of contact point
export var offsetX = 0; // difference between startX and endX
export var startY = 0; // first x-coordinate of contact point
export var endY = 0; // final x-coordinate of contact point
export var offsetY = 0; // difference between startY and endY

// INTERACTIONS

export const openSlideShow = (event) => {
   // set global variables
   let pattern = /\d/
   currentId = pattern.exec(event.target.id)[0]
   slideshow.classList.add('show')
   // get first slide
   currentSlide = document.getElementById(currentId)
   updateTitle()
   openSlide()
   openOverlay()
}

export const openSlide = () => {
  // change styles
  currentSlide.classList.add('openSlide')
  currentSlide.firstChild.classList.add('bubbleUp')
  // attach event handlers
  currentSlide.ontouchstart = (event) => { handleTouchStart(event); }
  currentSlide.ontouchmove = (event) => { handleTouchMove(event); }
  currentSlide.ontouchend = (event) => { handleTouchEnd(event); }
}

export const openOverlay = () => {
  tools.classList.add('show')
  tools.classList.add('openOverlay')
  scrim.classList.add('show')
  scrim.classList.add('fadeIn')
}

export const getNextImage = () => {
  // deactivate current slide
  closeSlide()
  // set next slide as current slide
  currentSlide = document.getElementById(currentId)
  // activate new slide
  updateTitle()
  openSlide()
}

export const updateTitle = () => {
  document.getElementById('titleText').textContent = currentSlide.title
}

export const closeSlide = () => {
  // change styles
  currentSlide.classList.remove('openSlide')
  currentSlide.removeAttribute('style')
  currentSlide.firstChild.classList.remove('bubbleUp')
  // remove event handlers
  currentSlide.ontouchstart = null
  currentSlide.ontouchmove = null
  currentSlide.ontouchend = null
}

export const closeSlideShow = (event) => {
  event.preventDefault()
  event.stopPropagation()
  // close current slide
  closeSlide()
  // close overlays and scrims
  scrim.classList.remove('fadeIn')
  scrim.classList.remove('show')
  tools.classList.remove('show')
  tools.classList.remove('openOverlay')
  //close slideshow
  slideshow.classList.remove('show')
}

// TOUCH EVENT HANDLERS

export const handleTouchStart = (event) => {
  event.preventDefault()
  startX = event.touches[0].clientX
  startY = event.touches[0].clientY
}

export const handleTouchMove = (event) => {
  for (var i=0; i<event.touches.length; i++) {
    endX = event.touches[i].clientX
    endY = event.touches[i].clientY
    offsetX = endX-startX
    offsetY = endY-startY
    if (Math.abs(offsetX) > Math.abs(offsetY)) { 
      // move tile horizontally if touch moved more horizontally than vertically
      currentSlide.style.transform = `translate3d(${offsetX}px, 0, 0)`
    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
      // move tile vertically if touch moved more vertically than horizontally
      currentSlide.style.transform = `translate3d(0, ${offsetY}px, 0)`
    } 
  }
}

export const handleTouchEnd = (event) => {
  if (event.target.id === 'titlebar' || event.target.parentNode.id === 'titlebar') {
    // close slide if titlebar tapped
    closeSlideShow(event);
  } else if (
    Math.abs(offsetX) >= document.getElementById('gallery').clientWidth/6 ||
    Math.abs(offsetY) >= document.getElementById('gallery').clientHeight/6) {
    if ( 
      (Math.abs(offsetX) > Math.abs(offsetY) && (offsetX) < 0) || 
      (Math.abs(offsetX) < Math.abs(offsetY) && (offsetY) < 0) ){ // if swipe left or up, go forward one image
      if (currentId == photos.length) {
        currentId = 1
      } else {
        currentId ++
      }
    } else if (
      (Math.abs(offsetX) > Math.abs(offsetY) && (offsetX) > 0) || 
      (Math.abs(offsetX) < Math.abs(offsetY) && (offsetY) > 0) ) { // if swipe right or down, go back one image
      if (currentId == 1) {
        currentId = photos.length
      } else {
        currentId --
      }
    }
    getNextImage()
  } else { // snap back to origin if swipe accidental
    tools.classList.toggle('show')
    tools.classList.toggle('openOverlay')
    currentSlide.style.transform = `translate3d(0, 0, 0)`
  }
}

export const login = (event) => {
  event.preventDefault()
  // not very secure w/o hashing but keeps out crawlers and riff raff
  var raw_password = document.getElementById('password').value
  if (raw_password === 'hordor') {
    document.getElementById('login').remove()
    document.getElementById('protected').classList.replace('hide', 'show')
  } else {
    alert('Wrong password')
    document.getElementById('password').value = ''
  }
}
