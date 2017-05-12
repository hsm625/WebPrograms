/*calculations.js*/

//implements the javascript for normal probability page one.
function calculatePgOne(){
	var low = document.getElementById("").value;
	var high = document.getElementById("").value;
	var avg = document.getElementById("").value;
	var sd = document.getElementById("").value;
	var l = Number(low);
	var h = Number(high);
	var a = Number(avg);
	var s = Number(sd);
	if(sd == "0"){
		alert("divide by zero error. standard deviation cannot be zero.");
		return false;
	}
	if(checkdata(avg) == 0){
		alert("mean value is not a valid number.");
		return false;
	}
	if(checkdata(sd) == 0){
		alert("standard deviation is not a valid number.");
		return false;
	}
	if(low != "" || high == ""){
		if(checkdata(low) == 0){
			alert("lower value is not a valid number.");
			return false;
		}
		else{
			document.getElementById("").value = pGreaterThanXnorm(l, a, s);
			return true;
		}
	}
	if(low == "" || high != ""){
		if(checkdata(high) == 0){
			alert("upper value is not a valid number.");
			return false;
		}
		else{
			document.getElementById("").value = pLessThanXnorm(h, a, s);
			return true;
		}
	}
	if(low != "" || high != ""){
		if(checkdata(low) == 0){
			alert("lower value is not a valid number.");
			return false;
		}
		if(checkdata(high) == 0){
			alert("upper value is not a valid number.");
			return false;
		}
		else{
			document.getElementById("").value = inbetween(l, h, a, s);
			return true;
		}
	}
	else{
		alert("no values entered for the upper and lower bounds. please enter a number.")
		return false;
	}
}

//implements the code for page two and three. the difference between the two is two uses population standard deviation and Z value. three uses sample standard deviation and T value.
function calculatePgTwoThreeDoubleSided(){
	var avg = document.getElementById("").value;
	var ZT = document.getElementById("").value;
	var size = document.getElementById("").value;
	var sd = document.getElementById("").value;
	var a = Number(avg);
	var z = Number(ZT);
	var n = Number(size);
	var s = Number(sd);
	
	//checks for divide by zero error
	if(size == 0){
		alert("divide by zero error. size cannot be zero");
		return false;
	}
	
	//validates data
	if(checkdata(avg) == 0){
		alert("average value is not valid");
		return false;
	}
	if(checkdata(zt) == 0){
		alert("Z/T value is not valid");
		return false;
	}
	if(checkdata(size) == 0){
		alert("the sample size is invalid");
		return false;
	}
	if(checkdata(sd) == 0){
		alert("the standard deviation is invalid");
		return false;
	}
	else{
		ConfidenceInterval(a, z, s, n);
		return true;
	}
}

//lower bound confidence interval implimentation code
function calculatePgTwoThreeLower(){
	var avg = document.getElementById("").value;
	var ZT = document.getElementById("").value;
	var size = document.getElementById("").value;
	var sd = document.getElementById("").value;
	var a = Number(avg);
	var z = Number(ZT);
	var n = Number(size);
	var s = Number(sd);
	
	//checks for divide by zero error
	if(size == 0){
		alert("divide by zero error. size cannot be zero");
		return false;
	}
	
	//validates data
	if(checkdata(avg) == 0){
		alert("average value is not valid");
		return false;
	}
	if(checkdata(zt) == 0){
		alert("Z/T value is not valid");
		return false;
	}
	if(checkdata(size) == 0){
		alert("the sample size is invalid");
		return false;
	}
	if(checkdata(sd) == 0){
		alert("the standard deviation is invalid");
		return false;
	}
	else{
		ConfidenceIntervalLow(a, z, s, n);
		return true;
	}
}

//confidence interval upper bound implementation code.
function calculatePgTwoThreeUpper(){
	var avg = document.getElementById("").value;
	var ZT = document.getElementById("").value;
	var size = document.getElementById("").value;
	var sd = document.getElementById("").value;
	var a = Number(avg);
	var z = Number(ZT);
	var n = Number(size);
	var s = Number(sd);
	
	//checks for divide by zero error
	if(size == 0){
		alert("divide by zero error. size cannot be zero");
		return false;
	}
	
	//validates data
	if(checkdata(avg) == 0){
		alert("average value is not valid");
		return false;
	}
	if(checkdata(zt) == 0){
		alert("Z/T value is not valid");
		return false;
	}
	if(checkdata(size) == 0){
		alert("the sample size is invalid");
		return false;
	}
	if(checkdata(sd) == 0){
		alert("the standard deviation is invalid");
		return false;
	}
	else{
		ConfidenceIntervalUp(a, z, s, n);
		return true;
	}
}

//makes sure the code is working properly. delete when putting the files together.
function dostuff()
{
alert("communicating with javascript");
alert(pLessThanXnorm(29, 30, 3));
alert(pGreaterThanXnorm(29, 30, 3));
alert(inbetween(20, 40, 30, 3));
alert(checkdata("test"));
}

//makes sure the entries are valid
function checkdata(x){
	var dom = document.getElementById(x).value;
	var val = dom.search(/\-?-\d+$/);
	var val2 = dom.search(/\d+$/);
	if (val == 0 || val2 == 0)
	{
		return 1;
	}
	else
	{
		alert("invalid number");
		return 0;
	}
}

//finds the probability of a value being less than the one specified
function pLessThanXnorm(x, m, s)
{
	var p = (x-m)/s;
	var rowId;
	var colStep1 = Math.round(p * 100);
	var colStep2 = Math.abs(colStep1 % 10);
	var row;
	if(p < 0){
		rowId = Math.ceil(p*10)/10;
	}
	else if (p > 0){
		rowId = Math.floor(p*10)/10;
	}
	else{
		rowId = 0.0;
	}

	if(p > 3.49){
		return 1;
	}

	if(p < -3.49){
		return 0;
	}

	if(rowId == 0.0){
		if (p >= 0.0){
			row = document.getElementById("0.0");
			var cells = row.getElementsByTagName("td");
			return cells[colStep2].innerText;
		}
		else{
			row = document.getElementById("-0.0");
			var cells = row.getElementsByTagName("td");
			return cells[colStep2].innerText;
		}
	}
	else{
		row = document.getElementById(rowId);
		var cells = row.getElementsByTagName("td");
		return cells[colStep2].innerText;
	}
}

//finds the probability of a value being greater than one specified
function pGreaterThanXnorm(x, m, s)
{
	//finds the z value corresponding to the value entered.
	var p = (x-m)/s;
	var rowId;
	var colStep1 = Math.round(p * 100);
	var colStep2 = Math.abs(colStep1 % 10);
	var row;
	if(p < 0){
		rowId = Math.ceil(p*10)/10;
	}
	else if (p > 0){
		rowId = Math.floor(p*10)/10;
	}
	else{
		rowId = 0.0;
	}
	alert(p + " " + rowId + " " + colStep1 + " " + colStep2);

	if(p > 3.49){
		return 0;
	}

	if(p < -3.49){
		return 1;
	}

	if(rowId == 0.0){
		if (p >= 0.0){
			row = document.getElementById("0.0");
			var cells = row.getElementsByTagName("td");
			return 1 - cells[colStep2].innerText;
		}
		else{
			row = document.getElementById("-0.0");
			var cells = row.getElementsByTagName("td");
			return 1 - cells[colStep2].innerText;
		}
	}
	else{
		row = document.getElementById(rowId);
		var cells = row.getElementsByTagName("td");
		return 1 - cells[colStep2].innerText;
	}
}

//finds the probability of a value being between two numbers
function inbetween(low, up, m, s){
	return pLessThanXnorm(up, m, s) - pLessThanXnorm(low, m, s);
}

//confidence interval. same formula for T distribution. this is the two sided confidence interval for the population average.
function ConfidenceInterval(x, z, s, n){
	var lower = x - (z * (s / Math.sqrt(n)));
	var upper = x + (z * (s / Math.sqrt(n)));
	document.getElementById("low").value = lower;
	document.getElementById("up").value = upper;
}
//one sided confidence interval. upper bounded
function ConfidenceIntervalUp(x, z, s, n){
	var upper = x + (z * (s / Math.sqrt(n)));
	document.getElementById("").value = upper;
}

//one sided confidence interval. lower bounded
function ConfidenceIntervalLow(x, z, s, n){
	var lower = x - (z * (s / Math.sqrt(n)));
	document.getElementById("low").value = lower;
}

//confidence interval. chi squared distribution: not used. kept in the code just in case that changes.
function chiSquaredConfInt(x, n, s){
	var variance = ((n-1)(s*s))/(x);
	var sd = Math.sqrt(variance);
}