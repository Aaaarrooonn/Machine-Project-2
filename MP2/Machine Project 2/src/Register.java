

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();  
       
		String username = request.getParameter("username");  
		String password = request.getParameter("password");  
		String description = request.getParameter("description");  
		
		if(Validate.checkUser(username) == false && username != null) {
			try{  
				Class.forName("com.mysql.jdbc.Driver");  
				DriverManager.registerDriver(new com.mysql.jdbc.Driver ());
				Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mp2","root","password");  
				  
				PreparedStatement ps = con.prepareStatement("insert into users(Username, Password, Description) values(?,?,?)");  
				  
				ps.setString(1, username);  
				ps.setString(2, password);  
				ps.setString(3, description);    
				          
				int i = ps.executeUpdate();  
				
				if(i > 0)  
					request.getRequestDispatcher("select.jsp").forward(request, response);  
				}catch (Exception e2) {
					System.out.println(e2);
				}  
				          
				out.close(); 
		} else {
				request.setAttribute("errorMessage", "Username invalid or already taken. Try again.");
				request.getRequestDispatcher("registerform.jsp").forward(request, response);
			}
	
	}
}
	


