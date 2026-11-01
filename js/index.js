const array = ["../res/slide1.jpg", "../res/slide2.jpg", "../res/slide3.jpg"];
$("#slide").html('<img src="' + array[0] + '" class="slider-image">');

let i = 0;

function prevImg() {
  if (i > 0 && i < array.length) {
    i--;
  } else {
    i = array.length - 1;
  }
  $("#slide").html('<img src="' + array[i] + '" class="slider-image">');
}

function nextImg() {
  if (i >= 0 && i < array.length - 1) {
    i++;
  } else {
    i = 0;
  }
  $("#slide").html('<img src="' + array[i] + '" class="slider-image">');
}
$("#slider-button-left").click(prevImg);
$("#slider-button-right").click(nextImg);

$(".offer-card").click(() => {
  window.location.href = "../oferta.html";
});

setInterval(nextImg, 1440);
