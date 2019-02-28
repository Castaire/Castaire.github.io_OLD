
$(document).ready(function(){

	// set up isotope grid
	$grid = setupGrid();
	$grid.isotope({ 
		sortBy : 'date' ,
		sortAscending: false
	});

	// set up default sorting / filtering
	$projectInput = $("#board #filterbar .customCheckBox #showProjects");
	$projectLabel = $projectInput.next(); 
	$projectInput.prop('checked', true);
	$projectLabel.css('background-color', $projectLabel.css('border-color'));


	// add handlers to sorting / filtering options
	$("#board #filterbar .customCheckBox > label").click(
		{grid: $grid}, handleCheckBoxClick
	);

});


function setupGrid(){
	var $grid = $('#grid').isotope({
		itemSelector: '.note-item',
		layoutMode: 'fitRows',
		getSortData: {
			//name: '.text > h3',
			name: function(item) {
				var nameVal = $(item).find(".text > h3").text();
				return(nameVal.toLowerCase());
			},
			date: '[date]',
			type: function(item) { // 'type' is always the SECOND class for a note object
				var typeVal = $(item).attr('class').split(' ')[1];
				return(typeVal);
			}
		}
	});

	return($grid);
}


/**
 *	
 *	@param {EventObject} event 		- event object corresponding to the 'click'
 *  @param {Object} 		 	- isotope object correponding to the grid
 */	
function handleCheckBoxClick(event){
	console.log(event);

	var $target = $(event.target); 	// the custm checkbox that was selected
	var $targetInput = $($target.prev()); 	// get associated 'input'

	console.log($targetInput);
	console.log($targetInput.is(':checked'));

	var $g = $(event.data.grid);

	var type = $target.attr('for');

	switch(type) {
		case "showProjects":
			console.log(`clicked: ${type}`);


			if($targetInput.is(':checked')){
				$g.isotope({ filter: ':not(.project)'});
				$target.css("background-color", "default");

			}else{
				$g.isotope({ filter: '.project'});
				alert("not checked previously");
				$target.css("background-color", "red");
			}

			break;

		case "showWork":
			console.log(`clicked: ${type}`);
			$g.isotope({ filter: '.work'});
			break;

		default:
			console.log("couldn't handle selected element");
	}

}



