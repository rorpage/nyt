var markers = [];
var NYT = (function () {
	var baseUrl = "http://api.nytimes.com/svc/events/v2/listings?api-key=1b6ec24de1512db2fae47f5165ce39ea:6:69563513";
	function buildUrl() {
		//var mapBounds = map.getBounds();
		var mapCenter = map.getCenter();
		return baseUrl +  
			// "&sw=" + mapBounds.getSouthWest().lat() + "," + mapBounds.getSouthWest().lng() +
			// "&ne=" + mapBounds.getNorthEast().lat() + "," + mapBounds.getNorthEast().lng();
			"&ll=" + mapCenter.lat() + "," + mapCenter.lng();
	}
	
	function search() {
		var url = buildUrl();
		if (filter) {
			url += filter;
			Maps.DeleteMarkers();
		}
		
		$.ajax({
			url: url,
			success: function (data) {
				Maps.BuildMarkers(data.results, map);
			},
			error: function() {
				alert("Oops! Something's broken - please try again. :(");
			}
		});
	}
	
	return {
		Search: search
	}
}());