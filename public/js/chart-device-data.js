/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
  // if deployed to a site supporting SSL, use wss://
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);

  // A class for holding the last N points of telemetry for a device
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

  //chart3
  var ctx3 = document.getElementById('chart3').getContext('2d')
  var data3 = {
    labels: [0],
    datasets: [{
      data: [0],
      label: 'lux',
      // backgroundColor: '#ff6600'
borderColor: '#F44436',
      pointBackgroundColor: '#F44440'
    }]
  }
  var chart3 = new Chart(ctx3, {
    type: 'line',
    data: data3,
    options: optionsAnimations
  })

  //chart4
  var ctx4 = document.getElementById('chart4').getContext('2d')
  var data4 = {
    labels: [0],
    datasets: [{
      data: [0],
      label: 'rssi-particle',
      // backgroundColor: '#ff6600'
      borderColor: '#F44436',
      pointBackgroundColor: '#F44440'
    },
    {
      data: [1],
      label: 'rssi-lora',
      //backgroundColor: '#ff6600',
      borderColor: '#41D519',
      pointBackgroundColor: '#229954'
    },
    {
      data: [2],
      label: 'rssi-bluetooth',
      //backgroundColor: '#ff6600',
      borderColor: ' #262c88',
      pointBackgroundColor: '#1924d5'
    },
  
  ]
  }
  var chart4 = new Chart(ctx4, {
    type: 'line',
    data: data4,
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

      data.labels.push(moment().format('HH:mm:ss'))
      data.datasets[0].data.push(messageData.IotData.Bluetooth)
//código para el sistema Lora
   
        var length = data2.labels.length
        if (length >= 20) {
          data2.datasets[0].data.shift()
          data2.labels.shift()  
        }

        data2.labels.push(moment().format('HH:mm:ss'))
        data2.datasets[0].data.push(messageData.IotData.Lora)

        //código para particle
   
          var length = data3.labels.length
          if (length >= 20) {
            data3.datasets[0].data.shift()
            data3.labels.shift()
          }
  
          data3.labels.push(moment().format('HH:mm:ss'))
          data3.datasets[0].data.push(messageData.IotData.Particle)
    //código para rssi
   
    var length = data4.labels.length
    if (length >= 20) {
      data4.datasets[0].data.shift()
      data4.datasets[1].data.shift()
      data4.datasets[2].data.shift()
      data4.labels.shift()
    }

    data4.labels.push(moment().format('HH:mm:ss'))
    data4.datasets[0].data.push(messageData.IotData.rssiParticle)
    data4.datasets[1].data.push(messageData.IotData.rssiLora)
    data4.datasets[2].data.push(messageData.IotData.rssiBluetooth)
  
    chart1.update()
    chart2.update()
    chart3.update()
    chart4.update()

      myLineChart.update();
    } catch (err) {
      console.error(err);
    }
  };
});
