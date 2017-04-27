var fails = 0;
var time = 12;

window.onload = function () {
  loadButtons();
  loadInput();
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

function displayFails() {
  $("#fails").html("Fails: " + fails);
}

function displayTime() {
  $("#timer span").html(time + "s");
  
  $("#start").on("click", timer);
}

function timer() {
  var t = setInterval(function () {
    time--;
    $("#timer span").html(time + "s");

    if (time <= 10) {
      $("#timer span").css("color", "#F44336");
    } 
    
    if (time < 1) {
      clearTimeout(t);
      console.log("perdiste");
    }
  }, 1000);
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