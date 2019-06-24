const markdown = require('helper-markdown');

module.exports = {
  ifIn: function(elem, list, options) {
    let strList = list.map(item =>
      item && item.toString ? item.toString() : item
    )
    if (strList.indexOf(elem && elem.toString ? elem.toString() : elem) > -1) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  markdown: markdown()
}
