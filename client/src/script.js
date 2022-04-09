let time_change = 500;
let index_img = 0;
let counter = 0;
let timerID;

const circle = '<svg><circle cx="150" cy="150" r="100"/></svg>'
const square = '<svg><rect x="50" y="40" width="200" height="200"/></svg>'
const triangle = '<svg><polygon points="150 40, 70 220, 230 220"/></svg>'

const element = document.getElementById('test_img_hole')
const images = [1, 2, 3, 3, 2, 1, 2, 1, 2, 3, 3, 2, 1, 2]

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

btn_run.onclick = game = () => {
    timerID = setInterval(changeImages, time_change, index_img)
}

btn_1.onclick = function() {

}

btn_2.onclick = function() {
    
}

btn_3.onclick = function() {

}