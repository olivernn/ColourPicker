colourPicker = (function () {

  var canvas, context, callbacks = [], colours = []

  var init = function () {
    canvas = document.querySelector("canvas")
    context = canvas.getContext('2d');

    (360).times(function (x) {
      colours[x] = [];
      (100).times(function (y) {
        colours[x][y] = context.fillStyle = 'hsl(' + x + ', ' + (100 - y) + '%, 50%)'
        context.fillRect(x,y,2,2)
      })
    })

    var $canvas = $(canvas)
    var scalingRatio = 360 / parseInt($canvas.css('width'), 10)

    var getColour = function (e) {
      return {
        hue: parseInt(e.offsetX * scalingRatio, 10),
        saturation: (100 - parseInt(e.offsetY * scalingRatio, 10)),
        lightness: 50
      }
    }

    var performCallbacks = function (e) {
      callbacks.forEach(function (callback) {
        callback(getColour(e))
      })
    }

    var unbindEvents = function () {
      $canvas.unbind('mouseleave')
      $canvas.unbind('mouseup')
      $canvas.unbind('mousemove')
    }

    $canvas.bind('mousedown', function () {
      $canvas.bind('mousemove', performCallbacks)
      $canvas.one('mouseleave', unbindEvents)
      $canvas.one('mouseup', unbindEvents)
    })

    $canvas.bind('click', performCallbacks)
  }

  var colourSelected = function (callback) {
    callbacks.push(callback)
  }

  return {
    init: init,
    colourSelected: colourSelected
  }
})()