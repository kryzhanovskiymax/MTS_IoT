let time_change = 0.5;
let index_img = 0;

const element = document.getElementById('test_img_hole')

function changeImages(index_img) {
// images = [1, 2, 3, 2, 2, 1...]
    switch (index_img) {
        case 1: element.style.backgroundImage = "url('./imgs/triangle.png')"
        case 2: element.style.backgroundImage = "url('./imgs/square.png')"
        case 3: element.style.backgroundImage = "url('./imgs/circle.png')"
    }
}

btn_1.onclick = function() {
    console.log('WIN');
    document.body.style.backgroundColor = 'red'
    element.style.backgroundImage = "url('./imgs/square.png')"
}

btn_run.onclick = function() {

}