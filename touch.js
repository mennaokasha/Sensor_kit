var myApp ={};
myApp.win = Ti.UI.createWindow({
	backgroundColor: '#009966',
	title: 'win1',
	layout:"vertical",
	ExitOnClose: true
});
myApp.win.open();
myApp.touch_win = Ti.UI.createWindow({
	backgoundColor:'blue',
	title: 'touch_win',
	exitOnClose:false
});
	
myApp.touch_btn = Ti.UI.createButton({
	title: 'Touch',
	// top: 0,
	width: Ti.UI.FILL,
});
// Create a Label.
myApp.time_interval_label = Ti.UI.createLabel({
	text : 'Time interval:',
	color : 'red',
	// font : {fontSize:myFontSize},
	height : 30,
	width : 250,
	// top : 300,
	// left : 0,
	width:250,
	textAlign : 'center'
});
// Create a Label.
myApp.sensor_id_label = Ti.UI.createLabel({
	text : 'Sensor ID:',
	color : 'blue',
	// font : {fontSize:myFontSize},
	height : 45,
	width : 250,
	// top : 100,
	// left : 0,
	textAlign : 'center'
});
myApp.sensor_id = Titanium.UI.createTextField({
    color:'#787878',
    height:45,
    // top:100,
    width:250,
    hintText:'sensor ID',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
});
myApp.time_interval = Titanium.UI.createTextField({
	
    color:'blue',
    height:50,
    top:30,
    width:250,
    hintText:'time interval',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
});
myApp.win.add(myApp.touch_btn);
myApp.win.add(myApp.sensor_id);
// myApp.win.add(myApp.sensor_id_label);
myApp.win.add(myApp.time_interval);
// myApp.win.add(myApp.time_interval.label);
//POST SENSOR DATA FUNCTION
// Create a Button.
var time = Ti.UI.createButton({
	title : 'time'
	// height : myHeight,
	// width : myWidth,
	// top : myTop,
	// left : myLeft
});
// Listen for click events.
time.addEventListener('click', function() {
	 setInterval(test,myApp.time_interval.value);
	function test(){
	alert('Hello');
 };
});
// Add to the parent view.
myApp.win.add(time);
function PostSensorData(x,y){
myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http://dev.masterofthings.com/PostSensorData',false); 
	myApp.xhr.onload = function() 
	 { 
		alert(this.responseText);
	}; 
	// this method will be called if there is an error 
	myApp.xhr.onerror = function(error)
	{
		alert(error);
	};
var object={"auth": {
		"DriverManagerId": "MotSensorsKit2",
		"DriverManagerPassword": "mot36Kit2"},
	"package": {
		"sensorInfo": {
			"sensorId": myApp.sensor_id.value },
		"sensorData": {
			// the readings of the sensor
			"x": x ,
			"y": y
			}
	}};
myApp.xhr.send(JSON.stringify(object));
try{
		//alert(object);
	var json = JSON.stringify(object);
	alert(json);
}
catch(error){
	alert(error);
}
}
 myApp.touch_btn.addEventListener('click',function(e){
 	alert('Your sensor ID is: '+myApp.sensor_id.value+'.');
	 // test();
	 myApp.touch_win.open();
	 
	 alert('Touch anywhere');
	 myApp.touch_win.addEventListener('click', function(e){
	 	var x = e.x;
	 	var y = e.y;
	  alert(x+"," + y);
	  PostSensorData(x,y,myApp.CheckTouchReg.fieldByName('sensor_id'));
	  });
});