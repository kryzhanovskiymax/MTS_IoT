/*
    PREPAREMENTS
*/

let time_change = 500     // life time of figure
let index_img = 0         // array iterator
let timerID               // timeout
let objRequest
let images = [1,2,1,2,2,3,1,2,3,2,1]

const circle = '<svg><circle cx="150" cy="150" r="100"/></svg>'
const square = '<svg><rect x="50" y="40" width="200" height="200"/></svg>'
const triangle = '<svg><polygon points="150 40, 70 220, 230 220"/></svg>'

const element = document.getElementById('test_img_hole')
const requestURL = 'http::localhost:3040/api'

/*
    FUNCTIONS
*/

async function sendRequest(method, url, body = null) {
  const headers = {'Content-Type': 'application/json'}
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  }).then(async (response) => {
    if (response.ok){
      return await response.json()
    }
    return response.json().then(error => {
      const e = new Error('Ошибка!')
      e.data = error
      throw e
    })
  })
}

function changeImages() {
  console.log('WIN')
  switch (images[index_img]) {
      case 1: {element.innerHTML = circle; break}
      case 2: {element.innerHTML = square; break}
      case 3: {element.innerHTML = triangle; break}
  }
  index_img += 1

  if (index_img === images.length - 1) {
      clearInterval(timerID)
  }
}

function CountDown() {
  let count_d = 3
  
  let timer_down = setInterval(() => {
      element.innerHTML = count_d
      count_d -= 1
      if (count_d === 0) {
          clearInterval(timer_down)
      }
  }, 1000)
}

const runTest = () => {
  timerID = setInterval(changeImages, time_change, index_img)
}

/*
    WORKING BODY:
    1. При нажатии кнопки "Gen Test" Отправить GET-запрос и получить массив со стороны сервера
    2. При нажатии кнопки "Run Test" Запустить 'игру'
    3. При каждом нажатии кнопки отправлять POST-запрос на сервер (эмуляции работы физической кнопки)
*/

// // всегда подавать день старта
// objRequest = sendRequest('GET', requestURL+'/test')
// objRequest.data(response => {return response.json()})

let body = {
  id: 1
}

sendRequest('GET', requestURL+'/test', body)
  .then(data => {images = data.test})

// sendRequest('POST', requestURL, body)
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

btn_run.onclick = runTest

btn_1.onclick = function() {
  sendRequest('POST', requestURL+'/test', {click_type: 1})
    .then(data => console.log(data))
}

btn_2.onclick = function() {
  sendRequest('POST', requestURL+'/test', {click_type: 2})
    .then(data => console.log(data))
}

btn_3.onclick = function() {
  sendRequest('POST', requestURL+'/test', {click_type: 3})
    .then(data => console.log(data))
}
