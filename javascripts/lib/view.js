var baseView = {

  render: function () {
    this.container().html(this.template()(this.presenter()))
    this.bindToChanges()
    return this
  },

  bindToChanges: function (cb) {
    this.container().find("form").bind('change', this.updateColour.bind(this).debounce(100))
  },

  template: function () {
    return Handlebars.compile($(["#", this.name, "-template"].join("")).text());
  },

  container: function () {
    return $(["#", this.name, "-container"].join(""))
  }
}

hexView = Object.create(baseView, {
  name: {
    value: 'hex-controls'
  },

  presenter: {
    value : function () {
      return {
        hex: colour.hex
      }
    }
  },

  updateColour: {
    value: function () {
      colour.hex = this.container().find("#hex").val()
    }
  }
})

hslView = Object.create(baseView, {
  name: {
    value: 'hsl-controls'
  },

  presenter: {
    value: function () {
      return colour.hsl
    }
  },

  updateColour: {
    value: function () {
      var hsl = {
        hue: this.container().find("#hueValue").val(),
        saturation: this.container().find("#saturationValue").val(),
        lightness: this.container().find("#lightnessValue").val()
      }
      colour.hsl = hsl
    }
  }
  
})

rgbView = Object.create(baseView, {
  name: {
    value: 'rgb-controls'
  },

  presenter: {
    value: function () {
      return colour.rgb
    }
  },

  update: {
    value: function () {
      this.container().find("#red-value").val(colour.rgb.red),
      this.container().find("#green-value").val(colour.rgb.green),
      this.container().find("#blue-value").val(colour.rgb.blue)
    }
  },

  updateColour: {
    value: function () {
      colour.rgb = {
        red: this.container().find("#red-value").val(),
        green: this.container().find("#green-value").val(),
        blue: this.container().find("#blue-value").val()
      }
    }
  }
})