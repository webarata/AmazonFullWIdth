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

function halfWidthToFullWidth(str) {
  let tempStr = str.replace(/[A-Za-z0-9]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });
  for (let i = 0; i < REPLACE_ARRAY.length; i++) {
    tempStr = tempStr.split(REPLACE_ARRAY[i][0]).join(REPLACE_ARRAY[i][1]);
  }
  return tempStr;
}

/**
 * テキストエリアを作り、その内容をクリップボードにコピーする。
 * テキストエリアは関数の中で作成し、除去される。
 * @param convertText コピーする文字列
 * @returns {Function} コピーのためのテキストエリアを作る関数を返す
 */
function execCopy(convertText) {
  return function() {
    const textArea = document.createElement('textarea');
    textArea.style.cssText = 'position: absolute; left: -100%';

    document.body.appendChild(textArea);

    textArea.value = halfWidthToFullWidth(convertText.trim());
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);
  };
}

function addConvertButton($el, getTextFunc) {
  if (!$el) return;

  const text = getTextFunc($el);

  const $button = document.createElement('button');
  $button.type = 'button';
  $button.innerText = '全角にしてコピー';
  $button.style.fontSize = '0.5em';
  $button.style.borderRadius = '5px';

  $el.appendChild($button);

  $button.addEventListener('click', execCopy(text));
}

function searchElById(selector) {
  return document.querySelector(selector);
}

function searchElByLabel(searchString) {
  const $labelList = document.getElementsByClassName('label');
  if (!$labelList) return;
  let $result = null;
  Array.prototype.some.call($labelList, ($label) => {
    if ($label.innerText == searchString) {
      $result = $label.nextElementSibling;
      return true;
    }
  });

  return $result;
}

function searchElByB(searchString) {
  const $bList = document.getElementsByTagName('b');
  if (!$bList) return;
  let $result = null;
  Array.prototype.some.call($bList, function($b) {
    if ($b.innerText == searchString) {
      $result = $b;
      return true;
    }
  });
  return $result;
}

function getText($el) {
    return $el.innerText;
}

function getTextByB($el) {
    return $el.parentElement.innerText.substr(8);
}

addConvertButton(searchElById('#btAsinTitle'), getText);
addConvertButton(searchElById('#productTitle'), getText);

addConvertButton(searchElByLabel('メーカー型番'), getText);
addConvertButton(searchElByLabel('ASIN'), getText);
addConvertButton(searchElByLabel('ISBN-10'), getText);
addConvertButton(searchElByLabel('ISBN-13'), getText);

addConvertButton(searchElByB('ASIN:'), getTextByB);
addConvertButton(searchElByB('ISBN-10:'), getTextByB);
addConvertButton(searchElByB('ISBN-13:'), getTextByB);
