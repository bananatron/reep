

var Task = {
    title: "",
    details: "",
    score: 0,
    focus: []
}

var submitTaskForm = function(){
  ref.child("tasks").child(uid).push({
    title: Task.title,
    details: Task.details,
    score: Task.score,
    focus: Task.focus,
    complete: false,
    public: false
  });
  
  clearTaskForm();
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

//!! WRITE validation
var validateModel = function() {
  return true;
}


var buildTask = function(id, title, details, score, focus, complete) {
  
  console.log('building task', id, title, details, score, focus, complete);
  var task = this.view = document.createElement("div");
  task.setAttribute('class', 'task');
  task.setAttribute('id', 'id');
  
    var task_header = task.appendChild(document.createElement("div"));
    task_header.setAttribute('class', 'task__header');
      var header_focus = task_header.appendChild(document.createElement("div"));
      header_focus.setAttribute('class', 'header_focus');
      header_focus.innerHTML = "<span class='ion-coffee'></span>";
      var header_title = task_header.appendChild(document.createElement("div"));
      header_title.setAttribute('class', 'header_title');
      header_title.innerHTML = title;
      var header_score = task_header.appendChild(document.createElement("div"));
      header_score.setAttribute('class', 'header_score');
      header_score.innerHTML = "<span class='ion-flash'></span>" + score + "</div>";
      
    var task_body = task.appendChild(document.createElement("div"));
    task_body.setAttribute('class', 'task__body bg-darkblue');
      var task__body_details = task_body.appendChild(document.createElement("div"));
      task__body_details.setAttribute('class', 'task__body_details');
      task__body_details.innerHTML = details;
      
      var task__body_actions = task_body.appendChild(document.createElement("div"));
      task__body_actions.setAttribute('class', 'task__body_actions');
        var task_action = task__body_actions.appendChild(document.createElement("div"));
        task_action.setAttribute('class', 'task__action bg-grey-hover');
        task_action.innerHTML = "<span class='ion-edit'></span>";
        var task_action = task__body_actions.appendChild(document.createElement("div"));
        task_action.setAttribute('class', 'task__action bg-green-hover');
        task_action.innerHTML = "<span class='ion-checkmark'></span>";
        var task_action = task__body_actions.appendChild(document.createElement("div"));
        task_action.setAttribute('class', 'task__action bg-red-hover');
        task_action.innerHTML = "<span class='ion-close'></span>";
        
  $(task).appendTo('.tasks_container');
}



//Listeners
if (ref.getAuth()){
    
  var uid = ref.getAuth().uid;
  
  //On change, reflow
  ref.child("tasks").child(uid).on("value", function(snapshot) {
    if (!$.isEmptyObject(snapshot.val())){
      $.each( snapshot.val(), function( key, value ) {
        buildTask(key, value.title, value.details, value.score, value.focus, value.complete);
      }); 
    }
  });

} else { console.log("No user logged in.") }


//Show/hide new form
$('.task-new__close').on('click', function(){
  $( "#task-new" ).slideUp( "fast", function() {
    $( "#task-new" ).hide();
  });
});

$('#add-task').on('click', function(){
  $( "#task-new" ).slideDown( "fast", function(){
    $( "#task-new" ).show();
  })
});


//Task header toggle !!Review

$('.tasks_container').on('click', '.task__header', function() {
  $(this).parent().find('.task__body').slideToggle(100);
});



//Text Inputs
$('.task__input').on('keyup', function(){ //Title
  Task.title = $(this).val();
})
$('.task__textarea').on('keyup', function(){ //Details
  Task.details = $(this).val();
})



//Focus Selection
$('.focus_option').on('click', function(){
  toggleSelected(this);
  
  //Modify model
  Task.focus = [];
  $('.focus_option[data-selected="true"]').each(function( ii, node ) {
    Task.focus.push( $(node).text() );
  });
});


//Score Selection
$('.score_option').on('click', function(){
  $('.score_option[data-selected="true"]').attr('data-selected', 'false');
  toggleSelected(this);
  Task.score = parseInt( $(this).text().trim() )
});


//Submit button
$('#task_submit').on('click', function(){
  if (validateModel(Task)){
    submitTaskForm();
  };
});
