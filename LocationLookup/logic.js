$('input').on('keypress', (event)=> {
        if(event.which === 13){
            handleSearch();
        }
});

function handleSearch() {
    $('#grid').fadeIn(3000);
    var text = $('#search-bar').val();
    locationSearch(text);
}

function createReviews(reviews) {
  $('#reviews').empty();
  if (reviews != undefined) {
	  for (var i = 0; i < Math.min(reviews.length, 4); i++) {
	    var review = createReviewColumn(reviews[i]);
	    $('#reviews').append(review);
	  }
	}
}

function createReviewColumn(review) {
  var col = $('<div>', { 'class': 'col' });
  var card = $('<div>', { 'class': 'card review' });
  var cardBody = $('<div>', { 'class': 'card-body' });
  var headerGrid = $('<div>', { 'class': 'grid' });
  var headerRow = $('<div>', { 'class': 'row' });
  var photoCol = $('<div>', { 'class': 'col-sm-2' });
  var reviewImg = $('<img>', { 'class': 'reviewPhoto', 'src':review.profile_photo_url });
  var nameCol = $('<div>', { 'class': 'col-sm-10' });
  var name = $('<h5>', { 'class': 'card-title' });
  var timeText = $('<small>', { 'class': 'text-muted' });
  var timeCardText = $('<p>', { 'class': 'card-text' });
  var reviewContent = $('<p>', { 'class': 'card-text' });

  col.append(card);
  card.append(cardBody);
  card.css({ 'width': '18rem' });
  cardBody.append(headerGrid);
  headerGrid.append(headerRow);
  headerRow.append(photoCol);
  photoCol.append(reviewImg);
  headerRow.append(nameCol);
  nameCol.append(name);
  name.append(review.author_name);
  timeCardText.append(timeText);
  cardBody.append(timeCardText);
  cardBody.append(reviewContent);
  timeText.append(review.relative_time_description);
  reviewContent.append(review.text);

  return col;
}

/* Adds images from a placeId lookup to the document */
function populateImages(photos) {
    //$('.swiper-wrapper').empty();
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 6,
      spaceBetween: 10,
      slidesPerGroup: 1,
      loop: false,
      loopFillGroupWithBlank: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    for(var i = 0; i < photos.length; i++) {
        var $img = $('<img>', { 'class': 'swiper-slide', 'src': photos[i].getUrl() });
        swiper.appendSlide($img);
    }
    //$(".loader").hide();
    $('.swiper-container').fadeIn(3000);
}

function populateWeather(data) {
	$('#weather').empty();
	var $container = $('<div>', { 'id': 'grid' });
  $container.hide();
	var $container2 = $('<div>', { 'class': 'row' });
	var $container3 = $('<div>', { 'class': 'weatherData col', 'id': 'temp' });
	var $container4 = $('<div>', { 'class': 'weatherData col' });
	var $container5 = $('<div>', { 'class': 'weatherDataExtra' });
	var $container6 = $('<div>', { 'class': 'weatherDataExtra' });
	var $container7 = $('<div>', { 'class': 'weatherDataExtra' });
	var $container8 = $('<div>', { 'class': 'weatherData col' });
	var $container9 = $('<div>', { 'id': 'condition' });


	$container3.append(`${data.temp}°`);
	$($container4).append($container5.append(`High: ${data.maxTemp}°`));
	$($container4).append($container6.append(`Low: ${data.minTemp}°`));
	$($container4).append($container7.append(`Humidity: ${data.humidity}%`));
	$($container8).append($container9.append(`${data.detailedCondition} <br />`));
	$($container9).append(getWeatherImage(data.condition));

	$('#weather').append($container);
	$($container).append($container2);
	$($container2).append($container3);
	$($container2).append($container4);
	$($container2).append($container8);
  $container.fadeIn(3000);
}

function getWeatherImage(condition) {
	return $('<img>', { 'id': 'conditionImage', 'src': `images/${condition}.png`});
}

function getStarRating(rating) {
	$('#star-ratings').empty();
	var percentage = Math.round(rating/5 * 100);
	if (percentage >= 0) {
		var $gridContainer = $('<div>', { 'id': 'grid' });
		var $rowContainer = $('<div>', { 'class': 'row' });
		var $starRatingContainer = $('<div>', {'id': 'star-ratings-container', 'class': 'col'});
		var $starRatingContainerInner = $('<div>', {'id': 'star-ratings-container-inner' });
		$($rowContainer).append($starRatingContainer);
		var $percentContainer = $('<div>', {'class': 'percentage col' });
		$($percentContainer).append(`${percentage}%`);
		$($rowContainer).append($percentContainer);
		var $container = $('<div>', { 'id': 'star-ratings-top', 'style': `width: ${percentage}%`});
		$($container).append(`<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>`);
		$($starRatingContainerInner).append($container);
		var $container2 = $('<div>', { 'id': 'star-ratings-bottom' });
		$($container2).append(`<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>`);
		$($starRatingContainerInner).append($container2);
		$($starRatingContainer).append($starRatingContainerInner);
		$($gridContainer).append($rowContainer);
		$('#star-ratings').append($gridContainer);
		$($gridContainer).fadeIn(3000);

	} else {
		var $container = $('<div>', { 'class': 'unknown'});
		$($container).append(`Rating Unavailable`);
		$('#star-ratings').append($container);
		$container.fadeIn(3000);
	}

}
