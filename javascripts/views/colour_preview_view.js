var colourPreviewView = (function () {

  var elem

  var init = function () {
    elem = document.getElementById("preview")
    colour.onChange(displayColor)
  }

  var displayColor = function () {
    elem.style.backgroundColor = colour.hex
  }

  return {
    init: init
  }
})()