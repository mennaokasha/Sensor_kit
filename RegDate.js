
/******Create main container ***********************************/
myApp.RegDate_win = Ti.UI.createWindow(myApp.win_specs);
myApp.RegDateVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
	
		//*****************create button
		myApp.RegDate_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegDate_btn.title="Register Your counter";
		myApp.RegDateVer_view.add(myApp.RegDate_btn);
		/*************Add components*******/
		myApp.RegDateVer_view.add(myApp.RegDate_btn);
		myApp.RegDate_win.add(myApp.RegDateVer_view);
/*******Open main window****/
myApp.RegDate_win.open();
/*************************Add Event Listener to Reg Sensor*************/
myApp.RegDate_btn.addEventListener('click',function(e){
	RegisterCounterSensor(myApp.CheckUser.fieldByName('user_number'));
});

/*****************Register Acce Function *****************/
function RegisterCounterSensor(sensorcode){
	myApp.xhr = Titanium.Network.createHTTPClient(); 
	myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/RegisterSensor'); 
	myApp.xhr.onload = function() 
	{ 
		alert(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.SensorId);
		/**Insert Sensor ID in the mobile App ****************/
		myApp.db.execute('insert into RegSens(sensor_name,Sensor_id) values("Counter","'+json.SensorId+'")');
		//alert(myApp.db.lastInsertRowId);
		myApp.CheckCounterReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Counter");
		Ti.include("SendCounterData.js");
	}; 

	// this method will be called if there is an error 
	myApp.xhr.onerror = function(error)
	{
		alert(error);
	};

	var object={
			"auth":{
			"DriverManagerId":"MotSensorsKit2",
			"DriverManagerPassword":"mot36Kit2"
			},
			"Package":{
			"SensorFields": [ {
			"Length": "11",
			"ReadingName": "number",
			"Type": "NUMBER"
			}, {
			"Length": "45",
			"ReadingName": "Date_Time",
			"Type": "STRING"
			} ],
			"SensorDetails": {
			"DriverManagerId": "MotSensorsKit2",
			"SensorName": "Counter",
			"SensorReading": "number,Date_Time",
			"SensorCode":sensorcode
			}
	}};
	

	myApp.xhr.send(JSON.stringify(object));
}


