

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Login() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());		
		if(request.getParameter("logout") == null){
			Cookie cookie = null;
		    Cookie[] cookies = null;
		         
		    cookies = request.getCookies();  
		    
		    if( cookies != null ) {
		         for (int i = 0; i < cookies.length; i++) {
		            cookie = cookies[i];

		            if((cookie.getName()).compareTo("username") == 0 || (cookie.getName()).compareTo("password") == 0) {
		               cookie.setMaxAge(0);
		               response.addCookie(cookie);
		            }
		         }
	        request.setAttribute("Message", "Logged out");  
	        request.getRequestDispatcher("select.jsp").forward(request, response);
		    }
		}
	}
		
		
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String action = request.getParameter("action");
		
		if(action == null) {
			
		}else if(action.equals("LOGIN")) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			int hour = 3600000;
			 
			if(Validate.checkUser(username, password) == true){
				Cookie cusername = new Cookie("username", username);
				Cookie cpassword = new Cookie("password", password);
				
				response.addCookie(cusername);
				response.addCookie(cpassword);
				
				if(request.getParameter("rememberMe") != null) {
					cusername.setMaxAge(hour * 21 * 14);
					cpassword.setMaxAge(hour * 21 * 14);
				}
				request.getRequestDispatcher("FinalMP/index.html").forward(request, response);
			}	
			else {
				request.setAttribute("errorMessage", "Username or Password incorrect. Try again.");
				request.getRequestDispatcher("loginform.jsp").forward(request, response);
			}	
		}
	}
}
