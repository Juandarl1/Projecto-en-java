
import javax.swing.JFrame; 
import javax.swing.JLabel; 
import javax.swing.JTextField; 
import javax.swing.JButton; 
import javax.swing.JPasswordField; 
import javax.swing.JOptionPane; 
import java.awt.Font;   
import javax.swing.ImageIcon;
import java.awt.Container;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Login {
 
    private static void RunLogin()  {
        
        
       
        JFrame FormLogin = new JFrame(" FACTURAPP ");
        FormLogin.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        JLabel LblTitle, LblUser, LblPass, LblCargo, LblImg;
        JTextField TxtUser, TxtEmp; 
        JPasswordField TxtPass;    
        JButton BtnOk, BtnCancel; 
 
         
    
  LblTitle = new JLabel(" Acceso a la aplicacion ");
  LblTitle.setFont(new Font("Verdama",Font.BOLD,34));        
  LblTitle.setBounds(140,10,450,80); 
  
  ImageIcon imagen = new ImageIcon("Logo.png");
  LblImg = new JLabel(imagen);  
  LblImg.setBounds(0,0,550,550);     
  
  
  LblUser = new JLabel("Usuario");
  LblUser.setFont(new Font("Verdama",Font.BOLD,14));        
  LblUser.setBounds(100,130,150,30); 
  
  LblPass = new JLabel("Contraseña");  
  LblPass.setFont(new Font("Verdama",Font.BOLD,14));     
  LblPass.setBounds(100,190,150,30);
  
  LblCargo = new JLabel("Empresa");  
  LblCargo.setFont(new Font("Verdama",Font.BOLD,14));     
  LblCargo.setBounds(100,250,150,30);
 
  TxtUser = new JTextField(15);
  TxtUser.setBounds(220,130,150,30);     
  TxtUser.setText("admin");
  
  TxtPass = new JPasswordField(15);   
  TxtPass.setBounds(220,190,150,30);       
  TxtPass.setText("1234");
  
    TxtEmp = new JTextField(15);
  TxtEmp.setBounds(220,250,150,30);     
  TxtEmp.setText("Tigo une");
  

  BtnOk  =  new JButton ("Aceptar"); 
  BtnOk.setBounds(100,300,120,70);  
  
  BtnCancel  =  new JButton ("Cancelar");   
  BtnCancel.setBounds(250,300,120,70);
  

  
  Container contenedor;
  contenedor = FormLogin.getContentPane();
  contenedor.setLayout(null);
  
  
        FormLogin.getContentPane().add(LblTitle);
        FormLogin.getContentPane().add(LblUser);   
        FormLogin.getContentPane().add(LblPass);
        FormLogin.getContentPane().add(TxtUser);
        FormLogin.getContentPane().add(TxtPass);
        FormLogin.getContentPane().add(LblCargo);
        FormLogin.getContentPane().add(BtnOk);
        FormLogin.getContentPane().add(BtnCancel);
        FormLogin.getContentPane().add(LblImg);
        FormLogin.getContentPane().add(TxtEmp);
        
     
        
        FormLogin.pack();
        FormLogin.setVisible(true);
    
        FormLogin.setExtendedState(6);
        
        
                
        
        

        BtnOk.addActionListener(new ActionListener() {
 
            public void actionPerformed(ActionEvent e)
            {
                

                char Pass[]=TxtPass.getPassword();
                String PassDefinido = new String(Pass);
                
      if( TxtUser.getText().equals("admin") && PassDefinido.equals("1234") ){           

      JOptionPane.showMessageDialog(null,"Bienvenido Has ingresado satisfactoriamente al sistema");
Ventana NuevaVentana = new Ventana();

NuevaVentana.setVisible(true); 
FormLogin.setVisible(false); 
}
  else  {
  if( !TxtUser.getText().equals("admin") )
  JOptionPane.showMessageDialog(null,"USUARIO INCORRECTO");
  else
  if( !TxtPass.getPassword().equals("123") )
  JOptionPane.showMessageDialog(null,"CONTRASEÑA INCORRECTO");
  }                                         
                      
            }
        });  
        
        
        
    }
    
   
              
 
 
 
       public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                RunLogin();
            }
        });
        
      
 
   

 
        
        
        
        
        
        
    }
    
    
}