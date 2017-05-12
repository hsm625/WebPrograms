package edu.umsl.java.web;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.UnavailableException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.umsl.java.bean.Account;

@WebServlet("/Signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;
	private PreparedStatement results;
	private PreparedStatement dataSend;

	public void init(ServletConfig config) throws ServletException {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/mathprobs", "root", "");

			results = connection.prepareStatement("SELECT username, password, create_time "
					+ "FROM user ORDER BY create_time");
		} catch (Exception exception) {
			exception.printStackTrace();
			throw new UnavailableException(exception.getMessage());
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		List<Account> accounts = new ArrayList<Account>();
		
		RequestDispatcher dispatcher = 
                request.getRequestDispatcher("list.jsp");

		try {
			ResultSet resultsRS = results.executeQuery();

			while (resultsRS.next()) {
				Account prob = new Account();

				prob.setUName(resultsRS.getString(1));
				prob.setPWord(resultsRS.getString(2));

				accounts.add(prob);
			}
			
			request.setAttribute("accounts", accounts);

		} catch (SQLException sqlException) {
			sqlException.printStackTrace();
		}
		
		dispatcher.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		List<Account> accounts = new ArrayList<Account>();
		RequestDispatcher dispatcher = 
                request.getRequestDispatcher("list.jsp");
		
		boolean isfree = true;
		String uname = request.getParameter("username2");
		String pword = request.getParameter("password2");
		String pcnfrm = request.getParameter("repeat password");
		
		try {
			dataSend = connection.prepareStatement("SELECT * FROM user WHERE username = \""
						+ uname + "\";");
			
			ResultSet resultsRS = dataSend.executeQuery();

			while (resultsRS.next()) {
				Account user = new Account();

				user.setUName(resultsRS.getString(1));
				user.setPWord(resultsRS.getString(2));

				if(user.getUName().equals(uname)){
					isfree = false;
				}
			}
			request.setAttribute("Continue", isfree);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(isfree && pword.equals(pcnfrm)){
			try {
				dataSend = connection.prepareStatement("INSERT INTO user (username, password) " + 
							"VALUES ('" + uname + "', '" + pword + "');");
				dataSend.executeUpdate();
			
				ResultSet resultsRS = results.executeQuery();

				while (resultsRS.next()) {
					Account user = new Account();

					user.setUName(resultsRS.getString(1));
					user.setPWord(resultsRS.getString(2));

					accounts.add(user);
				}
			
				request.setAttribute("accounts", accounts);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else{
			System.out.println("Error: Username is taken or Passwords did not match.");
		}
		dispatcher.forward(request, response);
	}

	public void destroy() {

		try {
			results.close();
			connection.close();
		} catch (SQLException sqlException) {
			sqlException.printStackTrace();
		}
	}

}

