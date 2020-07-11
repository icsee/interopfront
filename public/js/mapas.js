
    (function(exports) {
        "use strict";

        function initMap() {
          exports.map = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: 4.581962,
              lng: -74.087159
            },
            zoom: 15
          });
        }

        exports.initMap = initMap;
      })((this.window = this.window || {}));
