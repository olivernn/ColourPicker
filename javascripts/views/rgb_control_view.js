var rgbControlView = (function () {

  var selector = "#rgb-controls-container",
      elem,
      changeCallbacks = []

  var init = function () {
    elem = $(selector)
    colour.onChange(displayRGBColour)
    elem.delegate('input', 'change', callChangeCallbacks)
    elem.find('input[type="range"]').range()
  }

  var callChangeCallbacks = function (e) {
    var rgbObj = Array.prototype.reduce.call(elem.find("input[type='range']"), function (memo, elem) {
      memo[elem.name] = elem.value
      return memo
    }, {})

    rgbObj[this.name] = this.value

    changeCallbacks.forEach(function (cb) {
      cb(rgbObj)
    })
  }

  var displayRGBColour = function () {
    elem
      .find('#redValue, #redRange:inActive')
        .val(colour.rgb.red)
      .end()

      .find('#greenValue, #greenRange:inActive')
        .val(colour.rgb.green)
      .end()

      .find('#blueValue, #blueRange:inActive')
        .val(colour.rgb.blue)
      .end()
  }

  var onChange = function (cb) {
    changeCallbacks.push(cb)
  }

  return {
    init: init,
    onChange: onChange
  }
})()