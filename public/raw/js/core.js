var taskModel = {
    summary: "",
    description: "",
    score: 0,
    focus: [],
    complete: false
}

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

