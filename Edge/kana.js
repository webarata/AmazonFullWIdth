'use strict';

const REPLACE_ARRAY = [
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

const halfWidthToFullWidth = str => {
  let tempStr = str.replace(/[A-Za-z0-9]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
  for (let i = 0; i < REPLACE_ARRAY.length; i++) {
    tempStr = tempStr.split(REPLACE_ARRAY[i][0]).join(REPLACE_ARRAY[i][1]);
  }
  return tempStr;
};

const addConvertButton = ($el, buttonId, convertText) => {
  const $button = document.createElement('button');
  $button.id = buttonId;
  $button.type = 'button';
  $button.innerText = '全角にしてコピー';
  $button.style.fontSize = '0.5em';
  $button.style.borderRadius = '5px';
  $el.appendChild($button);

  $button.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    textArea.style.cssText = 'position: absolute; left: -100%';

    document.body.appendChild(textArea);

    textArea.value = halfWidthToFullWidth(convertText.trim());
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);
  });
};

const addConvertButtonById = (selector, buttonId) => {
  const $el = document.querySelector(selector);
  if (!$el) return;

  addConvertButton($el, buttonId, $el.innerText);
};

const addConvertButtonByLabel = (searchString, buttonId) => {
  const $labelList = document.getElementsByClassName('label');
  if (!$labelList) return;
  Array.prototype.some.call($labelList, ($label) => {
    if ($label.innerText == searchString) {
      addConvertButton($label.nextElementSibling, buttonId, $label.nextElementSibling.innerText);
      return true;
    }
  });
};

const addConvertButtonByB = (searchString, buttonId) => {
  const $bList = document.getElementsByTagName('b');
  if (!$bList) return;
  Array.prototype.some.call($bList, function($b) {
    if ($b.innerText == searchString) {
      addConvertButton($b, buttonId, $b.parentElement.innerText.substr(8));
      return true;
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
