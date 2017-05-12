<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="edu.umsl.java.bean.*"%>
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
<style type="text/css">
body {background-color:green;}
div {background-color:white;
	 margin: 10px;
	 padding: 5px;
	 border: 3px solid black;}
table {
	 border: 2px double black;
	 padding: 5px;}
th, td {
	 background-color:white;
	 border: 1px solid black;
	 padding: 5px;}
</style>
</head>
<body>
	<%
		//the following text should not show up after loging in. it also goes away once a button is selected.
		if ((request.getAttribute("Continue") == null || !(boolean) request.getAttribute("Continue"))
				&& request.getAttribute("problist") == null) {
	%>
	<form id="LISU" action="ListProbServlet" method="post">
		<input id="log" type="button" onclick="doLogin()" value="Log In">
		<input id="sign" type="button" onclick="doSignUp()" value="Sign Up">
	</form>
	<%
		}
	%>
	<!-- available once login is selected -->
	<div id="logdiv" style="display: none">
		<form id="LI" action="Login" method="post">
			Username: <input type="text" name="username1"><br>
			Password: <input type="password" name="password1"><br>
			<p></p>
			<input type="submit" value="Submit"> <input type="reset"
				value="Reset">
		</form>
	</div>

	<!-- available once Sign up is selected -->
	<div id="SUdiv" style="display: none">
		<form id="SU" action="Signup" method="post">
			<!-- <textarea name="username2" rows="1" cols="20">username</textarea> -->
			Username: <input type="text" name="username2"><br>
			Password: <input type="password" name="password2"><br>
			Repeat Password: <input type="password" name="repeat password">
			<p></p>
			<input type="submit" value="Submit"> <input type="reset"
				value="Reset">
		</form>
	</div>
	<%
		//if the login was successful, continue.
		if (request.getAttribute("Continue") != null && (boolean) request.getAttribute("Continue")
				|| request.getAttribute("problist") != null) {
	%>
	<div>
	<p>Insert the ppid of an item below to delete it from the list.</p>
	<form id="delete" action="DeleteServlet" method="post">
		<!-- style="display: none"> -->
		<textarea name="ppid" rows="1" cols="6"></textarea>
		<p></p>
		<input type="submit" value="Submit"> <input type="reset"
			value="Reset">
	</form>
	<p></p>
	<p>Insert an item below to add it to the list</p>
	<form id="insert" action="ListProbServlet" method="post">
		<!-- style="display: none"> -->
		<textarea name="mathprob" rows="8" cols="50"></textarea>
		<p></p>
		<input type="submit" value="Submit"> <input type="reset"
			value="Reset">
	</form>
	</div>
	<br />
	<%
		//retrieve the list of problems and make a table with them.
		if (request.getAttribute("problist") != null) {
				List<Problem> myproblist = (List<Problem>) request.getAttribute("problist");
	%>
	<table>
		<tr>
			<th>PPID</th>
			<th>Problem</th>
		</tr>
		<%
			for (Problem prob : myproblist) {
		%>
		<tr>
			<td><%=prob.getPpid()%></td>
			<td><%=prob.getContent()%></td>
		</tr>
		<%
			}
		}
		else{
		%>
		<a href="ListProbServlet">show list</a>
		<%
		}
		}
		%>
	</table>
</body>
</html>