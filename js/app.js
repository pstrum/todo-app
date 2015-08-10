// When user clicks on +, "createTask" form appears and in focus
$('#addTaskButton').click( function() {
	$('#emptyWarning').hide('fast');
	$('#createTask').show('fast');
	$('#addTask').focus();
});

// Show 'clear completed tasks' function
function showClearCompleted() {
	if ($('#tasks li').length > 0) {
		$('#clearTasks').show();
	}
}

// Function to show empty list warning if list is empty
function showEmptyWarning() {
	if(!$("ul").has("li").length) {
		$('#emptyWarning').show();
		$('#emptyWarning').html("<p>No items.</p>");
		$('#clearTasks').hide();
		} else {
			$('#emptyWarning').hide();
		}
}

// Bind a keyup function to the addTask input
$('#addTask').on('keyup', function(event) {
	var $newTask = $('#addTask').val();
	if ($newTask !== '' && event.which == 13) {
		
		// Create task
		var buildNewTask = '<li class="eachTask">';
		buildNewTask += '<input type="checkbox" class="checkboxInput">';
		buildNewTask += '<label class="newTask">'+ $newTask + '</label>';
		buildNewTask += '<button class="delete"></button>';
		buildNewTask += '<input type="text" class="editTask" style="display:none"/>'
		buildNewTask += '</li>';

		// Append task
		$('#tasks').append(buildNewTask);

		// Clear the input field
		$('#addTask').val('');

		// Show 'Clear Completed Tasks'
		$(showClearCompleted);

		// Hide Empty List Warning
		$(showEmptyWarning);
	};
});

// Close the new task field
$('#closeTask').click( function() {
	$('#createTask').hide('fast');
	$('#addTask').val('');
});

// Check a task off the list
$('ul').on('change', 'input[type="checkbox"]', function() { 
    $(this).next('label').toggleClass('taskChecked', this.checked); 
});

// Delete a task
$('ul').on('click', '.delete', function() {
		$(this).parent().remove();
		$(showEmptyWarning);
	});

// Edit a task
$('ul').on('click', '.newTask', function() {
	// Hide label, show .editTask with the value of the label and focus
	$(this).hide().siblings('.editTask').show().val($(this).text()).focus();
	// Hide .editTask and show label with value
	$(".editTask").focusout( function(){
		$(this).hide().siblings('.newTask').show().text($(this).val());
	});
	$('ul').on('keyup', '.editTask', function(event) {
		if (event.which == 13) {
			$(this).hide().siblings('.newTask').show().text($(this).val());
		}
	});
});

// Clear completed
$('#clearTasksButton').on('click', function() {
	$('.taskChecked').parent().remove();
	$(showEmptyWarning);
});
