$(document).ready(function() {
	// Flickr information
	var API_key = "d094b2e93903bcebe6a8270372e1e339";
	var user_id = "39629673%40N04";

	// Gets all of the photosets
	var flickrPhotoSetAPI = "http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=" + API_key + "&user_id="+ user_id + "&format=json&nojsoncallback=1";
	var photosets = $.getJSON(flickrPhotoSetAPI, function(data) {
		$.each(data.photosets.photoset, function() {
			var photoset_id = this.id;
			var photoset_title = this.title._content;

			// Get photos fom photoset ID
			var flickrPhotoSetPhotosAPI = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + API_key + "&photoset_id=" + photoset_id + "&format=json&nojsoncallback=1";
			var photos = $.getJSON(flickrPhotoSetPhotosAPI, function(data2) {
				$.each(data2.photoset.photo, function() {
					if(this.isprimary == 1) {						
						var photo_id = this.id;
						var flickrPhotoAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + API_key + "&photo_id=" + photo_id + "&format=json&nojsoncallback=1";
						var photo = $.getJSON(flickrPhotoAPI, function(data3) {
							var photo_url = data3.sizes.size[5].source;
							var marginWidth = calculateMarginWidth();

							var image_container = $('<div>', { "class":"event-container", "style":"margin: " + marginWidth + "px;" });
							var description = $('<h2>', { "class":"event-description", "style":"position: absolute; top: 175px; left: 10px; width: 100%; color: #FFF; font-family: Helvetica; font-size: 1.2em;" });
							description.append(photoset_title);
							var image = $('<img>', { "id":photoset_title , "src":photo_url, "position":"relative", "width":"100%" });
							image_container.append(image.centerImage());
							image_container.append(description);
							$("#sets-gallery").append(image_container);
						});
					}
				});
			});
		});
	});

	// Event handlers

	// Resizes the event containers
	$(window).resize(function() {
		// $(".event-container").css();
	});

});

function calculateMarginWidth() {
	var window_width = $(window).width();
	var numEventContainers = Math.floor(window_width / 250);
	console.log(numEventContainers);
	return (window_width - numEventContainers * 250) / (3 * numEventContainers);	
}