var myFirebaseRef = new Firebase("https://reep.firebaseio.com/");

console.log(myFirebaseRef);

var taskModel = {
    summary: "",
    description: "",
    score: 0,
    focus: [],
    complete: false
}

//Task header toggle !!Review
$('.task__header').on('click', function(){
    $(this).parent().find('.task__body').toggle();
});


//Text Inputs
$('.task__input').on('keyup', function(){ //Summary-Title
  taskModel.summary = $(this).val();
})
$('.task__textarea').on('keyup', function(){ //Description
  taskModel.description = $(this).val();
})



//Focus Selection
$('.focus_option').on('click', function(){
  toggleSelected(this);
  
  //Modify model
  taskModel.focus = [];
  $('.focus_option[data-selected="true"]').each(function( ii, node ) {
    taskModel.focus.push( $(node).text() );
  });
});


//Score Selection
$('.score_option').on('click', function(){
  $('.score_option[data-selected="true"]').attr('data-selected', 'false');
  toggleSelected(this);
  taskModel.score = parseInt( $(this).text().trim() )
});


//Submit button
$('#task_submit').on('click', function(){
  if (validateModel(taskModel)){
    
  };
});



//HELPERS
var validateModel = function(model){ //Maybe put in notifications here?
  if (model.summary == "" || model.summary == undefined) return false;
  if (model.score == 0 || model.score == undefined) return false

  return true;
}

var toggleSelected = function(self){
  if ( $(self).attr('data-selected') == 'true' ) {
    $(self).attr('data-selected', 'false'); 
  } else {
    $(self).attr('data-selected', 'true'); 
  }
}
