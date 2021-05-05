import javax.swing.JFrame;
import javax.swing.JLabel;

import javax.swing.JButton;

import java.awt.Color;
import java.awt.Font; 
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JPanel;
import javax.swing.BoxLayout;
import java.awt.BorderLayout;
import javax.swing.ImageIcon;




public class Ventana extends JFrame {
  
        private JLabel LblTitle, LblImg;

        private JButton BtnEntrada, BtnSalida;   


      
  public Ventana()   
  {             
      super("Software de facturacion");
  getContentPane().setLayout(null);


  LblTitle = new JLabel("Bienvenido al Sistema");
  LblTitle.setFont(new Font("Verdama",Font.BOLD,34));       
  LblTitle.setBounds(140,10,450,80);

  ImageIcon imagen = new ImageIcon("Logo.jpg");
  LblImg = new JLabel(imagen); 
  LblImg.setBounds(0,0,550,550);   
  LblImg.setIcon(new ImageIcon(getClass().getResource("Logo.jpg")));
 
 
  


  BtnEntrada  =  new JButton ("Entrada de Prendas");             
  BtnEntrada.setBounds(100,400,180,100); 

  BtnSalida  =  new JButton ("Salida de Prendas");             
  BtnSalida.setBounds(300,400,180,100);


  getContentPane().add(LblTitle);

  getContentPane().add(BtnEntrada);
  getContentPane().add(BtnSalida);
  getContentPane().add(LblImg);

  

  String[] JCombo = {"Administrador", "Ursula", "Mariela"
                ,"Veronica", "Magaly", "Nikol", "Stefany"};


  
 

  setSize(900,600);
  setExtendedState(6);
   
  setVisible(true);
  
     BtnSalida.addActionListener(new ActionListener() {
 
            public void actionPerformed(ActionEvent e)
            {
Salida RunSalida = new Salida();
RunSalida.setVisible(true); 
setVisible(false);
}
}); 

     BtnEntrada.addActionListener(new ActionListener() {
 
            public void actionPerformed(ActionEvent e)
            {
Entrada RunEntrada = new Entrada();
RunEntrada.setVisible(true); 
setVisible(false);
}
}); 

  }
  




  }
