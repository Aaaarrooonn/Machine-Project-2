

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Start
 */
@WebServlet("/Start")
public class Start extends HttpServlet {
	private static final long serialVersionUID = 1L;
       	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Start() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Cookie[] cookies = request.getCookies();
	    
	    if(cookies != null) {
		    for (int i = 0; i < cookies.length; i++) {
	            if((cookies[i].getName()).compareTo("username") == 0 || (cookies[i].getName()).compareTo("password") == 0) {
	            	request.getRequestDispatcher("FinalMP/index.html").forward(request, response);
	            	return;
	            }
	            else {
	            	request.getRequestDispatcher("select.jsp").forward(request, response);
	            	return;
	            }
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
			request.getRequestDispatcher("loginform.jsp").forward(request, response);
		}else if(action.equals("REGISTER")){
			request.getRequestDispatcher("registerform.jsp").forward(request, response);
		}else if(action.equals("ENTER AS GUEST")) {
			request.getRequestDispatcher("FinalMP/index.html").forward(request, response);
		}	 
	}
}
