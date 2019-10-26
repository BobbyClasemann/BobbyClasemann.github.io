var places_service;

/* Sets up the Google Places API service */
function setupPlacesService() {
    places_service = new google.maps.places.PlacesService($('#placesApiEntryPoint').get(0));
}

/* Calls the Google Places API service and searches for a locations that matches <searchText> */
function locationSearch(searchText) {
    var request = {
        query: searchText
    };
    //$('.swiper-container').hide();
    $('.swiper-wrapper').empty();
    var $loader = $('<div>', { 'class': 'loader' });
    //$('#pictures').append($loader);
    places_service.textSearch(request, locationSearchCallback);
}

/* The function triggered when we get the response from a location search */
function locationSearchCallback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("locationSearch: ");
        console.log(results);
        placeIdLookup(results[0].place_id);
        var lat = results[0].geometry.location.lat();
        var long = results[0].geometry.location.lng();
        getWeather(lat, long);
    }
}

/* Uses the Google Places API service to look up specific place information with a placeId */
function placeIdLookup(placeId) {
    var request = {
      placeId: placeId,
      fields: ['name', 'rating', 'formatted_phone_number', 'photos', 'address_components', 'reviews', 'rating']
    };
    places_service.getDetails(request, placeIdLookupCallback);
}

/* The function triggered when we get the response from a placeId lookup */
function placeIdLookupCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("placeIdLookup: ");
        console.log(results);
        populateImages(results.photos);
        createReviews(results.reviews);
    }
    
    getStarRating(results.rating);
}
