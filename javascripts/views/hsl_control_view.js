var hslControlView = (function () {

  var selector = "#hsl-controls-container",
      elem,
      changeCallbacks = []

  var init = function () {
    elem = $(selector)
    colour.onChange(displayHSLColour)

    elem.delegate('input', 'change', callChangeCallbacks)
    elem.find('input[type="range"]').range()
  }

  var callChangeCallbacks = function (e) {
    var hslObj = Array.prototype.reduce.call(elem.find("input[type='range']"), function (memo, elem) {
      memo[elem.name] = elem.value
      return memo
    }, {})

    hslObj[this.name] = this.value

    changeCallbacks.forEach(function (cb) {
      cb(hslObj)
    })
  }

  var displayHSLColour = function () {
    elem
      .find('#hueValue, #hueRange:inActive')
        .val(colour.hsl.hue)
      .end()

      .find('#saturationValue, #saturationRange:inActive')
        .val(colour.hsl.saturation)
      .end()

      .find('#lightnessValue, #lightnessRange:inActive')
        .val(colour.hsl.lightness)
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