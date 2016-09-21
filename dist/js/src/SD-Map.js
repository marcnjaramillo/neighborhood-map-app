var map, marker, infowindow;

var locations = [
  {
    name: 'San Diego Zoo',
    url: 'http://zoo.sandiegozoo.org/',
    //address: '2920 Zoo Dr, San Diego, CA 92101'
    lat: 32.735316,
    lng: -117.1512347
  },
  {
    name: 'Sea World San Diego',
    url: 'https://seaworldparks.com/en/seaworld-sandiego/',
    //address: '500 Sea World Dr, San Diego, CA 92109'
    lat: 32.7639528,
    lng: -117.2289364
  },
  {
    name: 'San Diego Natural History Museum',
    url: 'http://www.sdnhm.org/',
    //address: 'Balboa Park, 1788 El Prado, San Diego, CA 92101'
    lat: 32.732111,
    lng: -117.1473601
  },
  {
    name: 'San Diego Zoo Safari Park',
    url: 'http://www.sdzsafaripark.org/',
    //address: '15500 San Pasqual Valley Rd, Escondido, CA 92027'
    lat: 33.0974458,
    lng: -116.9957227
  },
  {
    name: 'Birch Aquarium',
    url: 'http://aquarium.ucsd.edu/',
    //address: '2300 Expedition Way, La Jolla, CA 92037'
    lat: 32.8658117,
    lng: -117.2506888
  }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.8245525, lng: -117.0951635},
    zoom: 10,
    mapTypeControl: false
  });
ko.applyBindings( new ViewModel());
}

//These functions control the side panel
function openNav() {
//This sets the width of the side panel depending on the width of the screen
  if(screen.width <= 700) {
    document.getElementById("mySidenav").style.width = "250px";
  }
  else {
    document.getElementById("mySidenav").style.width = "362px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function ViewModel() {
  var self = this;

//Create the observables for the data that will be used for the project
  function locInfo(data) {
    self.name = ko.observable(data.name);
    self.lat = ko.observable(data.lat);
    self.lng = ko.observable(data.lng);
    self.LatLng = ko.computed( function() {
      return self.lat() + self.lng();
    });
  }
//Create the observableArray for the locations
  self.allLocs = ko.observableArray(locations);
//Create a forEach function that will create markers, add them to the map,
//animate them, and create the infowindow for each location
  self.allLocs().forEach(function (location) {
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');
    marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(location.lat, location.lng),
      icon: makeMarkerIcon('0091ff'),
      title: location.name,
      animation: google.maps.Animation.DROP,
    });
    location.marker = marker;
    location.marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon);
              });
              location.marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
              });

    location.marker.addListener('click', toggleBounce);
  //This is from the Google Maps API course. I used this to differentiate between
  //visible markers and the one that is selected
    function makeMarkerIcon(markerColor) {
      var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+
        markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
      return markerImage;
    }
  //Bounce the marker that is selected
    function toggleBounce() {
      if (location.marker.getAnimation() !== null) {
        location.marker.setAnimation(null);
      }
      else {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
          location.marker.setAnimation(null);
        }, 2000);
        closeNav();
      }
    }
  //Listen for a click event and create a new infowindow
    google.maps.event.addListener(location.marker, 'click', function () {
            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }

            //Wikipedia API
            var content;
            var locNames = location.name;
            var locUrl = location.url;
            var urlNames = encodeURI(location.name);
            var wikiUrl =
            "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="
            + urlNames + "&limit=1&redirects=return&format=json";

            self.apiTimeout = setTimeout(function () {
                alert('ERROR: Failed to load data');
            }, 5000);

            self.apiTimeout;

            $.ajax({
                url: wikiUrl,
                dataType: "jsonp",
                success: function (response) {
                    clearTimeout(self.apiTimeout);
                    var articleList = response[1];
                    console.log(response);
                    if (articleList.length > 0) {
                        for (var i = 0; i < articleList.length; i++) {
                            var articleStr = articleList[i];
                            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                            content = '<div class="info">' +
                            '<h3 class="text-center" id="infoTitle">' + locNames +
                            '</h3>' +
                            //Create a link to the related Wikipedia page
                            '<p>' + response[2] + ' <a href="' + url +
                            '" target="_blank">' + "Wikipedia" + '</a>' + '</p>' +
                            //Create link to the location website
                            '<a href="' + locUrl + '" target="_blank">' +
                            locNames + " Homepage" + '</a>' + '</div>';
                            infowindow.setContent(content);
                        }
                    } else {
                        content = '<div class="info">' +
                        '<h3 class="text-center" id="infoTitle">' + locNames +
                        '</h3>' + '<p>' + "Sorry, No Articles Found on Wikipedia"
                        + '</p>' + '</div>';
                        infowindow.setContent(content);
                    }
                    infowindow.open(map, location.marker);
                    setTimeout(function () {
                        infowindow.close();
                    }, 9000);
                },
                error: (function () {
                    content = '<div class="info">' +
                    '<h3 class="text-center" id="infoTitle">' + locNames +
                    '</h3>' + '<p>' +
                    "Failed to reach Wikipedia Servers, please try again"
                    + '</p>' + '</div>';
                    infowindow.setContent(content);
                })
            });

        });
  });
 //Trigger the same marker events when the corresponding list item is clicked
  self.locs = function (location, marker) {
    google.maps.event.trigger(location.marker, 'click');
  };

  self.request = ko.observable('');

  self.filterLocs = ko.computed(function () {
    return ko.utils.arrayFilter(self.allLocs(), function(list) {
      var filter = list.name.toLowerCase().indexOf(self.request().toLowerCase()) >= 0;
      if (filter) {
        list.marker.setVisible(true);
      }
      else {
        list.marker.setVisible(false);
      }
      return filter;
    });
  });
};
