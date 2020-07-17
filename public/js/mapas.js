
    (function(exports) {
        "use strict";
        const protocolA = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
        const webSocketA = new WebSocket(protocolA + location.host);
        var latitud=41.40338 , longitud=2.17403
        var image ="/images/homero.png" 
        
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

        webSocketA.onmessage = function onMessage(message) {
          try {
            var messageData = JSON.parse(message.data);
            console.log('Llego la informacion del gps');
            var pos = {
              lat: messageData.IotData.lat,
              lng: messageData.IotData.lng
            };
           
            
               var marker = new google.maps.Marker({
                position: pos,
                title:"Aca estoy",
                icon: image
            });
            
            map.setCenter(pos);
            marker.setMap(map);
            document.getElementById("quetel").innerHTML = "Operador:"+messageData.IotData.operador
            +",    Tecnología: "+ messageData.IotData.tecnologia+" ,    Fabricante Chip: " +messageData.IotData.fabricante +",     Modelo Chip: " +messageData.IotData.modelo
          
          }
          catch (err) {
            console.error(err);
          }

        }

        exports.initMap = initMap;
      })((this.window = this.window || {}));
