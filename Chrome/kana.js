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
  $button.className = 'zenkakuButton';
  $button.type = 'button';
  $button.innerText = ' ';
  // $button.style.fontSize = '0.5em';
  // $button.style.borderRadius = '5px';

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

const $head = document.getElementsByTagName('head')[0];
console.log($head);
const $style = document.createElement('style');
$style.innerText = `
.zenkakuButton {
  background-color: #2cc55e;
  border: 2px solid #2cc55e;
  border-radius: 0.8em;
  color: #fff;
  font-size: 0.7em;
  margin: 0 0 0 0.5em;
  outline: none;
  width: 10em;
}

.zenkakuButton:before {
  content: "全角にする"
}

.zenkakuButton:hover {
  background-color: #24b662;
  transition: background-color 0.3s linear;
}

.zenkakuButton:hover:before {
  content: "コピー"
}

.zenkakuButton:active {
  background-color: #24b662;
  color: #07853c;
  border: 2px solid #17954c ;
  transition: color 0.3s linear;
  transition: background-color 0.3s linear;
}

.zenkakuButton:active:before {
  content: "コピーしました";
}
`;

console.log($style);

$head.appendChild($style);
