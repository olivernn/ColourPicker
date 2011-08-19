(function ($) {
  $.expr[':'].inActive = function (objNode, intStackIndex, arrProperties, arrNodeStack) {
    return !$(objNode).data('active')
  }

  var toggleActive = function () {
    var range = $(this)
    var current = range.data('active')
    range.data('active', !current)
  }

  $.fn.range = function () {
    if (!this.length) return this

    return this.each(function () {
      var input = $(this)

      input.bind('mousedown', toggleActive)
      input.bind('mouseup', toggleActive)
    })
  }
})(jQuery)

