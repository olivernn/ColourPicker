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

    var performCallbacks = function (e) {
      callbacks.forEach(function (callback) {
        callback({
          hue: e.offsetX,
          saturation: (100 - e.offsetY),
          lightness: 50
        })
      })
    }

    $canvas.bind('mousedown', function () {
      $canvas.bind('mousemove', performCallbacks)

      $canvas.one('mouseup', function () {
        $canvas.unbind('mousemove')
      })
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