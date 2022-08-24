// const
const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

// window speech init
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// 開始recognition 和 start
recognition.start();

// 捕捉使用者個話語
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// 寫出使用者講的內容
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>您說: </div>
    <span class="box">${msg}</span>
  `;
}

// 檢查msg跟數字的比較
function checkNumber(msg) {
  const num = +msg;

  // 檢查是否為數字
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>這並不是有效的數字</div>';
    return;
  }

  // 檢查範圍
  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>數字必須介於1到100之間</div>';
    return;
  }

  // 檢查數字
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>恭喜，您猜中了正確的數字 <br><br>
      是 ${num}</h2>
      <button class="play-again" id="play-again">再玩一次</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>請往下猜/div>';
  } else {
    msgEl.innerHTML += '<div>請往上猜</div>';
  }
}

// 產出亂數
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//念出結果
recognition.addEventListener('result', onSpeak);

// 結過speak recongniton
recognition.addEventListener('end', () => recognition.start());


// 重玩一次
document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
