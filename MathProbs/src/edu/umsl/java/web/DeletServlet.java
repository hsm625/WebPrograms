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

import edu.umsl.java.bean.Problem;

@WebServlet("/DeleteServlet")

public class DeletServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Connection connection;
	private PreparedStatement results;
	private PreparedStatement dataSend;

	public void init(ServletConfig config) throws ServletException {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/mathprobs", "root", "");

			results = connection.prepareStatement("SELECT ppid, content "
					+ "FROM practice_problem ORDER BY ppid");
		} catch (Exception exception) {
			exception.printStackTrace();
			throw new UnavailableException(exception.getMessage());
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		List<Problem> problist = new ArrayList<Problem>();
			
		RequestDispatcher dispatcher = request.getRequestDispatcher("list.jsp");

		try {
			ResultSet resultsRS = results.executeQuery();

			while (resultsRS.next()) {
				Problem prob = new Problem();

				prob.setPpid(resultsRS.getInt(1));
				prob.setContent(resultsRS.getString(2));

				problist.add(prob);
			}
				
			request.setAttribute("problist", problist);

		} catch (SQLException sqlException) {
			sqlException.printStackTrace();
		}
		
		dispatcher.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		List<Problem> problist = new ArrayList<Problem>();
		RequestDispatcher dispatcher = 
                request.getRequestDispatcher("list.jsp");
		
		int ppid = Integer.valueOf(request.getParameter("ppid"));
			
		try {
			dataSend = connection.prepareStatement("DELETE from practice_problem where ppid = "
					+ ppid);
			dataSend.executeUpdate();
				
			ResultSet resultsRS = results.executeQuery();

			while (resultsRS.next()) {
				Problem prob = new Problem();

				prob.setPpid(resultsRS.getInt(1));
				prob.setContent(resultsRS.getString(2));

					problist.add(prob);
			}
			
			request.setAttribute("problist", problist);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
