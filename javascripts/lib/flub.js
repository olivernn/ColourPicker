flub = {

  baseViewMethods: {

    presenter: function () {
      return {}
    },

    generateHtml: function () {
      this.html = $(this.template(this.presenter()))
      return this.html
    },

    reload: function () {
      this.html.replaceWith($(this.template(this.presenter())))
    },

    remove: function () {
      this.html.remove()
    },

    render: function () {
      $(this.container).html(this.generateHtml())
    },
  },

  collectionView: function (name, controller) {
    var template = ["#", name, "-template"].join("")
    var container = ["#", name, "-container"].join("")

    var CollectionView = function (collection) {
      this.container = container
      this.template = template
      this.collection = collection
      this.template = Handlebars.compile($(template).text());
      this.init.call(this, this)
    }

    CollectionView.create = function (collection) {
      return new this (collection)
    }

    CollectionView.prototype = $.extend({}, flub.baseViewMethods, {

      addItem: function (item) {
        this.html.find('ul').append(this.itemView.create(item).generateHtml())
      },

      generateHtml: function () {
        var self = this
        this.html = flub.baseViewMethods.generateHtml.call(this)
        this.collection.each(function () {
          self.addItem(this)
        })
        return this.html
      }
    })

    if (controller) controller.call(CollectionView.prototype, CollectionView.prototype)

    return CollectionView
  },

  modelView: function (name, controller) {
    var template = ["#", name, "-template"].join("")
    var container = ["#", name, "-container"].join("")

    var ModelView = function (model) {
      this.container = container
      this.template = template
      this.model = model
      this.template = Handlebars.compile($(template).text());
      this.init.call(this, this)
    }

    ModelView.create = function (model) {
      return new this (model)
    }

    ModelView.prototype = $.extend({}, flub.baseViewMethods, {
      // other stuff might go here
    })

    if (controller) controller.call(ModelView.prototype, ModelView.prototype)

    return ModelView
  }
}