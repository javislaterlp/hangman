var fails = 0;

window.onload = function() {
  loadButtons();
  loadInput();
};

var loadButtons = function() {
  var container = document.getElementById("alphabet");
  
  var list = document.createElement('ul');

  for (var code = 65; code <= 90; code++) {
    var letter = String.fromCharCode(code);
    var li = document.createElement('li');
    li.id = letter;
    li.innerHTML = letter;
    li.addEventListener("click", play);
    list.appendChild(li);
  }

  container.appendChild(list);
};

var loadInput = function() {
  var words = ["PIZZA", "RAMEN", "BURGER", "BEEF", "PASTA"];
  var word = words[Math.floor(Math.random()*words.length)];
  word = word.split("");

  var container = document.getElementById('input');

  var list = document.createElement('ul');

  for (var letter of word) {
    var li = document.createElement('li');
    li.className = letter;
    li.innerHTML = "";
    list.appendChild(li);
  }

  container.appendChild(list);
};

function play() {
  var letters = document.querySelectorAll('#input ul li');
  var fail = true;
  
  for (var i in letters) {
    if (this.id == letters[i].className) {
      letters[i].innerHTML = this.id;
      fail = false;
    }
  }

  if (fail) {
    console.log(++fails);
  }

  this.removeEventListener("click", play);
  this.style.opacity = 0.5;
}