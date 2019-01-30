'use Stict';
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

  if (standardList) {
    console.log('standard run list...');
    // check data
    if (hasStandardData) {
      restoreData();
    }

    return;
  }

  if (speedrunList) {
    console.log('speedrun list...');
    // check data
    if (hasSpeedrunData) {
      restoreData();
    }
    return;
  }
};


// initialize
init();

var toggleItem = function(e) {
  var parentEl = this.parentNode.parentNode;
  var sectionId = parentEl.parentNode.parentNode.getAttribute('id');
  var dataId = parentEl.getAttribute('data-id');

  if (this.checked) {
    console.log('tick', dataId);
    runData[sectionId][dataId] = true;
  } else {
    console.log('untick', dataId);
    // runData[dataId] = false;
    delete runData[sectionId][dataId];
  }

  // console.log(runData[sectionId].length);
  if (speedrunList) {
    localStorage.setItem('re2SpeedrunData', JSON.stringify(runData));
  } else {
    localStorage.setItem('re2StandardData', JSON.stringify(runData));
  }

  countTotal(sectionId);
};



var confirmDelete = function(e) {
  var modal = document.querySelector('.modal');
  modal.classList.add('is-active');
};


var closeModal = function(e) {
  var modal = document.querySelector('.modal');
  modal.classList.remove('is-active');
};


var deleteData = function(nuke) {
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
    console.log('deleting checklist...')
    if (hasSpeedrunData) {
      localStorage.removeItem('re2SpeedrunData');
    } else {
      localStorage.removeItem('re2StandardData');
    }
  }

  countTotal('reset');
  closeModal();
};


var displaySection = function(e) {
  var elTarget = this.getAttribute('data-target');
  var tgt = document.getElementById(elTarget);
  console.log(elTarget);
  tgt.classList.toggle('hide');
};


var countTotal = function(id) {
  // count total number of ticked inputs
  if (id === 'reset') {
    var els = document.getElementsByClassName('currtotal');
    console.log(els.length);

    for (var z = 0; z < els.length; z++) {
      els[z].innerHTML = '0';
    }
    return;
  }

  var currTotalEl = document.querySelector('[data-target="' + id + '"] .currtotal');
  currTotalEl.innerHTML = Object.keys(runData[id]).length;
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

var sections = document.querySelectorAll('section');
for (var x = 0; x < sections.length; x++ ) {
  var id = sections[x].getAttribute('id');
  var inputs = document.querySelectorAll('#' + id + ' input');
  var totalItems = document.querySelector('[data-target="'+ id +'"] .total');

  totalItems.innerHTML = inputs.length;
  countTotal(id);
}


// load modal html
var loadModal = function(url) {
  if (!window.XMLHttpRequest) { return; }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/modal.html', true);

  // Setup callback
  xhr.onload = function() {
    // console.log(xhr);
    if (xhr.status >= 200 && xhr.status < 400) {

      document.getElementById('resetbar').innerHTML = xhr.response;

      // event listeners to added modal;
      var delAllDataEl = document.getElementById('resetAllChecklist');
      delAllDataEl.addEventListener('click', function(){ deleteData('all'); }, false);

      var delChecklistEl = document.getElementById('resetChecklist');
      delChecklistEl.addEventListener('click', function(){ deleteData(); }, false);

      var confirmBtn = document.getElementById('confirm');
      confirmBtn.addEventListener('click', confirmDelete, false);

      var closeModalBtn = document.querySelector('.modal-close');
      closeModalBtn.addEventListener('click', closeModal, false);
    } else {
      console.log('Error fetching html');
    }
  };

  xhr.send();
};

document.addEventListener('DOMContentLoaded', loadModal, false);
