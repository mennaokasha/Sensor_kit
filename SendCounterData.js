myApp.PostCounter_win = Ti.UI.createWindow(myApp.win_specs);
myApp.PostCounterVer_view = Ti.UI.createView(myApp.verticalViewSpecs);
/***********************Start point interval**************/
myApp.StartValue =Ti.UI.createTextField(myApp.text_specs);
myApp.StartValue.top=30;
myApp.StartValue.hintText="Enter start value";
myApp.StartValue.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
/***********************Start point interval**************/
myApp.StepValue =Ti.UI.createTextField(myApp.text_specs);
myApp.StepValue.top=30;
myApp.StepValue.hintText="Enter the step you need";
myApp.StepValue.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;

/***********************Set time interval**************/
myApp.CounterTimeInterval =Ti.UI.createTextField(myApp.text_specs);
myApp.CounterTimeInterval.top=30;
myApp.CounterTimeInterval.hintText="Enter time interval";
myApp.CounterTimeInterval.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
//myApp.GPSTimeIterval.
/*****************Button Battery ****/
myApp.Set_Counter_But=Ti.UI.createButton(myApp.button_specs);
myApp.Set_Counter_But.top=30;
myApp.Set_Counter_But.title="Set time interval";
/*****************Button Battery ****/
myApp.UnSet_Counter_But=Ti.UI.createButton(myApp.button_specs);
myApp.UnSet_Counter_But.top=30;
myApp.UnSet_Counter_But.title="UnSet time interval";

////Set time interval
myApp.Set_Counter_But.addEventListener('click', function(f){
	if(myApp.CounterTimeInterval.value=="" || myApp.CounterTimeInterval.value==null ){
		alert("Please Insert time interval");
		//alert(battery_level);
	}
	else{	
		number=parseInt(myApp.StartValue.value);
		step=parseInt(myApp.StepValue.value);
		Counter_Date_Time=new Date();
		alert(Counter_Date_Time);
		setCountertime=setInterval(function(){PostGpsSensorData(number,Counter_Date_Time,myApp.CheckCounterReg.fieldByName('sensor_id')); 
		number=number+step;
		},myApp.CounterTimeInterval.value);
	

		}
	
});
////Set time interval
myApp.UnSet_Counter_But.addEventListener('click', function(f){
	clearInterval(setCountertime);
	
});


myApp.PostCounterVer_view.add(myApp.StartValue);
myApp.PostCounterVer_view.add(myApp.StepValue);
myApp.PostCounterVer_view.add(myApp.CounterTimeInterval);
myApp.PostCounterVer_view.add(myApp.Set_Counter_But);
myApp.PostCounterVer_view.add(myApp.UnSet_Counter_But);
myApp.PostCounter_win.add(myApp.PostCounterVer_view);
myApp.PostCounter_win.open();

function PostGpsSensorData(number,Counter_Date_Time,CounterSensorID){

myApp.xhr = Titanium.Network.createHTTPClient(); 
myApp.xhr.open('POST','http:\/\/dev.masterofthings.com/PostSensorData'); 
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
			"sensorId": CounterSensorID},
		"sensorData": {
			// the readings of the sensor
			"number": number ,
			"Counter_Date_Time":Counter_Date_Time
			
			}
	}};
	
	myApp.xhr.send(JSON.stringify(object));
}

