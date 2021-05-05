import javax.swing.JLabel;
import javax.swing.JFrame;
import javax.swing.Icon;
import javax.swing.*;
public class Fhechas extends JFrame{
    private JTextField textfield1;
    private JScrollPane scrollpane1;
    private JButton boton1,boton2;
    private JTextArea textarea1;
    public Fhechas() {
        
        setLayout(null);
        textfield1=new JTextField();
        textfield1.setBounds(10,10,200,30);
        add(textfield1);
        textarea1=new JTextArea();
        textarea1.setBounds(10,50,400,300);
        add(textarea1);
        scrollpane1=new JScrollPane(textarea1);    
        scrollpane1.setBounds(10,50,400,300);
        add(scrollpane1);
        
        boton1=new JButton("Continuar");
	    boton1.setBounds(10,370,180,30);
	    add(boton1);
	    
	    boton2=new JButton("Salir");
	    boton2.setBounds(250,370,140,30);
	    add(boton2);
	
        
    }

    public static void main(String[] ar) {
        Fhechas formulario1=new Fhechas();
        formulario1.setBounds(10,10,500,450);
        formulario1.setVisible(true);
    }    
}