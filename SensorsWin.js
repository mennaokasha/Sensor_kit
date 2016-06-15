	myApp.Sensors_win = Ti.UI.createWindow(myApp.win_specs);
	myApp.Sensorsvertical_view = Ti.UI.createView(myApp.horizontalViewSpecs);
	/*******************Accelerometer image ************************/
	myApp.AccelerometerImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.AccelerometerImg.image="imgs/accelerometer.png";
	/******************Battery image***********/
	myApp.BatteryImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.BatteryImg.image="imgs/battery.png";
		/******************GPS image***********/
	myApp.GPSImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.GPSImg.image="imgs/GPS.jpeg";
		/******************Date image***********/
	myApp.DateImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.DateImg.image="imgs/Date.png";
			/******************Temperature  image***********/
	myApp.TemperatureImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.TemperatureImg.image="imgs/tempIcon.png";
	/******************Touch  image***********/
	myApp.TouchImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.TouchImg.image="imgs/touch.png";
	/******************Counter  image***********/
	myApp.CounterImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.CounterImg.image="imgs/counter.png";
	/******************Light  image***********/
	myApp.LightImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.LightImg.image="imgs/light.png";
	/************************Gyroscope image ************************/
	myApp.GyroscopeImg=Ti.UI.createImageView(myApp.ImgSpecs);
	myApp.GyroscopeImg.image="imgs/gyroscope.jpg";

	//Add images to the window
	myApp.Sensorsvertical_view.add(myApp.AccelerometerImg);
	myApp.Sensorsvertical_view.add(myApp.BatteryImg);
	myApp.Sensorsvertical_view.add(myApp.GPSImg);
	myApp.Sensorsvertical_view.add(myApp.DateImg);
	myApp.Sensorsvertical_view.add(myApp.TouchImg);
	myApp.Sensorsvertical_view.add(myApp.TemperatureImg);
	myApp.Sensorsvertical_view.add(myApp.CounterImg);
	myApp.Sensorsvertical_view.add(myApp.LightImg);
	myApp.Sensorsvertical_view.add(myApp.GyroscopeImg);
	
	/*************************************/

	myApp.Sensors_win.add(myApp.Sensorsvertical_view);
	myApp.Sensors_win.open();
	/************************Battery Window ************************/
	myApp.BatteryImg.addEventListener('click',function(e){

		
		if(myApp.CheckBatteryReg.isValidRow()){
			//alert("foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendBatteryData.js");	
			//alert(myApp.CheckBatteryReg.fieldByName('sensor_id'));
			//alert(myApp.CheckBatteryReg.fieldByName('sensor_name'));
		}else{
			//alert("not founded");
			//Open to register battery data 
			Ti.include("RegBattery.js");	
		}
		
	});
	/************************Accelemeter Window ************************/
	myApp.AccelerometerImg.addEventListener('click',function(e){
		if(myApp.CheckAccReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendAccData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegAccelerometer.js");	
		}
	});
	/**********************************GPS Window*********************************/
		myApp.GPSImg.addEventListener('click',function(e){
		if(myApp.CheckGpsReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendGPSData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegGPS.js");	
		}
	});
		/***********************Temperature window ***********************/
		myApp.TemperatureImg.addEventListener('click',function(e){
		if(myApp.CheckTemperatureReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendTemperatureData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegTemperature.js");	
		}
	});
		
		/***********************Touch window ***********************/
		myApp.TouchImg.addEventListener('click',function(e){
		if(myApp.CheckTouchReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendTouchData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegTouch.js");	
		}
	});
		/***********************Counter window ***********************/
		myApp.CounterImg.addEventListener('click',function(e){
		if(myApp.CheckCounterReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendCounterData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegCounter.js");	
		}
	});
		/********************** Temperature window ****************/
		myApp.LightImg.addEventListener('click',function(e){
		if(myApp.CheckLightReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendLightData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegLight.js");	
		}
	});
		/********************** Gyroscope window ****************/
		myApp.GyroscopeImg.addEventListener('click',function(e){
		if(myApp.CheckGyroscopeReg.isValidRow()){
			//alert("Acc foune");
			//Open to send battery data 
			//myApp.CheckBatteryReg.fieldByName('sensor_id');
			Ti.include("SendGyroscopeData.js");	
			//alert(myApp.CheckAccReg.fieldByName('sensor_id'));
			//alert(myApp.CheckAccReg.fieldByName('sensor_name'));
		}else{
			//alert("Acc not founded");
			//Open to register battery data 
			Ti.include("RegGyroscope.js");	
		}
	});
		
