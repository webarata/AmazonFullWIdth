var REPLACE_ARRAY = [
                     ['!', '！'],
                     ['"', '”'],
                     ['#', '＃'],
                     ['$', '＄'],
                     ['%', '％'],
                     ['&', '＆'],
                     ["'", '’'],
                     ['(', '（'],
                     [')', '）'],
                     ['*', '＊'],
                     ['+', '＋'],
                     [',', '，'],
                     ['-', 'ー'],
                     ['.', '．'],
                     ['/', '／'],
                     [':', '：'],
                     [';', '；'],
                     ['<', '＜'],
                     ['=', '＝'],
                     ['>', '＞'],
                     ['?', '？'],
                     ['@', '＠'],
                     ['[', '［'],
                     ['\\', '￥'],
                     [']', '］'],
                     ['^', '＾'],
                     ['_', '＿'],
                     ['`', '｀'],
                     ['{', '｛'],
                     ['|', '｜'],
                     ['}', '｝'],
                     ['~', '〜'],
                     [' ', '　']
                    ];

var halfWidthToFullWidth = function(str) {
  var tempStr = str.replace(/[A-Za-z0-9]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
  for (var i = 0; i < REPLACE_ARRAY.length; i++) {
    tempStr = tempStr.split(REPLACE_ARRAY[i][0]).join(REPLACE_ARRAY[i][1]);
  }
  return tempStr;
};


var setButton = function($el, idName, text) {
  $el.append('<input type="button" id="' + idName + '" value="全角にしてコピー">');
  $('#' + idName).on('click', function() {
    chrome.runtime.sendMessage({
      text: halfWidthToFullWidth(text)
    });
  });
};

var initTitle = function() {
  var $el = $('#btAsinTitle');
  if ($el.size() == 1) {
    var t = $el.text();
    setButton($el, 'copyTitle', t);
  }
};

var initProductTitle = function() {
  var $el = $('#productTitle');
  if ($el.size() == 1) {
    var t = $el.text();
    setButton($el, 'copyProductTitle', t);
  }
};

var initB = function(content, idName) {
  var $el = $('b:contains("' + content + '")');
  if ($el.size() == 1) {
    var t = $el.parent().text().substr(content.length + 1);
    setButton($el.parent(), idName, t);
  }
};

var initTr = function(className, idName) {
  var $el = $('.' + className);
  if ($el.size() == 1) {
    var t = $el.find('.value').text();
    setButton($el.find('.value'), idName, t);
  }
};

initTitle();
initProductTitle();

initB('メーカー型番：', 'maker');
initB('ASIN:', 'asin');
initB('ISBN-10:', 'isbn10');
initB('ISBN-13:', 'isbn13');

initTr('item-model-number', 'itemModelNumber');
