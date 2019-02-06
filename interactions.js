import { photos } from './index.js'

// STATE

export var currentNode = document.documentElement; // selected node
export var currentId; // id of selected node
export var startX = 0; // first x-coordinate of contact point
export var endX = 0; // final x-coordinate of contact point
export var offsetX = 0; // difference between startX and endX
export var startY = 0; // first x-coordinate of contact point
export var endY = 0; // final x-coordinate of contact point
export var offsetY = 0; // difference between startY and endY

// INTERACTIONS

export const openSlide = (event) => {
  // retrieve slide details
  let pattern = /\d/
  currentId = pattern.exec(event.target.id)[0]
  currentNode = document.getElementById(currentId)
  updateTitle()
  // change styles
  slideshow.classList.add('show')
  currentNode.classList.add('openSlide')
  tools.classList.add('show')
  tools.classList.add('openOverlay')
  scrim.classList.add('show')
  scrim.classList.add('fadeIn')
  // attach event handlers
  currentNode.ontouchstart = (event) => { handleTouchStart(event); }
  currentNode.ontouchmove = (event) => { handleTouchMove(event); }
  currentNode.ontouchend = (event) => { handleTouchEnd(event); }
}

export const getNextImage = () => {
  // deactivate current node
  currentNode.classList.remove('openSlide')
  currentNode.removeAttribute('style')
  currentNode.ontouchstart = null
  currentNode.ontouchmove = null
  currentNode.ontouchend = null
  // activate new node
  let next = document.getElementById(currentId)
  next.classList.add('openSlide')
  next.ontouchstart = (event) => { handleTouchStart(event) }
  next.ontouchmove = (event) => { handleTouchMove(event) }
  next.ontouchend = (event) => { handleTouchEnd(event) }
  // set currentNode to next node
  currentNode = next
  updateTitle()
}

export const updateTitle = () => {
  // re-render title
  let selectedTitle = currentNode.title
  let newTitle = titleText(selectedTitle)
  titlebar.replaceChild(newTitle, document.getElementById('titleText'))
}

export const titleText = (text='default') => {
  // create new title
  let photoTitle = document.createElement('DIV')
  let h1 = document.createElement('H1')
  let textNode = document.createTextNode(text)
  h1.appendChild(textNode)
  photoTitle.appendChild(h1)
  photoTitle.id = 'titleText'
  return photoTitle;
}

export const closeSlide = (event) => {
  event.preventDefault()
  event.stopPropagation()
  // detach event handlers
  currentNode.classList.remove('openSlide')
  currentNode.removeAttribute('style')
  currentNode.ontouchstart = null
  currentNode.ontouchmove = null
  currentNode.ontouchend = null
  // change styles
  scrim.classList.remove('fadeIn')
  scrim.classList.remove('show')
  tools.classList.remove('show')
  tools.classList.remove('openOverlay')
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
      currentNode.style.transform = `translate3d(${offsetX}px, 0, 0)`
    } else if (Math.abs(offsetX) < Math.abs(offsetY)) {
      // move tile vertically if touch moved more vertically than horizontally
      currentNode.style.transform = `translate3d(0, ${offsetY}px, 0)`
    } 
  }
}

export const handleTouchEnd = (event) => {
  if (event.target.id === 'titlebar' || event.target.parentNode.id === 'titlebar') {
    // close slide if titlebar tapped
    closeSlide(event);
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
    currentNode.style.transform = `translate3d(0, 0, 0)`
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
