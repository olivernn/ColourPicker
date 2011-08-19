$(document).ready(function () {
  colourPicker.init()
  colourPreviewView.init()
  hexControlView.init()
  hslControlView.init()
  rgbControlView.init()

  colourPicker.colourSelected(function (hsl) {
    colour.hsl = hsl
  })

  hexControlView.onChange(function (hex) {
    colour.hex = hex
  })

  hslControlView.onChange(function (hsl) {
    colour.hsl = hsl
  })

  rgbControlView.onChange(function (rgb) {
    colour.rgb = rgb
  })

})