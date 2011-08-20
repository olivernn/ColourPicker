var colour = (function () {

  var red, green, blue, callbacks = []
  var div = document.createElement('div')
  var rgbRegex = /^rgb\((\d+), (\d+), (\d+)\)$/

  var pad = function (n, length) {
    length = length || 2
    return (n = n + "", n.length >= length) ? n : pad("0" + n, length);
  }

  var setColour = function (value) {
    div.style.backgroundColor = value
    var matches = rgbRegex.exec(div.style.backgroundColor).map(function (colour, i) {
      if (i === 0) return colour
      return parseInt(colour, 10)
    })
    red = matches[1], green = matches[2], blue = matches[3]
  }

  var triggerCallbacks = function () {
    callbacks.forEach(function (callback) {
      callback(colour)
    })
  }

  red = green = blue = 0

  var colour = Object.create({}, {

    asJSON: {
      value: function () {
        return {
          rgb: this.rgb,
          hsl: this.hsl,
          hex: this.hex
        }
      }
    },

    onChange: {
      value: function (callback) {
        callbacks.push(callback)
      }
    },

    rgb: {
      get: function () {
        return {
          red: red,
          green: green,
          blue: blue
        }
      },

      set: function (rgb) {
        red = parseInt(rgb.red, 10), green = parseInt(rgb.green, 10), blue = parseInt(rgb.blue, 10)
        triggerCallbacks()
      }
    },

    rgbString: {
      get: function () {
        return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
      }
    },

    hsl: {
      get: function () {
        var r = red / 255, g = green / 255, b = blue / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {hue: Math.floor(h * 360), saturation: Math.floor(s * 100), lightness: Math.floor(l * 100)};
      },

      set: function (hsl) {
        (typeof hsl === "string") ? setColour(hsl) : setColour('hsl(' + parseInt(hsl.hue, 10) + ', ' + parseInt(hsl.saturation, 10) + '%, ' + parseInt(hsl.lightness, 10) +'%)')
        triggerCallbacks()
      }
    },

    hslString: {
      get: function () {
        var hsl = this.hsl
        return 'hsl(' + hsl.hue + ', ' + hsl.saturation + '%, ' + hsl.lightness + '%)'
      }
    },

    hex: {
      get: function () {
        return ["#", pad(red.toString(16)), pad(green.toString(16)), pad(blue.toString(16))].join("")
      },

      set: function (hex) {
        setColour(hex)
        triggerCallbacks()
      }
    }
  })

  return colour
})()