import javax.swing.*;
import java.awt.event.*;
import javax.swing.ImageIcon;
public class Pagina_menus extends JFrame implements
ActionListener{
    private JComboBox combo1;
    private	JButton boton1,boton2,boton3;
    private JLabel imagen;
    
    
    
   
    
   	public Pagina_menus(){
		//////////////////////////////////
	setLayout(null);
	boton1=new JButton("Plantillas personalizadas");
	boton1.setBounds(30,300,180,30);
	add(boton1);
	boton1.addActionListener(this);

	boton2=new JButton("Crear Factura");
	boton2.setBounds(240,300,140,30);
	add(boton2);
	boton2.addActionListener(this);

	boton3=new JButton("Facturas hechas");
	boton3.setBounds(400,300,160,30);
	add(boton3);
	boton3.addActionListener(this);
	
	Icon icoImagen=new ImageIcon(getClass().getResource("Logo.png"));
	imagen=new JLabel(icoImagen);
	imagen.setBounds(20,10,550,550);
	add(imagen);
	
	  
	}




public void actionPerformed(ActionEvent e){
	if (e.getSource()==boton1){
		setTitle("Ver Facturas personalizadas");
	}
	if (e.getSource()==boton2){
		setTitle("Crear factura");
	}
	if (e.getSource()==boton3){
		setTitle(" ver facturas hechas");
	}
}

public static void main(String[] ar){
	Pagina_menus act1= new Pagina_menus();
	act1.setBounds(300,80,600,600);
	act1.setVisible(true);
}
}
