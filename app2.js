
myApp.home_win = Ti.UI.createWindow(myApp.win_specs);
myApp.horizontal_view = Ti.UI.createView(myApp.horizontalViewSpecs);
myApp.vertical_view = Ti.UI.createView(myApp.verticalViewSpecs);


/**********************************Set sensors button **********************/
myApp.SelectSensorBut=Ti.UI.createButton(myApp.button_specs);
myApp.SelectSensorBut.top=100;
myApp.SelectSensorBut.title="Enter to select your sensor";
/***************************************Set show Registered sensors button ******************/
myApp.ShowRegisteredBut=Ti.UI.createButton(myApp.button_specs);
myApp.ShowRegisteredBut.top=20;
myApp.ShowRegisteredBut.title="Show registered Sensors";
/*********************/
myApp.vertical_view.add(myApp.SelectSensorBut);
myApp.vertical_view.add(myApp.ShowRegisteredBut);
myApp.home_win.add(myApp.vertical_view);
myApp.home_win.open();

myApp.SelectSensorBut.addEventListener('click',function(e){
	/************* Open Sensor window****************/
		Ti.include("SensorsWin.js");	
		//alert(myApp.CheckUser.fieldByName('user_number'));
				
});
/****************************************************/
myApp.ShowRegisteredBut.addEventListener('click',function(e){
		//alert("Open Registered Sensors");
		Ti.include("Registered.js");		
});


