$(function() {
 

	  });
var watchID;
        var geo;    // for the geolocation object
        var map;    // for the google map object
        var mapMarker;  // the google map marker object

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var my_location_lat;
        var my_location_lnt;
        // position options
        var MAXIMUM_AGE = 200; // miliseconds
        var TIMEOUT = 300000;
        var HIGHACCURACY = true;
function getGeoLocation() {
            try {
                if( !! navigator.geolocation ) return navigator.geolocation;
                else return undefined;
            } catch(e) {
                return undefined;
            }
        }

function set_my_details(position){
    my_location_lat = position.coords.latitude;
    my_location_lnt = position.coords.longitude;
}
        function show_map(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var latlng = new google.maps.LatLng(lat, lon);

            if(map) {
                map.panTo(latlng);
                mapMarker.setPosition(latlng);
            } else {
                var myOptions = {
                    zoom: 18,
                    center: latlng,

                    // mapTypeID --
                    // ROADMAP displays the default road map view
                    // SATELLITE displays Google Earth satellite images
                    // HYBRID displays a mixture of normal and satellite views
                    // TERRAIN displays a physical map based on terrain information.
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_where_am_i"), myOptions);
                map.setTilt(0); // turns off the annoying default 45-deg view

                mapMarker = new google.maps.Marker({
                    position: latlng,
                    title:"You are here."
                });
                mapMarker.setMap(map);
            }
        }

        function geo_error(error) {
            stopWatching();
            switch(error.code) {
                case error.TIMEOUT:
                    alert('Geolocation Timeout');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Geolocation Position unavailable');
                    break;
                case error.PERMISSION_DENIED:
                    alert('Geolocation Permission denied');
                    break;
                default:
                    alert('Geolocation returned an unknown error code: ' + error.code);
            }
        }

        function stopWatching() {
            if(watchID) geo.clearWatch(watchID);
            watchID = null;
        }

        function startWatching() {
            watchID = geo.watchPosition(show_map, geo_error, {
                enableHighAccuracy: HIGHACCURACY,
                maximumAge: MAXIMUM_AGE,
                timeout: TIMEOUT
            });
        }

        function handle_processsing(){
              watchID = geo.watchPosition(set_my_details, geo_error, {
                enableHighAccuracy: HIGHACCURACY,
                maximumAge: MAXIMUM_AGE,
                timeout: TIMEOUT
            });
        }

function where_im_i(){
	 if((geo = getGeoLocation())) {
                startWatching();
            } else {
                alert('Geolocation not supported.')
            }
}

function handle_current_location_settings(){
     if((geo = getGeoLocation())) {
               handle_processsing();
            } else {
                alert('Geolocation not supported.')
            }
}

function load_search_cafeteria() {
    if($('#cafe_name_search').val()=='')
        alert('Please enter the name of cafeteria to search');
    else{
        var cafe_name = $('#cafe_name_search').val();
        var dataurl = 'http://emumapservice.yournorthcyprus.com/list_search_cafeteria.php?name='+cafe_name;
    $.ajax({
                url: dataurl,
                //timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request... please wait",
                 textonly: true,
                 textVisible: true
                    }); 
                },
                error: function(jqXHR, textStatus) {
                    console.log(textStatus);
                    $.mobile.loading('hide');
                    redirect_to('#errorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading('hide');
                    console.log(textStatus);
                    redirect_to('#errorpage');
                },

                success: function (jsondata) {
                    $.mobile.loading('hide');
                    if(jsondata.length>0){
                    $('#cafeteria_content_listing_area').html('<ul data-theme="b" data-role="listview">');
                       for (var i = 0; i < jsondata.length; i++) {
                       $('#cafeteria_content_listing_area').append('<li data-theme="b"><a href="#" onclick="load_cafeteria_details('+jsondata[i].cafeteria_list.id+')">'+jsondata[i].cafeteria_list.name+'</a></li>');
                       }
                       $('#cafeteria_content_listing_area').append('</ul>');
                         $('#cafeteria_content_listing_area').listview().listview('refresh');
                    redirect_to('#cafeteria_list');
                    }
                    else
                        alert('No Record Found!');
                }


            });
    }
}

function load_all_cafeteria(){
    var dataurl = 'http://emumapservice.yournorthcyprus.com/list_all_cafeteria.php';
    $.ajax({
                url: dataurl,
                //timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request... please wait",
                 textonly: true,
                 textVisible: true
                    });
                },
                error: function(jqXHR, textStatus) {
                    console.log(textStatus);
                    $.mobile.loading('hide');
                    redirect_to('#errorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading('hide');
                    console.log(textStatus);
                    redirect_to('#errorpage');
                },

                success: function (jsondata) {
                    $.mobile.loading('hide');
                    $('#cafeteria_content_listing_area').html('<ul data-theme="b" data-role="listview">');
                       for (var i = 0; i < jsondata.length; i++) {
                       $('#cafeteria_content_listing_area').append('<li data-theme="b"><a href="#" onclick="load_cafeteria_details('+jsondata[i].cafeteria_list.id+')">'+jsondata[i].cafeteria_list.name+'</a></li>');
                      console.log();
                       }
                       $('#cafeteria_content_listing_area').append('</ul>');
                         $('#cafeteria_content_listing_area').listview().listview('refresh');
                    redirect_to('#cafeteria_list');
                }


            });
}

function load_cafeteria_details(id){
     var dataurl = 'http://emumapservice.yournorthcyprus.com/get_cafeteria_details.php?id='+id;
    $.ajax({
                url: dataurl,
                //timeout: 5000,
                beforeSend: function() {
                $.mobile.loading('show', {
                 theme: "a",
                 text: "Loading Cafeteria Details.. please wait",
                 textonly: true,
                 textVisible: true
                    });
                },
                error: function(jqXHR, textStatus) {
                    console.log(textStatus);
                    $.mobile.loading('hide');
                    redirect_to('#errorpage');
                },

                fail: function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading('hide');
                    console.log(textStatus);
                    redirect_to('#errorpage');
                },

                success: function (jsondata) {
                    $.mobile.loading('hide');
                    $('#cafeteria_details_area').html('');
                       for (var i = 0; i < jsondata.length; i++) {
                       $('#cafeteria_details_area').append('<img src="'+jsondata[i].cafeteria_list.cover_pics+'" alt="Cafeteria Cover Picture" class="banner"><p>'+jsondata[i].cafeteria_list.brief_info+'</p><button class="ui-btn" onclick="load_direction('+jsondata[i].cafeteria_list.lat+','+jsondata[i].cafeteria_list.lng+')" >Get Direction</button>');
                       }
                      // $('#cgdb').button();
                    redirect_to('#cafeteria_details');
                }


            });
}

function load_direction(lat,lng){
    console.log(lat);
    console.log(lng);
    $.mobile.loading('show', {
                 theme: "a",
                 text: "Processing Request... please wait",
                 textonly: true,
                 textVisible: true
                    });
    handle_current_location_settings();
  var dest = new google.maps.LatLng(lat, lng);
  console.log(my_location_lat);
  console.log(my_location_lnt);
  var fromloc = new google.maps.LatLng(my_location_lat, my_location_lnt);
   directionsDisplay = new google.maps.DirectionsRenderer();
  var cyprus = new google.maps.LatLng(35.1439106, 33.909568);
  var mapOptions = {
    zoom:9,
    center: cyprus
  };
  map = new google.maps.Map(document.getElementById('direction_map_loc'), mapOptions);
  directionsDisplay.setMap(map);
  var request = {
      origin:fromloc,
      destination:dest,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    console.log(response);
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });

  show_your_location();
  $.mobile.loading('hide');
  redirect_to('#directions_map');
  
}

function show_your_location() {
            var latlng = new google.maps.LatLng(my_location_lat, my_location_lnt);

            if(map) {
                map.panTo(latlng);
                map.setTilt(0); // turns off the annoying default 45-deg view
                console.log('running');
                mapMarker = new google.maps.Marker({
                    position: latlng,
                    title:"You are here."
                });
                mapMarker.setMap(map);
                mapMarker.setPosition(latlng);

            }
        }

function download_manual(){
	window.open("http://mobile.yournorthcyprus.com/user_manual.php","_system");
}

function errordialog(newPage) {
      $("body").pagecontainer("change", newPage, {transition: "pop"});
  	}

  	function redirect_to(newPage) {
      $("body").pagecontainer("change", newPage, {transition: "pop"});
  	}