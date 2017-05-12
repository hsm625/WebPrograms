/*calculations.js*/

//makes sure the entries are valid
function checkdata(x){
	var dom = x;
	var val = dom.search(/[-+]?\d+$/);
	var val2 = dom.search(/\d+$/);
	var val3 = dom.search(/^[-+]?[0-9]+\.[0-9]+$/);
	if (val == 0 || val2 == 0 || val3 == 0)
	{
		return 1;
	}
	else
	{
		alert("invalid number");
		return 0;
	}
}

//---------------------------------------------------------------

//finds the probability of a value being less than the one specified
function pLessThanXnorm(x, m, s)
{
	var p = (x-m)/s;
	var rowId;
	var colStep1 = Math.round(p * 100);
	var colStep2 = Math.abs(colStep1 % 10);
	var row;

	//reads the table to find the correct probability based on the calculations made.
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

//---------------------------------------------------------------

//finds the probability of a value being greater than one specified
function pGreaterThanXnorm(x, m, s)
{
	//finds the z value corresponding to the value entered.
	var p = (x-m)/s;
	var rowId;
	var colStep1 = Math.round(p * 100);
	var colStep2 = Math.abs(colStep1 % 10);
	var row;

	//reads the table to find the correct probability based on the calculations made.
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

//---------------------------------------------------------------

//finds the probability of a value being between two numbers
function inbetween(low, up, m, s){
	//the probability of a value being a < Z < b == p(x<b) - p(x<a)
	return pLessThanXnorm(up, m, s) - pLessThanXnorm(low, m, s);
}

//---------------------------------------------------------------

//confidence interval. same formula for T distribution. this is the two sided confidence interval for the population average.
function confidenceInterval(x, z, s, n){
	var lower = x - (Math.abs(z) * (s / Math.sqrt(n)));
	var upper = x + (Math.abs(z) * (s / Math.sqrt(n)));
	document.getElementById("low").value = lower;
	document.getElementById("up").value = upper;
}

//---------------------------------------------------------------

//one sided confidence interval. upper bounded
function confidenceIntervalUp(x, z, s, n){
	var upper = x + (Math.abs(z) * (s / Math.sqrt(n)));
	document.getElementById("up").value = upper;
}

//---------------------------------------------------------------

//one sided confidence interval. lower bounded
function confidenceIntervalLow(x, z, s, n){
	var lower = x - (Math.abs(z) * (s / Math.sqrt(n)));
	document.getElementById("low").value = lower;
}

//---------------------------------------------------------------

//implements the javascript for normal probability page one.
function calculatePgOne(){
	//alert("communicating with javascript");
	//retrieves the input and converts it into a number
	var low = document.getElementById("lb").value;
	var high = document.getElementById("ub").value;
	var avg = document.getElementById("avg").value;
	var sd = document.getElementById("dev").value;
	alert(low + " " + high + " " + avg + " " + sd);
	var l = Number(low);
	var h = Number(high);
	var a = Number(avg);
	var s = Number(sd);
	alert(l + " " + h + " " + a + " " + s);
	//validates the input
	if(h < l){
		alert("reverse the upper and lower bounds");
		return false;
	}
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
	
	//checks to see if one of the boxes, lower or upper, was left blank. if so, preforms calculations accordingly. if both are blank, alert the user and return false
	if(low != "" && high == ""){
		//alert("lower");
		if(checkdata(low) == 0){
			alert("lower value is not a valid number.");
			return false;
		}
		else{
			document.getElementById("ans").value = pGreaterThanXnorm(l, a, s);
			return true;
		}
	}
	if(low == "" && high != ""){
		//alert("upper");
		if(checkdata(high) == 0){
			alert("upper value is not a valid number.");
			return false;
		}
		else{
			document.getElementById("ans").value = pLessThanXnorm(h, a, s);
			return true;
		}
	}
	if(low != "" && high != ""){
		//alert("double");
		if(checkdata(low) == 0){
			alert("lower value is not a valid number.");
			return false;
		}
		if(checkdata(high) == 0){
			alert("upper value is not a valid number.");
			return false;
		}
		else{
			alert(l + " " + h + " " + a + " " + s);
			document.getElementById("ans").value = inbetween(l, h, a, s);
			return true;
		}
	}
	else{
		alert("no values entered for the upper and lower bounds. please enter a number.");
		return false;
	}
}

//---------------------------------------------------------------

//implements the code for page two and three. the difference between the two is two uses population standard deviation and Z value. three uses sample standard deviation and T value.
function calculatePgTwoThreeDoubleSided(){
	//alert("communicating with javascript");
	var avg = document.getElementById("sa").value;
	var ZT = document.getElementById("zt").value;
	var size = document.getElementById("ss").value;
	var sd = document.getElementById("dev").value;
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
	if(checkdata(ZT) == 0){
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
		if(document.getElementById("two").checked){
			//alert("two");
			confidenceInterval(a, z, s, n);
			return true;
		}
		if(document.getElementById("upb").checked){
			//alert("upper");
			document.getElementById("low").value = "";
			confidenceIntervalUp(a, z, s, n);
			return true;
		}
		if(document.getElementById("lowb").checked){
			//alert("lower");
			document.getElementById("up").value = "";
			confidenceIntervalLow(a, z, s, n);
			return true;
		}
		else{
			alert("Please select either upper bound, lower bound, or two sided confidence interval");
			return false;
		}
	}
}