/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
$(document).ready(() => {
  // if deployed to a site supporting SSL, use wss://
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);
  //const Mapa = require('./mapas.js');
  // A class for holding the last N points of telemetry for a device

  //this.mapa =  new Mapa();
  let paquetes = 0
  let start = new Date()
  var ctx = document.getElementById('chart1').getContext('2d')
  var data = {
    labels: [0],
    datasets: [{
      data: [0],
      label: 'lux',
      // backgroundColor: '#F44436',
      borderColor: '#F44436',
      pointBackgroundColor: '#F44436'
    }]
  }
  var optionsAnimations = {
    animation: false,
    legend: {
      display: false
    },
    responsive: true
  }
  var chart1 = new Chart(ctx, {
    type: 'line',
    data: data,
    options: optionsAnimations
  })

  var ctx2 = document.getElementById('chart2').getContext('2d')
  var data2 = {
    labels: [0],
    datasets: [{
      data: [0],
      label: 'lux',
      // backgroundColor: '#ff6600'
      borderColor: '#F44436',
      pointBackgroundColor: '#F44438'
    }]
  }
  var chart2 = new Chart(ctx2, {
    type: 'line',
    data: data2,
    options: optionsAnimations
  })

   //chart4
   var ctx4 = document.getElementById('chart4').getContext('2d')
   var data4 = {
     labels: [0],
     datasets: [{
       data: [0],
       label: 'CSQ',
       // backgroundColor: '#ff6600'
       borderColor: ' #262c88',
       pointBackgroundColor: '#1924d5'
     }
   
   
   ]
   }
   var chart4 = new Chart(ctx4, {
     type: 'line',
     data: data4,
     options: optionsAnimations
   })
 
 

  //chart5
  var ctx5 = document.getElementById('chart5').getContext('2d')
  var data5 = {
    labels: [0],
    datasets: [{
      data: [0],
      label: 'lux',
      // backgroundColor: '#ff6600'
      borderColor: ' #262c88',
      pointBackgroundColor: '#1924d5'
    }
  
  
  ]
  }
  var chart5 = new Chart(ctx5, {
    type: 'line',
    data: data5,
    options: optionsAnimations
  })


//chart6
var ctx6 = document.getElementById('chart6').getContext('2d')
var data6 = {
  labels: [0],
  datasets: [{
    data: [0],
    label: 'lux',
    // backgroundColor: '#ff6600'
    borderColor: ' #262c88',
    pointBackgroundColor: '#1924d5'
  }


]
}
var chart6 = new Chart(ctx6, {
  type: 'line',
  data: data6,
  options: optionsAnimations
})


//chart7
var ctx7 = document.getElementById('chart7').getContext('2d')
var data7 = {
  labels: [0],
  datasets: [{
    data: [0],
    label: 'lux',
    // backgroundColor: '#ff6600'
    borderColor: ' #262c88',
    pointBackgroundColor: '#1924d5'
  }


]
}
var chart7 = new Chart(ctx7, {
  type: 'line',
  data: data7,
  options: optionsAnimations
})


//chart8
var ctx8 = document.getElementById('chart8').getContext('2d')
var data8 = {
  labels: [0],
  datasets: [{
    data: [0],
    label: 'lux',
    // backgroundColor: '#ff6600'
    borderColor: ' #262c88',
    pointBackgroundColor: '#1924d5'
  }


]
}
var chart8 = new Chart(ctx8, {
  type: 'line',
  data: data8,
  options: optionsAnimations
})



  // When a web socket message arrives:
  // 1. Unpack it
  // 2. Validate it has date/time and temperature
  // 3. Find or create a cached device to hold the telemetry data
  // 4. Append the telemetry data
  // 5. Update the chart UI
  webSocket.onmessage = function onMessage(message) {
    try {
      var messageData = JSON.parse(message.data);
      console.log(messageData);
  
      var pos = {
        lat: messageData.IotData.lat,
        lng: messageData.IotData.lng,
        operador: messageData.IotData.operador,
        tecnologia:messageData.IotData.tecnologia,
        fabricante:messageData.IotData.fabricante,
        modelo:messageData.IotData.modelo
      };
      
      writemap(pos);
      
      /*paquetes++
      const arrivalTime = new Date()
      const arrivalMs = arrivalTime.getTime()
      const latencia = arrivalMs - messageData.timeCapbluetooth
      console.log("El dato " + messageData.Bluetooth + " tardó " + latencia + "ms en llegar");
      const elapsed = arrivalMs - start
      if (elapsed >= 60000) {
        console.log("Se recibieron " + paquetes + "/60 paquetes");
        paquetes = 0
        start = new Date()
      }*/


      var length = data.labels.length
      if (length >= 20) {
        data.datasets[0].data.shift()
        data.labels.shift()
      }

      
       //código para el sistema Lora
   
       var length = data2.labels.length
        if (length >= 20) {
          data2.datasets[0].data.shift()
          data2.labels.shift()  
        }

        var length = data4.labels.length
        if (length >= 20) {
          data4.datasets[0].data.shift()
          data4.labels.shift()  
        }


        //código para particle
   
     /*     var length = data3.labels.length
          if (length >= 20) {
            data3.datasets[0].data.shift()
            data3.labels.shift()
          }*/
  
         
    
   
    

    var length = data5.labels.length
    if (length >= 20) {
      data5.datasets[0].data.shift()
      data5.labels.shift()
    }

    var length = data6.labels.length
    if (length >= 20) {
      data6.datasets[0].data.shift()
      data6.labels.shift()
    }

    var length = data7.labels.length
    if (length >= 20) {
      data7.datasets[0].data.shift()
      data7.labels.shift()
    }

    var length = data8.labels.length
    if (length >= 20) {
      data8.datasets[0].data.shift()
      data8.labels.shift()
    }


    if(messageData.DeviceId==="raspberrylabsolar"){
    data4.labels.push(moment().format('HH:mm:ss'))
    //data3.labels.push(moment().format('HH:mm:ss'))
    data2.labels.push(moment().format('HH:mm:ss'))
    data.labels.push(moment().format('HH:mm:ss'))
    data.datasets[0].data.push(messageData.IotData.Bluetooth)
    data2.datasets[0].data.push(messageData.IotData.Lora)
    //data3.datasets[0].data.push(messageData.IotData.Particle)
    
    data7.datasets[0].data.push(messageData.IotData.rssiLora)
    data6.datasets[0].data.push(messageData.IotData.rssiBluetooth)
    data4.datasets[0].data.push(messageData.IotData.CSQ)
    
    }
    
    if(messageData.DeviceId==="450028000851363136363935"){
     if(messageData.IotData.value_wifi=!null){
      data5.labels.push(moment().format('HH:mm:ss'))
      data5.datasets[0].data.push(messageData.IotData.value_wifi)
      chart5.update()}
    if(messageData.IotData.IotData.data=!null){
      data8.labels.push(moment().format('HH:mm:ss'))
      data8.datasets[0].data.push(messageData.IotData.data)
      chart8.update()
       }
            
     }

     chart1.update()
     chart2.update()
     //chart3.update()
     chart4.update()
     chart6.update()
     chart7.update()
    
    
     
      
    } catch (err) {
      console.error(err);
    }
  };

});
