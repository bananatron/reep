
var Task = {
    title: "",
    details: "",
    score: 0,
    focus: []
}

var Filters = [
   { attr: 'complete', value: false }
]


var submitTaskForm = function(){
  ref.child("tasks").child(uid).push({
    title: cleanString(Task.title),
    details: cleanString(Task.details),
    score: Task.score,
    focus: Task.focus,
    complete: false,
    added_at: Firebase.ServerValue.TIMESTAMP,
    public: false
  });
  
  clearTaskForm(); //Empties form
  hideNewTaskForm(); //Rolls it up
}

var clearTaskForm = function(){
  $('.task-form-field').val('');
  $('.focus_option, .score_option').attr('data-selected', 'false')
  
  Task = { 
    title: "",
    details: "",
    score: 0,
    focus: [],
    complete: false
  }
}

var setFilters = function(element){
  var dataFilter = $(element).data().taskFilter;
  var newFilter = {};
  newFilter['attr'] = Object.keys(dataFilter)[0];
  newFilter['value'] = dataFilter[Object.keys(dataFilter)[0]]
  
  Filters = [newFilter];
  refreshTasks(uid);
}

$('.task-filters__option').on('click', function(){
  setFilters(this);
})

var validateModel = function(model, callback) {
  var validationErrors = [];
  
  if (model.title.length < 1){
    validationErrors.push('You need a title for your task');
  };
  if (model.title.length > 40){
    validationErrors.push('Your title is bit too long');
  };
  if (model.focus < 1){
    validationErrors.push('You need to choose a focus');
  };
  if (model.score == 0){
    validationErrors.push('You need to choose a score');
  };
  
  if (validationErrors.length > 0) {
    validationErrors.forEach(function(errorMsg){
      new Notification(errorMsg, 'alert');
    });
    window.scrollTo(0, 0);
  } else {
    callback();
  }
}


//Build focus options from user data
var buildFocusOptions = function(){
  ref.child('users').child(uid).child('focus').once('value', function(snapshot) {
    $.each(snapshot.val(), function(key, value){
      var $focusOption = $("<div class='focus_option' data-focus-id='"+ key +"' data-focus-color='"+ value.color +"' data-selected='false'><span class='ion-" + value.icon + " task__icon'></span>"+ value.name +"</div>")
      $('.task__focusselect').append($focusOption);
    })
  });
}
//only do this on correct page?
buildFocusOptions();


var clearTasks = function(){
  $('.tasks_container').empty();
}

var buildTask = function(id, title, details, score, focus, focusObj, complete) {
  
  var task = this.view = document.createElement("div");
  task.setAttribute('class', 'task');
  task.setAttribute('data-id', id);
  task.setAttribute('data-score', score);
  
    var task_header = task.appendChild(document.createElement("div"));
    task_header.setAttribute('class', 'task__header');
    
    var header_focus_container = task_header.appendChild(document.createElement("div"));
    header_focus_container.setAttribute('class', 'header_focus_container')
    
      focus.forEach( function(ff, ii) {
        var header_focus = header_focus_container.appendChild(document.createElement("div"));
        header_focus.setAttribute('class', 'header_focus');
        header_focus.innerHTML = "<span class='ion-"+ focusObj[ff].icon +"'></span>";
        task_header.appendChild(header_focus_container);
      });
      
      var header_title = task_header.appendChild(document.createElement("div"));
      header_title.setAttribute('class', 'header_title');
      header_title.innerHTML = title;
      var header_score = task_header.appendChild(document.createElement("div"));
      if (complete){
        header_score.setAttribute('class', 'header_score score-complete');
      } else {
        header_score.setAttribute('class', 'header_score score-incomplete');
      }
      
      header_score.innerHTML = "<span class='ion-flash'></span> " + score + "</div>";
      
    var task_body = task.appendChild(document.createElement("div"));
    task_body.setAttribute('class', 'task__body bg-darkblue');

      if (details){
        var task__body_details = task_body.appendChild(document.createElement("div"));
        task__body_details.setAttribute('class', 'task__body_details');
        task__body_details.innerHTML = details;
      }
      
      var task__body_focus_container = task_body.appendChild(document.createElement("div"));
      task__body_focus_container.setAttribute('class', 'task__body_focus_container');
      focus.forEach(function(ff, ii){
        var task__body_focus = task__body_focus_container.appendChild(document.createElement("div"));
        task__body_focus.setAttribute('class', 'task__body_focus');
        task__body_focus.innerHTML = focusObj[ff].name;
        task__body_focus.style.color = focusObj[ff].color;
      });
      
      var task__body_actions = task_body.appendChild(document.createElement("div"));
      task__body_actions.setAttribute('class', 'task__body_actions');
        var task_action = task__body_actions.appendChild(document.createElement("div"));
        task_action.setAttribute('class', 'task__action bg-green-hover');
        task_action.setAttribute('data-action', 'completeTask');
        task_action.innerHTML = "<span class='ion-checkmark'></span>";
        var task_action = task__body_actions.appendChild(document.createElement("div"));
        task_action.setAttribute('class', 'task__action bg-red-hover');
        task_action.setAttribute('data-action', 'deleteTask');
        task_action.innerHTML = "<span class='ion-trash-a'></span>";
        
  return task;
}

var getIdFromElement = function(element){
  return $(element).closest('.task').attr('data-id');
}

var deleteTask = function(node){
  var rid = getIdFromElement(node);
  $(node).closest('.task').hide();
  ref.child("tasks").child(uid).child(rid).set(null);
}

var completeTask = function(node){
  var taskScore = $(node).closest('.task').data().score;
  var currentUserScore;
  ref.child('users').child(uid).child('score').once('value', function(snapshot) {
    currentUserScore = snapshot.val();
  });
  var newScore = currentUserScore + taskScore;
  ref.child('users').child(uid).update({ score: newScore });

  var rid = getIdFromElement(node);
  ref.child("tasks").child(uid).child(rid).update({complete: true});
}

var refreshTasks = function(uid){
  //On change, reflow
  ref.child('tasks').child(uid).on('value', function(tasksSnap) {
    if (!$.isEmptyObject(tasksSnap.val())){
      $('.no-tasks-message').hide();
      var task_collection = $('<div></div>');
      clearTasks();
      
      ref.child('users').child(uid).child('focus').on('value', function(focusSnap) {
        
        var focusObj = focusSnap.val(); //User focus' for generation/comparison

        $.each( tasksSnap.val(), function( key, vv ) {
          Filters.forEach(function(filter){
            if (vv[filter['attr']] == filter['value']){
              task_collection.append(buildTask(key, vv.title, vv.details, vv.score, vv.focus, focusObj, vv.complete));
            }
          });
        }); 
        
        $('.tasks_container').append($(task_collection).children().get().reverse());
        $('.tasks_container').addClass('unhidden');
        
      });
      
    } else { //Case where you're deleting the last one
      clearTasks();
      $('.no-tasks-message').show();
    }
  });
}



//Listeners
if (ref.getAuth()){
  var uid = ref.getAuth().uid;
  refreshTasks(uid);
} else {
  console.log("No user logged in.") 
}

//Show/hide new form
var hideNewTaskForm = function(){
  $( "#task-new" ).slideUp( "fast", function() {
    $( "#task-new" ).hide();
  });
}

$('.right').on('click', '.task-new__close', function(){
  hideNewTaskForm();
});

var showNewTaskForm = function(){
  $( "#task-new" ).slideDown( "fast", function(){
    $( "#task-new" ).show();
  })
}
$('.right').on('click', '.add-task', function(){
  showNewTaskForm();
});


//Task header toggle
$('.tasks_container').on('click', '.task__header', function() {
  $(this).parent().find('.task__body').slideToggle(100);
});

//Task Action Buttons
$('.tasks_container').on('click', '.task__action', function() {
  window[$(this).attr('data-action').toString()](this);
});

//Text Inputs
$('.task__input').on('keyup', function(){ //Title
  Task.title = $(this).val();
})
$('.task__textarea').on('keyup', function(){ //Details
  Task.details = $(this).val();
})

//Focus Selection
$('.right').on('click', '.focus_option', function(){
  toggleSelected(this);
  
  //Modify model
  Task.focus = [];
  $('.focus_option[data-selected="true"]').each(function( ii, node ) {
    Task.focus.push( $(node).data().focusId );
  });
});

//Score Selection
$('.right').on('click', '.score_option', function(){
  $('.score_option[data-selected="true"]').attr('data-selected', 'false');
  toggleSelected(this);
  Task.score = parseInt( $(this).text().trim() )
});

//Submit button
$('.right').on('click', '#task_submit', function(){
  validateModel(Task, submitTaskForm);
});
