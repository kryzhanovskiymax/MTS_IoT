/*
    PREPAREMENTS
*/

let time_change = 800     // life time of figure
let index_img = 0         // array iterator
let timerID               // timeout
let objRequest
let images;
let correctAnswers = 0;
let flag = false;
let user_id = 1;
/*



*/

const circle = '<svg><circle stroke="black" stroke-width="5px" fill="rgb(100, 240, 20)" cx="150" cy="150" r="100"/></svg>'
const square = '<svg><rect x="50" y="40" width="200" height="200"/></svg>'
const triangle = '<svg><polygon points="150 40, 70 220, 230 220"/></svg>'

const palette = ["blue", "red", "brown", 
            "blueviolet", "bisque", "dodgerblue", 
            "indigo", "firebrick", "gold", "darkmagenta", "yellowgreen"]

const createCircle = (color) => {
  return `<svg><circle fill="${color}" stroke="black" stroke-width="5px" cx="150" cy="150" r="100"/></svg>`
}
            
const createSquare = (color) => {
  return `<svg><rect fill="${color}" stroke="black" stroke-width="5px" x="50" y="40" width="200" height="200"/></svg>`
}
            
const createTriangle = (color) => {
  return `<svg><polygon fill="${color}" points="150 40, 55 210, 245 210"/></svg>`
}

/*const formElement = document.getElementById("form-user-id");
formElement.onchange = function(id) {
  user_id = id;
}*/

const element = document.getElementById('test_img_hole')
const requestURL = '/api'

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

function printMessage() {
  if (correctAnswers <= Math.floor(images.length*0.7)) {
    return "You're Tired! Get some rest."
  } else {
    return "Congartulations! Test Passed."
  }
}

function changeImages() {
  let randomColor = palette[Math.floor(Math.random()*palette.length)]

  switch (images[index_img]) {
    case 1: {element.innerHTML = createCircle(randomColor); break}
    case 2: {element.innerHTML = createSquare(randomColor); break}
    case 3: {element.innerHTML = createTriangle(randomColor); break}
  }
  index_img += 1
  flag = false
  if (index_img === images.length - 1) {
      clearInterval(timerID);
      element.innerHTML = `<h3>Test is finished</h3><h2> Correct answers: ${correctAnswers}/${images.length}</h2><h3>${printMessage()}</h3>`
      sendRequest('PUT', requestURL + '/test', {id: user_id});
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
  sendRequest('POST' ,requestURL + '/test', {id: user_id} )
    .then((data) => {
      timerID = setInterval(changeImages, time_change, index_img);
    })
    .catch(e => {
      console.log(e);
    })
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


// sendRequest('POST', requestURL, body)
//   .then(data => console.log(data))
//   .catch(err => console.log(err))
/*btn_gen.onclick = function() {
  sendRequest('GET', requestURL+'/test', {id: 1});
}*/

btn_gen.onclick = function() {
    fetch(requestURL + '/test/generator', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: user_id })
      })
            .then(async data => {
              const data_json = await data.json();
              images = data_json.test;
            })
            .catch(e => console.log(e));
}

btn_run.onclick = runTest

btn_1.onclick = function() {
  if (images[index_img] === 1 && not (flag)) {correctAnswers+=1; flag = true}
  sendRequest('POST', requestURL+'/test/res', {click_type: 1})
    .then(data => console.log(data))
}

btn_2.onclick = function() {
  if (images[index_img] === 2 && not (flag)) {correctAnswers+=1; flag = true}
  sendRequest('POST', requestURL+'/test/res', {click_type: 2})
    .then(data => console.log(data))
}

btn_3.onclick = function() {
  if (images[index_img] === 3 && not (flag)) {correctAnswers+=1; flag = true}
  sendRequest('POST', requestURL+'/test/res', {click_type: 3})
    .then(data => console.log(data))
}
