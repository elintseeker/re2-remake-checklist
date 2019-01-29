'use Stict';

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
  localStorage.setItem('re2RunData', JSON.stringify(runData));
  countTotal(sectionId);
};


var restoreData = function() {
  runData = JSON.parse(localStorage.getItem('re2RunData'));

  for (var k in runData) {
    for (var d in runData[k]) {
      var itemInput = document.querySelector('[data-id='+ d +'] input');
      itemInput.checked = true;
    }
  }
};


var modal = document.querySelector('.modal');
var confirmDelete = function(e) {
  modal.classList.add('is-active');
};


var closeModal = function(e) {
  modal.classList.remove('is-active');
};


var deleteAllData = function(e) {
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

  localStorage.clear();
  countTotal('reset');
  closeModal();
};


// check data
if (localStorage.getItem('re2RunData')) {
  console.log('Has data, restoring...');
  restoreData();
} else {
  var runData = {
    'leon-a': {},
    'claire-b': {},
    'claire-a': {},
    'leon-b': {}
  };
}


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
      console.log('boo');
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

var delDataEl = document.getElementById('resetAllData');
delDataEl.addEventListener('click', deleteAllData, false);

var confirmBtn = document.getElementById('confirm');
confirmBtn.addEventListener('click', confirmDelete, false);

var closeModalBtn = document.querySelector('.modal-close');
closeModalBtn.addEventListener('click', closeModal, false);

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
