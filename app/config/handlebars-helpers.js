const markdown = require('helper-markdown');

module.exports = {
  ifIn: function(elem, list, options) {
    let strList = list && list.map(item =>
      item && item.toString ? item.toString() : item
    )
    if (strList && strList.indexOf(elem && elem.toString ? elem.toString() : elem) > -1) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  markdown: markdown(),
  equals: function(one, two, options) {
    one = one && one.toString ? one.toString() : one
    two = two && two.toString ? two.toString() : two
    if (one == two) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  ifOr: function(one, two, options) {
    if (one || two) {
      return options.fn(this)
    }
    else {
      return options.inverse(this)
    }
  }
}
