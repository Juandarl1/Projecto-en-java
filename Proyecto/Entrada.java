import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import javax.swing.JButton;
import javax.swing.JPasswordField;
import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.DefaultComboBoxModel;
import java.awt.Color;
import java.awt.Font; 
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.JPanel;
import javax.swing.BoxLayout;
import java.awt.BorderLayout;
import javax.swing.ImageIcon;
import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.io.*;
import java.net.URL;

import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JCheckBox;


public class Entrada extends JFrame {
  
        private JLabel LblTitle, LblImg, LblFecha, LblNombre, LblKilos, LblTotal;
        private JButton BtnRegistar, BtnExit;
        private JCheckBox JCheckLavado, JCheckSecado, JCheckPlanchado;
        private JComboBox comboboxOtros;
        private JTextField JTextNombre, JTextFecha, JTextKilos, JTextTotal;


  public Entrada()   
  {             
      super("Software de facturacion");
  getContentPane().setLayout(null);

  LblTitle = new JLabel("Registro");
  LblTitle.setFont(new Font("Verdama",Font.BOLD,34));       
  LblTitle.setBounds(500,10,170,80);
  LblTitle.setBackground(Color.RED);
  LblTitle.setOpaque(true);

  
  ImageIcon imagen = new ImageIcon("Logo.jpg");
  LblImg = new JLabel(imagen); 
  LblImg.setBounds(750,0,550,550);  
  LblImg.setIcon(new ImageIcon(getClass().getResource("Logo.jpg")));
   LblImg.setBackground(Color.RED);
  LblImg.setOpaque(true);
  
  LblFecha = new JLabel("Fecha");
  LblFecha.setBounds(80,300,100,80);
  
  LblNombre = new JLabel("Nombre");
  LblNombre.setBounds(80,200,100,80);
  
  LblKilos = new JLabel("Servicio");
  LblKilos.setBounds(80,230,100,80);
  
  LblTotal = new JLabel("Total");
  LblTotal.setBounds(80,260,100,80);

  BtnRegistar  =  new JButton ("Registar");             
  BtnRegistar.setBounds(200,400,120,100); 

  BtnExit  =  new JButton ("Salir");             
  BtnExit.setBounds(600,500,120,100);


  getContentPane().add(LblTitle);
  getContentPane().add(LblImg);
  getContentPane().add(LblFecha);
  getContentPane().add(LblNombre);
  getContentPane().add(LblKilos);
  getContentPane().add(LblTotal);
  getContentPane().add(BtnRegistar);
  getContentPane().add(BtnExit);


  
 


  setExtendedState(6);
  setVisible(true);
  
  
       BtnExit.addActionListener(new ActionListener() {
 
            public void actionPerformed(ActionEvent e)
            {
Ventana RunVentana = new Ventana();
RunVentana.setVisible(true); 
setVisible(false);
}
});  
  

  }   



  }