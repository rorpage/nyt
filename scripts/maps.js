var markers = [];
var Maps = (function () {
	function boundsChanged() {
		NYT.Search();
	}
	
	function deleteMarkers() {
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
  		}

		markers = [];
	}
	
	function buildMarkers(results) {
		$.each(results, function() {
			var infowindow = new google.maps.InfoWindow({
				content: "<h3>" + this.event_name + "</h3>" + this.web_description
			});
			
			var marker = new google.maps.Marker({
				position: { lat: parseFloat(this.geocode_latitude), lng: parseFloat(this.geocode_longitude) },
				map: map,
				title: this.event_name
			});
	
			marker.addListener("click", function() {
				infowindow.open(map, marker);
			});
			
			markers.push(marker);
		});
	}
	
	function updateMap(position) {
		var lat = position.coords.latitude;
        var lng = position.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng);
		map.panTo(latlng);
	}
	
	return {
		BoundsChanged: boundsChanged,
		BuildMarkers: buildMarkers,
		DeleteMarkers: deleteMarkers,
		UpdateMap: updateMap
	}
}());