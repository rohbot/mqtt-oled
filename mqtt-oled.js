var i2c = require('i2c-bus'),
  i2cBus = i2c.openSync(1),
  oled = require('oled-i2c-bus'),
  font = require('oled-font-5x7');
 
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.0.2:1884')

console.log("Connecting...")
client.on('connect', function () {
  client.subscribe('aqi/cnx', function (err) {
    if (!err) {
      setText("Connected!");
      console.log("Connected!")
      client.publish('get/aqi', 'cnx')
    }
  })
})


client.on('message', function (topic, message) {
  // message is Buffer
  msg = message.toString();
  console.log("Received AQI:", msg);
  setText(msg ,7);
  
})

function setText(txt, size=2){
	oled.clearDisplay();
	oled.setCursor(1, 1);

	oled.writeString(font, size, txt, 1, true);
}


var opts = {
  width: 128,
  height: 64,
  address: 0x3C
};
 
var oled = new oled(i2cBus, opts);

oled.clearDisplay();
oled.turnOnDisplay();
oled.setCursor(1, 1);

setText("Connecting...");
