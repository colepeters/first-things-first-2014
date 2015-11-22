'use strict'

var toggleContainer = document.querySelector('.js-toggleContainer')
var toggleSignatories = document.querySelector('.js-toggleSignatories')
var signatories = document.querySelector('.js-signatories')
var signatoriesCount = document.querySelectorAll('.js-signatories ul li').length
var formattedSignatoriesCount = signatoriesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Sets inline style of display: block to override the container’s
// default style of display: none
var showToggleContainer = function () {
  var thisStyle = toggleContainer.style
  thisStyle.display = 'block'
}

// Add the is-truncated class (see app.css)
// and set the button text with the number of signatories
var truncateSignatories = function () {
  signatories.classList.add('is-truncated')
  toggleSignatories.innerHTML = 'Show all the signatories (' + formattedSignatoriesCount + ')'
}

// Remove the is-truncated class (see app.css)
var expandSignatories = function () {
  signatories.classList.remove('is-truncated')
  toggleSignatories.innerHTML = 'Collapse the list of signatories'
}

truncateSignatories()
showToggleContainer()

toggleSignatories.onclick = function () {
  if (signatories.classList.contains('is-truncated')) {
    expandSignatories()
  } else {
    truncateSignatories()
  }
}
