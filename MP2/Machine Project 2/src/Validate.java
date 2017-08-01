import java.sql.*;

public class Validate {
	public static boolean checkUser(String username, String password) {
		boolean result = false;
		
		try{
		         Class.forName("com.mysql.jdbc.Driver");
		         DriverManager.registerDriver(new com.mysql.jdbc.Driver ());
		         Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mp2","root","password");
		         PreparedStatement ps = con.prepareStatement("select * from users where Username = ? and Password = ?");
		         ps.setString(1, username);
		         ps.setString(2, password);
		         ResultSet rs = ps.executeQuery();
		         result = rs.next();
		        
		      }catch(Exception e)
		      {
		          e.printStackTrace();
		      }
		return result;  
	}
	
	public static boolean checkUser(String username) {
		boolean result = false;
		
		try{
		         Class.forName("com.mysql.jdbc.Driver");
		         DriverManager.registerDriver(new com.mysql.jdbc.Driver ());
		         Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mp2","root","password");
		         PreparedStatement ps = con.prepareStatement("select * from users where Username = ?");
		         ps.setString(1, username);
		         ResultSet rs = ps.executeQuery();
		         result = rs.next();
		        
		      }catch(Exception e)
		      {
		          e.printStackTrace();
		      }
		return result;  
	}
}
