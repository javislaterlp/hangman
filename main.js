var fails = 0;
var time = 100;

window.onload = function () {
  loadButtons();
  loadInput();
  loadControl();
  displayFails();
  displayTime();
};

var loadButtons = function () {
  var container = $("#alphabet");

  var list = $("<ul>");

  for (var code = 65; code <= 90; code++) {
    var letter = String.fromCharCode(code);
    var li = $("<li>");
    li.attr("id", letter);
    li.html(letter);
    li.on("click", play);
    list.append(li);
  }

  container.append(list);
};

var loadInput = function () {
  var words = ["PIZZA", "RAMEN", "BURGER", "BEEF", "PASTA"];
  var word = words[Math.floor(Math.random() * words.length)];
  word = word.split("");

  var container = $("#input");

  var list = $("<ul>");

  for (var letter of word) {
    var li = $("<li>");
    li.addClass(letter);
    list.append(li);
  }

  container.append(list);
};

var loadControl = function () {
  $("#reset").on("click", reset);
  $("#start").on("click", timer);
}

///////////////////////// Game Control ////////////////////

function play() {
  var letters = $("#input ul li");
  var fail = true;
  var button = this;

  letters.each(function () {
    if (button.id == $(this).attr("class")) {
      $(this).html(button.id);
      fail = false;
    }
  });

  if (fail) {
    displayFails(++fails);
    $(this).css("opacity", "0.3");
  } else {
    $(this).css("background-color", "#FFEB3B");
    $(this).css("color", "black");
  }

  $(this).off("click", play);
}

function timer() {
  var t = setInterval(function () {
    displayTime(--time);

    if (time <= 10) {
      $("#timer span").css("color", "#F44336");
    } 
    
    if (time < 1) {
      clearTimeout(t);
    }
  }, 1000);
}

function displayFails() {
  $("#fails").html("Fails: " + fails);
}

function displayTime() {
  $("#timer span").html(time + "s");
}

///////////////////////// Reset Game //////////////////////

function reset() {
  fails = 0;
  time = 100;
  $("#fails").html("Fails: " + fails);
  $("#timer span").html(time + "s");
  $("#timer span").css("color", "white");
  clearCanvas();
  clearButtons();
  clearInput();
  //clearTimeout(t);
}

function clearCanvas() {
  var canvas = $("#draw");
  var context = canvas[0].getContext("2d");
  context.clearRect(0, 0, canvas[0].width, canvas[0].height);
}

function clearButtons() {
  var buttons = $("#alphabet ul li");
  buttons.each(function() {
    $(this).on("click", play);
    $(this).css("background-color", "#009688");
    $(this).css("color", "white");
    $(this).css("opacity", "1");
  });
}

function clearInput() {
  var letters = $("#input ul li");
  letters.each(function() {
    $(this).html("");
  });
}

///////////////////////// Hangman Draw ////////////////////

function drawHangman() {
  var canvas = $("#draw");
  var context = canvas[0].getContext("2d");

  drawPost(context);
  drawHead(context);
  drawBody(context);
  drawLeftArm(context);
  drawRightArm(context);
  drawChest(context);
  drawLeftLeg(context);
  drawRightLeg(context)
  
}

function drawPost(c) {
  c.beginPath();
  c.lineWidth = "5";
  c.moveTo(20, 296);
  c.lineTo(20, 50);
  
  c.lineTo(200, 50);
  c.stroke();

  c.beginPath();
  c.lineWidth = "1";
  c.moveTo(150, 50);
  c.lineTo(150, 75);
  c.stroke();
}

function drawHead(c) {
  var img = new Image();
  img.onload = function () {
    c.drawImage(img, 124, 74, 52, 52);
  }
  img.src = "img/sadface.png";
}

function drawBody(c) {
  c.beginPath();
  c.moveTo(150, 125);
  c.lineTo(150, 135);
  c.stroke();
}

function drawLeftArm(c) {
  c.beginPath();
  c.moveTo(150, 135);
  c.lineTo(125, 165);
  c.stroke();
}

function drawRightArm(c) {
  c.beginPath();
  c.moveTo(150, 135);
  c.lineTo(175, 165);
  c.stroke();
}

function drawChest(c) {
  c.beginPath();
  c.moveTo(150, 135);
  c.lineTo(150, 190);
  c.stroke();

}

function drawLeftLeg(c) {
  c.beginPath();
  c.moveTo(150, 190);
  c.lineTo(135, 240);
  c.stroke();
}

function drawRightLeg(c) {
  c.beginPath();
  c.moveTo(150, 190);
  c.lineTo(165, 240);
  c.stroke();
}

/*function search() {
  var words = ["tontos", "anillos", "fatal", "avatar"];
  var query = words[Math.floor(Math.random() * words.length)];
  console.log(query);

  $.getJSON("http://www.omdbapi.com/?t=" + query + "&type=movie").then(function(response){
    console.log(response);
    console.log(response.Title);
  });
}*/