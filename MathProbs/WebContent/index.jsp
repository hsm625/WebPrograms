<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>List Math Problems</title>
<script type="text/javascript"
	src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
	
</script>
<script type="text/javascript">
	window.MathJax = {
		tex2jax : {
			inlineMath : [ [ '$', '$' ], [ "\\(", "\\)" ] ],
			processEscapes : true
		}
	};

	function doLogin() {
		document.getElementById('logdiv').style.display = "block";
		document.getElementById('LISU').style.display = "none";
	}
	function doSignUp() {
		document.getElementById('SUdiv').style.display = "block";
		document.getElementById('LISU').style.display = "none";
	}
</script>
</head>
<body>
	<%
		
	%>
<form id="LISU" action="ListProbServlet" method="post">
	<input id="log" type="button" onclick="doLogin()" value="Log In">
	<input id="sign" type="button" onclick="doSignUp()" value="Sign Up">
</form>
<form action="ListProbServlet" method="post">
<textarea name="mathprob" rows="8" cols="50"></textarea>
<p></p>
<input type="submit" value="Submit">
<input type="reset" value="Reset">
</form>
<a href="ListProbServlet">List</a>

</body>
</html>