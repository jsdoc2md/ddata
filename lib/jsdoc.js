/**
extracts url and caption data from @link tags
@param {string} - a string containing one or more {@link} tags
@returns {Array.<{original: string, caption: string, url: string}>}
@static
*/
Identifiers.prototype.parseLink = function (text) {
  if (!text) return ''
  var results = []
  var matches = null
  var link1 = /{@link (\S+?)}/g; // {@link someSymbol}
  var link2 = /\[(.+?)\]{@link (\S+?)}/g; // [caption here]{@link someSymbol}
  var link3 = /{@link ([^\s}]+?)\|(.+?)}/g; // {@link someSymbol|caption here}
  var link4 = /{@link ([^\s}\|]+?) (.+?)}/g; // {@link someSymbol Caption Here}

  while((matches = link4.exec(text)) !== null){
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    })
    text = text.replace(matches[0], s.fill(' ', matches[0].length))
  }

  while((matches = link3.exec(text)) !== null){
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    })
    text = text.replace(matches[0], s.fill(' ', matches[0].length))
  }

  while((matches = link2.exec(text)) !== null){
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[2]
    })
    text = text.replace(matches[0], s.fill(' ', matches[0].length))
  }

  while((matches = link1.exec(text)) !== null){
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[1]
    })
    text = text.replace(matches[0], s.fill(' ', matches[0].length))
  }
  return results
}
