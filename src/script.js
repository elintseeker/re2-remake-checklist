(function(){

'use Strict';

var standardList = document.getElementById('standard');
var speedrunList = document.getElementById('speedrun');
var hasStandardData = localStorage.getItem('re2StandardData');
var hasSpeedrunData = localStorage.getItem('re2SpeedrunData');
var runData = {};


var restoreData = function() {
  if (speedrunList) {
    console.log('Has speedrun data, restoring...');
    runData = JSON.parse(hasSpeedrunData);
  } else {
    console.log('Has data, restoring...');
    runData = JSON.parse(hasStandardData);
  }

  for (var k in runData) {
    for (var d in runData[k]) {
      var itemInput = document.querySelector('[data-id='+ d +'] input');
      itemInput.checked = true;
    }
  }
};


var init = function(list) {
  runData = {
    'leon-a': {},
    'claire-b': {},
    'claire-a': {},
    'leon-b': {}
  };

  if (speedrunList) {
    console.log('speedrun list...');
    // check data
    if (hasSpeedrunData) {
      restoreData();
    }
  } else {
    console.log('standard run list...');
    // check data
    if (hasStandardData) {
      restoreData();
    }
  }

  total.items();
};




var toggleItem = function(e) {
  var parentEl = this.parentNode.parentNode;
  var sectionId = parentEl.parentNode.parentNode.getAttribute('id');
  var dataId = parentEl.getAttribute('data-id');

  if (this.checked) {
    console.log('Added', dataId);
    runData[sectionId][dataId] = true;
  } else {
    console.log('Removed', dataId);
    delete runData[sectionId][dataId];
  }

  // save to localStorage
  if (speedrunList) {
    localStorage.setItem('re2SpeedrunData', JSON.stringify(runData));
  } else {
    localStorage.setItem('re2StandardData', JSON.stringify(runData));
  }

  total.itemsChecked(sectionId);
};


var modal = {
  confirmDelete: function(e) {
    var modal = document.querySelector('.modal');
    modal.classList.add('is-active');
  },
  close: function(e) {
    var modal = document.querySelector('.modal');
    modal.classList.remove('is-active');
  },
  load: function() {
    fetch('/modal.html')
      .then(function(res){
        // console.log(res);
        return res.text(); // return text value;
      })
      .then(function(html){
        document.getElementById('resetbar').innerHTML = html;
        modal.events();
      })
      .catch(function(error){
        console.log('error fetch!');
      });
  },
  deleteData: function(nuke) {
    console.log('Deleting all data...');
    var chkboxes = document.querySelectorAll('.checkbox input')
    for ( var d = 0; d < chkboxes.length; d++ ) {
      chkboxes[d].checked = false;
    }

    runData = {
      'leon-a': {},
      'claire-b': {},
      'claire-a': {},
      'leon-b': {}
    };

    if (nuke === 'all') {
      console.log('Removing all checklist data...');
      localStorage.clear();
    } else {
      console.log('Deleting checklist...');
      if (speedrunList) {
        localStorage.removeItem('re2SpeedrunData');
      } else {
        localStorage.removeItem('re2StandardData');
      }
    }

    total.items();
    modal.close();
  },
  events: function() {
    // event listeners to added modal;
    var delAllDataEl = document.getElementById('resetAllChecklist');
    delAllDataEl.addEventListener('click', function(){ modal.deleteData('all'); }, false);

    var delChecklistEl = document.getElementById('resetChecklist');
    delChecklistEl.addEventListener('click', function(){ modal.deleteData(); }, false);

    var confirmBtn = document.getElementById('confirm');
    confirmBtn.addEventListener('click', modal.confirmDelete, false);

    var closeModalBtn = document.querySelector('.modal-close');
    closeModalBtn.addEventListener('click', modal.close, false);
  },
};


var total = {
  items: function(){
    var sections = document.querySelectorAll('section');
    for (var i = 0; i < sections.length; i++) {
      var thisId = sections[i].getAttribute('id');
      var numItems = document.querySelectorAll('#' + thisId + ' input[type="checkbox"]').length;
      var numItemsChecked = document.querySelectorAll('#' + thisId + ' input[type="checkbox"]:checked').length;

      document.querySelector('[data-target="' + thisId + '"] .total').innerHTML = numItems;
      total.itemsChecked(thisId);
    }
  },
  itemsChecked: function(id) {
    var items = document.querySelectorAll('#' + id + ' input[type="checkbox"]:checked');
    var currTotal = document.querySelector('[data-target="' + id + '"] .currtotal');
    currTotal.innerHTML = items.length;
  }
};


var displaySection = function(e) {
  var elTarget = this.getAttribute('data-target');
  var tgt = document.getElementById(elTarget);
  tgt.classList.toggle('hide');
};



// event listeners
var chkBoxEl = document.querySelectorAll('.checkbox input');
for ( var i = 0; i < chkBoxEl.length; i++ ) {
  chkBoxEl[i].addEventListener('click', toggleItem, false);
}

var boxToggle = document.querySelectorAll('.box-toggle');
for ( var i = 0; i < boxToggle.length; i++ ) {
  boxToggle[i].addEventListener('click', displaySection, false);
}

document.addEventListener('DOMContentLoaded', modal.load, false);

// initialize
init();

})();