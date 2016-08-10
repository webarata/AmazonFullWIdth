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

var addConvertButton = function($el, buttonId, convertText) {
  var $button = document.createElement("button");
  $button.id = buttonId;
  $button.type = 'button';
  $button.innerText = '全角にしてコピー';
  $el.appendChild($button);

  $button.addEventListener('click', function() {
    chrome.runtime.sendMessage({
      text: halfWidthToFullWidth(convertText)
    });
  });
};

var addConvertButtonById = function(selector, buttonId) {
  var $el = document.querySelector(selector);
  if (!$el) return;

  addConvertButton($el, buttonId, $el.innerText);
};

var addConvertButtonByLabel = function(searchString, buttonId) {
  var $labelList = document.getElementsByClassName('label');
  if (!$labelList) return;
  Array.prototype.forEach.call($labelList, function($label) {
    if ($label.innerText == searchString) {
      addConvertButton($label.nextElementSibling, buttonId, $label.nextElementSibling.innerText);
      return;
    }
  });
};

var addConvertButtonByB = function(searchString, buttonId) {
  var $bList = document.getElementsByTagName('b');
  if (!$bList) return;
  Array.prototype.forEach.call($bList, function($b) {
    if ($b.innerText == searchString) {
      console.log($b.nextSibling);
      addConvertButton($b, buttonId, $b.parentElement.innerText.substr(8));
      return;
    }
  });
};

addConvertButtonById('#btAsinTitle', 'copyTitle');
addConvertButtonById('#productTitle', 'oopyTitle');

addConvertButtonByLabel('メーカー型番', 'maker');
addConvertButtonByLabel('ASIN', 'asin');
addConvertButtonByLabel('ISBN-10', 'isbn10');
addConvertButtonByLabel('ISBN-13', 'isbn13');

addConvertButtonByB('ASIN:', 'asin');
addConvertButtonByB('ISBN-10:', 'isbn10');
addConvertButtonByB('ISBN-13:', 'isbn13');
