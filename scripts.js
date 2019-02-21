
var $grid = $('#grid').isotope({
	itemSelector: '.note-item',
	layoutMode: 'fitRows',
	getSortData: {
		name: '[name]',
		date: '[date]',
		type: function(item) { // 'type' is SECOND class for a note object
			var typeVal = $(item).attr('class').split(' ')[1];
			return(typeVal);
		}
	}
});


$( document ).ready {
	alert("page is ready!");
	$grid.isotope({ sortBy: random });
}



