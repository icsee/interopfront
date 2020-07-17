
    (function(exports) {
        "use strict";
        const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
        const webSocket = new WebSocket(protocol + location.host);
       var latitud=41.40338 , longitud=2.17403
         
        
         function initMap() {
          exports.map = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: latitud,
              lng: longitud
            },
            zoom: 15
          });
          var marker = new google.maps.Marker({
            position: {lat: latitud, lng:longitud},
            map: map,
             title: 'Aca estoy'
          });
        }

        webSocket.onmessage = function onMessage(message) {
          try {
            var messageData = JSON.parse(message.data);
            console.log('Llego la informacion del gps');
            var pos = {
              lat: messageData.IotData.lat,
              lng: -74.2478958
            };
               // lng: messageData.IotData.long
            
               var marker = new google.maps.Marker({
                position: pos,
                title:"Aca estoy"
            });
            
            map.setCenter(pos);
            marker.setMap(map);

          
          }
          catch (err) {
            console.error(err);
          }

        }

        exports.initMap = initMap;
      })((this.window = this.window || {}));
