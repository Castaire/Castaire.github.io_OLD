
$(document).ready(function(){
	console.log("Thanks for visiting my site!");

	// set up isotope grid
	$grid = setupGrid();
	$grid.isotope({ 
		sortBy : 'date' ,
		sortAscending: false
	});

	// references to checkboxes
	$projectInput = $("#board #filterbar .customCheckBox #showProjects");
	$workInput = $("#board #filterbar .customCheckBox #showWork");
	$byNameInput = $("#board #filterbar .customCheckBox #byName");
	$byDateInput = $("#board #filterbar .customCheckBox #byDate");

	// setup checkbox styles
	initCheckboxStates($projectInput, $workInput, $byNameInput, $byDateInput);
	
	// add handler to filtering options (work / project)
	$("#board #filterbar .customCheckBox > #showProjects,#showWork").click(
		{grid: $grid, projectElem : $projectInput, workElem : $workInput}, 
		handleFiltering);

	// add handler to sorting options (by date / by name)
	$("#board #filterbar .customCheckBox > #byDate,#byName").click(
		{grid: $grid, byNameElem : $byNameInput, byDateElem : $byDateInput }, 
		handleSorting);

});

// USAGE: 	initializes grid and sort-by keys
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


/**
 *  USAGE: initializes checkboxes to the states described below
 * 	STATES: 
 *		- project, byDate 	:  checked, filled-in
 *     	- work, byName 		:  unchcked, not filled-in
 */
function initCheckboxStates(projectInput, workInput, byDateInput, byNameInput){	
	$projectLabel = $projectInput.next();
	$projectInput.prop("checked", "true");
	updateCheckBox($projectInput);

	$byDateLabel = $byDateInput.next();
	$byDateInput.prop("checked", "true");
	updateCheckBox($byDateInput);

	// show ONLY 'project' items, by date (ascending)
	$grid.isotope({filter: '.project'});
	$grid.isotope({sortBy: 'date'});
}


// USAGE: 	displays projects and/or work tiles, depending on user input
function handleFiltering(event){
	var wasProjectChecked = $(event.data.projectElem).is(":checked");
	var wasWorkChecked = $(event.data.workElem).is(":checked");

	// update grid cells
	var filterString = '';
	if(wasProjectChecked){
		wasWorkChecked? filterString = {val: "*"} : filterString = {val: ".project"};
	}else{
		wasWorkChecked? filterString = {val: ".work"} : filterString = {val: ":not(.work,.project)"};
	}
	$(event.data.grid).isotope({filter: filterString.val});

	// update checkbox fill
	updateCheckBox($(event.target));
}


// USAGE: at any time, grid tiles must be sorted by EITHER "name" OR "date"
function handleSorting(event){
	var $g = $(event.data.grid);
	var $filter = $(event.target);

	if($filter.attr("id") == "byDate"){
		if($filter.is(":checked")){
			$g.isotope({sortBy: 'date', sortAscending: false});
			$(event.data.byNameElem).prop("checked", false);
		}else{
			$g.isotope({sortBy: 'name', sortAscending: true});
			$(event.data.byNameElem).prop("checked", true);
		}

	}else{
		if($filter.is(":checked")){
			$g.isotope({sortBy: 'name', sortAscending: true});
			$(event.data.byDateElem).prop("checked", false);
		}else{
			$g.isotope({sortBy: 'date', sortAscending: false});
			$(event.data.byDateElem).prop("checked", true);
		}

	}

	updateCheckBox($(event.data.byNameElem));
	updateCheckBox($(event.data.byDateElem));
}

// USAGE: 	updates check box fill depending on state
function updateCheckBox(checkboxInput){
	var $label = $(checkboxInput).next();

	if($(checkboxInput).is(":checked")){
		$label.css("background-color", $label.css("border-top-color"));
	}else{
		$label.css("background-color", "initial");
	}
}


