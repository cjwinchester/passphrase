var button = document.getElementsByTagName('button')[0];
var loading = document.getElementById('loading');
var content = document.getElementById('content');
var results = document.getElementById('results');

function dice_roll() {
  return Math.floor(Math.random() * 6) + 1;
}

function new_roll() {
  var roll = '';

  for (var i=0; i<5; i++) {
    var num = dice_roll();
    roll += num.toString();
  }

  return parseInt(roll);
}

var xhr = new XMLHttpRequest();

xhr.open('GET', './phrases.json', true);

xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      loading.style.display = 'none';
      content.style.display = 'block';
      
      button.addEventListener('click', function() {
        var words = [];
        for (var i=0; i<5; i++) {
          var num = new_roll();
          var word = data[num];
          words.push(word);
        }
        results.innerHTML = words.join(' ');
        window.getSelection().selectAllChildren(results);
        document.execCommand('copy');
      });

    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

xhr.send(null);
