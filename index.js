// STATE

var currentNode = document.documentElement; // selected node
var currentId; // id of selected node
var startX = 0; // first x-coordinate of contact point
var endX = 0; // final x-coordinate of contact point

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
  tile.onclick = (event) => { openSlide(event); }
  document.getElementById('gallery').appendChild(tile)
})

// INTERACTIONS

const getNextImage = () => {
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

const updateTitle = () => {
  selectedTitle = currentNode.title
  let newTitle = titleText(selectedTitle)
  document.getElementById('titlebar').replaceChild(newTitle, document.getElementById('titleText'))
}

const openSlide = (event) => {
  currentId = event.target.id
  currentNode = document.getElementById(currentId)
  updateTitle()
  currentNode.classList.add('openSlide')
  tools.classList.add('showOverlay')
  currentNode.ontouchstart = (event) => { handleTouchStart(event); }
  currentNode.ontouchmove = (event) => { handleTouchMove(event); }
  currentNode.ontouchend = (event) => { handleTouchEnd(event); }
}

const closeSlide = (event) => {
  event.preventDefault()
  event.stopPropagation()
  tools.classList.remove('showOverlay')
  currentNode.classList.remove('openSlide')
  currentNode.ontouchstart = null
  currentNode.ontouchmove = null
  currentNode.ontouchend = null
}

// TOUCH EVENT HANDLERS

const handleTouchStart = (event) => {
  event.preventDefault()
  startX = event.touches[0].clientX
}

const handleTouchMove = (event) => {
  for (var i=0; i<event.touches.length; i++) {
    endX = event.touches[i].clientX
    currentNode.style.transform = `translate3d(${endX-startX}px, 0, 0)`
  }
}

const handleTouchEnd = (event) => {
  if (event.target.parentNode.id === 'titlebar') {
    // close slide if titlebar tapped
    closeSlide(event);
  } else if (Math.abs(endX - startX) >= document.getElementById('gallery').clientWidth/6) {
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
  } else {
    // snap back into original place if swipe accidental
    tools.classList.toggle('showOverlay')
    currentNode.style.transform = `translate3d(0, 0, 0)`
  }
}
