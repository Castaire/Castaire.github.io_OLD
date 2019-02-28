
$(document).ready(function(){

	// set up isotope grid
	$grid = setupGrid();
	$grid.isotope({ 
		sortBy : 'date' ,
		sortAscending: false
	});

	// show ONLY 'project' items, by default
	$projectInput = $("#board #filterbar .customCheckBox #showProjects");
	$projectLabel = $projectInput.next(); 
	$projectInput.prop('checked', true);
	$projectLabel.css('background-color', $projectLabel.css('border-color'));

	$grid.isotope({filter: ".project"});
	

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
			name: function(item) {
				var nameVal = $(item).find(".text > h3").text();
				return(nameVal.toLowerCase());
			},
			date: '[date]',
			type: function(item) { 		// 'type' is always the SECOND class for a note object
				var typeVal = $(item).attr('class').split(' ')[1];
				return(typeVal);
			}
		}
	});

	return($grid);
}



function handleCheckBoxClick(event){
	var $g = $(event.data.grid); 				// isotope grid
	var $checkboxLabel = $(event.target);		// get label for the selected checkbox
	var $input = $($checkboxLabel.prev()); 		// get associated 'input'

	var type = $checkboxLabel.attr('class');

	var filterString = '';
	var colorString = '';

	if($input.is(':checked')){
		filterString = {val: `:not(.${type})`};
		colorString= {val: "initial"};
	}else{
		filterString = {val: `.${type}`};
		colorString = {val: $checkboxLabel.css("border-color")};
	}

	$g.isotope({ filter: `${filterString.val}`});
	$checkboxLabel.css("background-color", `${colorString.val}`);
}



