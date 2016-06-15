// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#0080FF');
var Sensorcode;
var myApp={};
myApp.db=Ti.Database.open('RegSens');
myApp.db.execute('create table IF NOT EXISTS RegSens(sensor_name varchar(255),Sensor_id varchar(255))');
/********************************/
myApp.userdb=Ti.Database.open('Username');
myApp.userdb.execute('create table IF NOT EXISTS Username(user_name varchar(255),user_number varchar(255))');
//myApp.db.execute('drop table RegSens');
myApp.CheckUser=myApp.userdb.execute('select * from Username');
/******************************************************/
myApp.CheckAccReg= myApp.db.execute('select * from RegSens where sensor_name=?',"Accelerometer");
myApp.CheckBatteryReg= myApp.db.execute('select * from RegSens where sensor_name=?',"Battery");
myApp.CheckGpsReg= myApp.db.execute('select * from RegSens where sensor_name=?',"GPS");
myApp.CheckTemperatureReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Temperature");
myApp.CheckCounterReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Counter");
myApp.CheckTouchReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Touch");
myApp.CheckLightReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Light");
myApp.CheckGyroscopeReg = myApp.db.execute('select * from RegSens where sensor_name=?',"Gyroscope");

/**** ****/
myApp.win_specs={
	backgroundColor:"#028dd0",
	title:"MOT Sensor Kit",
	//exitOnClose:true,
	layout:"vertical",
	theme:"Theme.AppCompat.Light.NoActionBar"};
/**************************************/
myApp.verticalViewSpecs={
	top:30,
	bottom:30,
	right:30,
	left:30,
	//borderRadius:20,
	borderColor:"black",
	backgroundColor:"#D3D3D3",
	layout:"vertical"};
/***************************************/
myApp.horizontalViewSpecs={
	borderRadius:20,
	borderColor:"black",
	layout:"horizontal",
	backgroundColor:"#D3D3D3",
	top:30,
	bottom:30,
	right:30,
	left:30,};
/**********************************/

myApp.text_specs={
	backgroundColor:"#FFF",
	top:30,
	left:30,
	right:30,
	borderWidth:1,
	borderColor:"#635270",
	borderRadius:5,
	hintTextColor:"#CCC",
	color:"#000",
	//passwordMask:true,
	borderRadius:10,
};
/***************************************/
myApp.label_specs={
	//backgroundColor:"#FFF",
	//top:30,
	//left:10,
	//right:30,
	borderWidth:1,
	//borderColor:"#635270",
	//borderRadius:5,
	hintTextColor:"#CCC",
	color:"#000",
	//passwordMask:true,
	textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
	width: Ti.UI.SIZE,
   height: Ti.UI.SIZE
};
/*************************************/
myApp.button_specs= {
  	color:"white",
	width:Ti.UI.FILL,
	backgroundColor:"#a8b00d",
	borderColor:"Gray",
	borderWidth:1,
	//top:100,
	left:30,
	right:30,
	borderRadius:10,};
/************************************/
myApp.ImgSpecs={
				width:"85dp",
				height:"100dp",
				top:"2",
				left: 1,};

	/******************************************************************************************/
	myApp.Intro_win = Ti.UI.createWindow(myApp.win_specs);
	myApp.IntroVerticalView = Ti.UI.createView(myApp.verticalViewSpecs);
	/******************************************************************************************/
	myApp.MotImg=Ti.UI.createImageView();
	myApp.MotImg.image="imgs/MoT.jpg";
	myApp.IntroVerticalView.add(myApp.MotImg);
	myApp.Intro_win.add(myApp.IntroVerticalView);
	/******************************************************************************************/

		if(myApp.CheckUser.isValidRow()){
			Ti.include("app2.js");
		}else{
			myApp.Intro_win.open();
		}

	
	//if(Sensorcode === null){
		myApp.Mobile=Ti.UI.createTextField(myApp.text_specs);
		myApp.Mobile.hintText="   Your Mobile number";
		myApp.Mobile.keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD;
		myApp.IntroVerticalView.add(myApp.Mobile);
		myApp.RegApp_btn=Ti.UI.createButton(myApp.button_specs);
		myApp.RegApp_btn.title="Send your mobile";
		myApp.IntroVerticalView.add(myApp.RegApp_btn);
	//}else{
		//alert("Defined");
		//Ti.include("app2.js");
	//}

	/**************************************************************/
	myApp.RegApp_btn.addEventListener('click',function(e){
		//Sensorcode=myApp.Mobile.value;
		//alert(Sensorcode);
		myApp.userdb.execute('insert into Username(user_name,user_number) values("Menna","'+myApp.Mobile.value+'")');
		myApp.CheckUser=myApp.userdb.execute('select * from Username');
		Ti.include("app2.js");
	});