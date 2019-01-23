// STATE

var currentNode = document.documentElement;
var currentId;
var selectedTitle;
var rect = currentNode.getBoundingClientRect();
var originX = 0;
var startX = 0;
var endX = 0;
var destinationX = 0;
var list;

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
tools.onclick = () => { tools.classList.toggle('showOverlay'); }
// tools.ontouchstart = (event) => { handleTouchStart(event); }
// tools.ontouchmove = (event) => { handleTouchMove(event); }
// tools.ontouchend = (event) => { handleTouchEnd(event); }

const backBtn = document.createElement('IMG')
backBtn.src = 'icons/back.svg'
backBtn.id = 'backBtn'
backBtn.className = 'icon'
backBtn.onclick = () => { closeSlide(event); }

const closeBtn = document.createElement('H1')
closeBtn.className = 'closeBtn'
closeBtn.innerHTML = '&#10005;'
closeBtn.onclick = () => { closeSlide(event); }

const titleText = (text='default') => {
  let photoTitle = document.createElement('DIV')
  let h1 = document.createElement('H1')
  let textNode = document.createTextNode(text)
  h1.appendChild(textNode)
  photoTitle.appendChild(h1)
  photoTitle.id = 'titleText'
  return photoTitle;
}

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
  document.getElementById('gallery').appendChild(tile)
  // handle click
  tile.onclick = (event) => { openSlide(event); }
})

// INTERACTIONS

getNextImage = () => {
  // deactivate current node
  currentNode.classList.remove('openSlide')
  currentNode.style.transform = null
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

updateTitle = () => {
  selectedTitle = currentNode.title
  let newTitle = titleText(selectedTitle)
  document.getElementById('titlebar').replaceChild(newTitle, document.getElementById('titleText'))
}

openSlide = (event) => {
  currentId = event.target.id
  currentNode = document.getElementById(event.target.id)
  updateTitle()
  currentNode.classList.add('openSlide')
  tools.classList.add('showOverlay')
  // handle swipe
  document.getElementById(currentId).ontouchstart = (event) => { handleTouchStart(event); }
  document.getElementById(currentId).ontouchmove = (event) => { handleTouchMove(event); }
  document.getElementById(currentId).ontouchend = (event) => { handleTouchEnd(event); }
}

closeSlide = (event) => {
  event.stopPropagation()
  tools.classList.remove('showOverlay')
  currentNode.classList.remove('openSlide')
  currentNode.ontouchstart = null
  currentNode.ontouchmove = null
  currentNode.ontouchend = null
}

// EVENT HANDLERS

handleTouchStart = (event) => {
  event.preventDefault()
  currentNode = document.getElementById(event.target.id)
  rect = currentNode.getBoundingClientRect()
  // record where finger first touched screen
  startX = event.touches[0].clientX
  // set starting point for left position of selected image
  originX = startX - rect.left
}

handleTouchMove = (event) => {
  for(var i=0; i<event.touches.length; i++) {
    endX = event.touches[i].clientX
    destinationX = endX - rect.left
    currentNode.style.transform = `translate3d(${endX-startX}px, 0, 0)`
  }
  originX = 0
}

handleTouchEnd = (event) => {
  event.stopPropagation()
  if (Math.abs(endX - startX) >= document.getElementById('gallery').clientWidth/6) {
    if ((endX - startX) > 0) {
      // if swipe right, go forward one image
      if (currentId == photos.length) {
        currentId = 1
      } else {
        currentId ++
      }
    } else if ((endX - startX) < 0) {
      // if swipe left, go back one image
      if (currentId == 1) {
        currentId = photos.length
      } else {
        currentId --
      }
    }
    getNextImage()
  } else if (event.targetTouches.length === 0 || destinationX === 0) {
    tools.classList.toggle('showOverlay')
    destinationX = 0
    currentNode.style.transform = `translate3d(${-(destinationX-originX)}px, 0, 0)`
  } else {
    // snap back into original place if swipe accidental
    destinationX = 0
    currentNode.style.transform = `translate3d(${-(destinationX-originX)}px, 0, 0)`
    currentNode.style.position = 'absolute'
  }
}
