var hexControlView = (function () {
  var selector = "#hex-controls-container",
      elem,
      changeCallbacks = []

  var init = function () {
    elem = $(selector)
    elem.delegate('input', 'change', callChangeCallbacks)
    colour.onChange(displayHexColour)
  }

  var displayHexColour = function () {
    elem.find('input').val(colour.hex)
  }

  var callChangeCallbacks = function (e) {
    e.preventDefault()
    var value = this.value
    changeCallbacks.forEach(function (cb) { cb(value) })
  }

  var onChange = function (cb) {
    changeCallbacks.push(cb)
  }

  return {
    init: init,
    onChange: onChange
  }
})()