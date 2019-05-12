var temp_lat = '';
    var temp_lng = '';
    var map;
    var infowindow;
    getLocation();
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        temp_lat = 0.0; //set default lat value
        temp_lng = 0.0; //set default lng value
      }
    }

    function showPosition(position) {
      temp_lat = position.coords.latitude;
      temp_lng = position.coords.longitude;
      initMap();
    }


    function initMap()
    {
      var currloca = {
        lat: temp_lat,
        lng: temp_lng
      };
      map = new google.maps.Map(document.getElementById('map'),{
        center: currloca, zoom: 18
      });
      infowindow = new google.maps.InfoWindow();
      var mark = new google.maps.Marker({
        map: map,
        position: currloca,
        animation: google.maps.Animation.BOUNCE,
        icon: 'person.png'
      });
      google.maps.event.addListener(mark, 'click', function() {
        infowindow.setContent("You are here!");
        infowindow.open(map, this);
      });
      var service = new google.maps.places.PlacesService(map);
      //search for many different possible public locations with bathrooms to use:
      var placeTypes = ["school", "restaurant", "library", "cafe", "hindu_temple", "mosque", "church", "bar", "bank", "department_store", "home_goods_store", "hospital", "subway_station", "synagogue"];

      for(var i = 0; i < placeTypes.length; i++) {
          service.nearbySearch({
            location: currloca,
            radius: 500,
            type: [placeTypes[i]]
          },
          callback);
      }
    }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK){
          for (var i = 0; i < results.length; i++){
            createMarker(results[i]);
          }
        }
      }
      function createMarker(place) {

        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          icon: 'blue-paper.png'
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }