
module.exports.register = function (handlebars, config) {
  config = config || {}

  function getBlock (blockName, text) {
    var str = text
    var startIndex = str.indexOf(blockName + ':')
    str = str.substring(startIndex)
    var endIndex = str.indexOf('</p>')
    str = str.substring(0, endIndex)

    return (startIndex > 0) ? str : ''
  }

  function removeString (text, substring) {
    substring = '<p>' + substring + '</p>'
    return text.substring(0, text.indexOf(substring)) + text.replace(/(\r\n|\n|\r)/gm, ' ').substring(substring.length).trim()
  }

  handlebars.registerHelper('print', function (text) {
    var alert = getBlock('Alert', text)
    var warning = getBlock('Warning', text)
    var info = getBlock('Info', text)
    var supports = getBlock('Supports', text)

    var result = ''

    if (alert.length) {
      text = removeString(text, alert)
      result += '<div class="kss-block kss-mod-alert">' + alert.substring(6) + '</div>'
    }

    if (warning.length) {
      text = removeString(text, warning)
      result += '<div class="kss-block kss-mod-warning">' + warning.substring(8) + '</div>'
    }

    if (info.length) {
      text = removeString(text, info)
      result += '<div class="kss-block kss-mod-info">' + info.substring(5) + '</div>'
    }

    if (supports.length) {
      text = removeString(text, supports)
      result += '<div class="kss-block kss-mod-supports">' + supports.substring(9) + '</div>'
    }

    result += text
    return result
  })
}
