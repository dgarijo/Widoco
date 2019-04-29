package widoco.gui;

import java.awt.Dimension;
import java.util.ArrayList;
import java.util.Iterator;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import widoco.Configuration;
import widoco.entities.Agent;
import widoco.entities.License;
import widoco.entities.Ontology;

/**
 *
 * @author Daniel Garijo
 */
public class EditProperty extends javax.swing.JFrame {

    public enum PropertyType{authors, contributors, publisher, extended, imported, license};
    private final GuiStep2 step2Gui;
    private final Configuration c;
    private final PropertyType type;
    /**
     * Creates new form TestForAgents
     * @param g pointer to the father form
     * @param c configuration pointer to store all the changes
     * @param p type of property to edit: authors, contributors, etc
     */
    public EditProperty(GuiStep2 g, Configuration c, PropertyType p) {
        initComponents();
        Dimension dim = java.awt.Toolkit.getDefaultToolkit().getScreenSize();
        // Determine the new location of the window
        int w = this.getSize().width;
        int h = this.getSize().height;
        int x = (dim.width-w)/2;
        int y = (dim.height-h)/2;

        //Move the window
        this.setLocation(x, y);
        this.step2Gui = g;
        this.c = c; //needed because for authors/contributors we are going to load additional stuff
        this.type = p;
        //The properties have to correspon to those in the config
        switch(type){
            case authors:
                this.setTitle("Editing Authors");
                this.addRowButton.setText("Add author...");
                this.deleteRowButton.setText("Delete author...");
                createTable(new String[]{"Name","URI","Institution Name", "Institution URI"});
                loadAgents(c.getMainOntology().getCreators());
                break;
            case contributors:
                this.setTitle("Editing Contributors");
                this.addRowButton.setText("Add contributor...");
                this.deleteRowButton.setText("Delete contributor...");
                createTable(new String[]{"Name","URI","Institution Name", "Institution URI"});
                loadAgents(c.getMainOntology().getContributors());
                break;
            case publisher:
                this.setTitle("Editing Publisher");
                createTable(new String[]{"Name","URI","Institution Name","Institution URI"});
                this.addRowButton.setEnabled(false);
                this.deleteRowButton.setEnabled(false);
                ArrayList<Agent> aux = new ArrayList<Agent>();
                aux.add(c.getMainOntology().getPublisher());
                loadAgents(aux);
                break;
            case extended: 
                this.setTitle("Editing Extended Ontologies");
                this.addRowButton.setText("Add ontology...");
                this.deleteRowButton.setText("Delete ontology...");
                createTable(new String[]{"Extended Ontology Name","Extended Ontology URI"});
                loadOntologies(c.getMainOntology().getExtendedOntologies());
                break;
            case imported: 
                this.setTitle("Editing Imported Ontologies");
                this.addRowButton.setText("Add ontology...");
                this.deleteRowButton.setText("Delete ontology...");
                createTable(new String[]{"Imported Ontology Name","Imported Ontology URI"});
                loadOntologies(c.getMainOntology().getImportedOntologies());
                break;
            case license:
                this.setTitle("Editing License");
                this.addRowButton.setText("Add license...");
                this.deleteRowButton.setText("Delete license...");
                createTable(new String[]{"License Name","License URI", "License Logo URL"});
                loadLicense(c.getMainOntology().getLicense());
                break;
        }
    }

    private void createTable(String[] columns){
        tableProperties.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
            },
            columns
        ) {});
    }
    
    private void loadAgents(ArrayList<Agent> ag){
        Iterator<Agent> it = ag.iterator();
        while (it.hasNext()) {
            Agent currentAg = it.next();
            Object[] row = new Object[]{currentAg.getName(),currentAg.getURL(),currentAg.getInstitutionName(), currentAg.getInstitutionURL()};
            ((DefaultTableModel)tableProperties.getModel()).addRow(row);
        }
    }
    
    private void loadOntologies (ArrayList<Ontology> ont){
        Iterator<Ontology> it = ont.iterator();
        while (it.hasNext()) {
            Ontology currentOnt = it.next();
            Object[] row = new Object[]{currentOnt.getName(),currentOnt.getNamespaceURI()};
            ((DefaultTableModel)tableProperties.getModel()).addRow(row);
        }
    }
    
    private void loadLicense (License l){
        Object[] row = new Object[]{l.getName(),l.getUrl(), l.getIcon()};
        ((DefaultTableModel)tableProperties.getModel()).addRow(row);
        this.addRowButton.setEnabled(false);
        this.deleteRowButton.setEnabled(false);
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jScrollPane1 = new javax.swing.JScrollPane();
        tableProperties = new javax.swing.JTable();
        addRowButton = new javax.swing.JButton();
        deleteRowButton = new javax.swing.JButton();
        cancelButton = new javax.swing.JButton();
        okButton = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);
        setTitle("Complete the table");
        setAlwaysOnTop(true);

        tableProperties.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null},
                {null, null, null},
                {null, null, null},
                {null, null, null}
            },
            new String [] {
                "Name", "URI", "Institution"
            }
        ));
        jScrollPane1.setViewportView(tableProperties);
        if (tableProperties.getColumnModel().getColumnCount() > 0) {
            tableProperties.getColumnModel().getColumn(0).setResizable(false);
            tableProperties.getColumnModel().getColumn(1).setResizable(false);
            tableProperties.getColumnModel().getColumn(2).setResizable(false);
        }

        addRowButton.setText("Add Row ...");
        addRowButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addRowButtonActionPerformed(evt);
            }
        });

        deleteRowButton.setText("Delete Row ...");
        deleteRowButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                deleteRowButtonActionPerformed(evt);
            }
        });

        cancelButton.setText("Cancel");
        cancelButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cancelButtonActionPerformed(evt);
            }
        });

        okButton.setText("Ok");
        okButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                okButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 603, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addComponent(addRowButton)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(deleteRowButton)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(okButton, javax.swing.GroupLayout.PREFERRED_SIZE, 69, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(cancelButton, javax.swing.GroupLayout.PREFERRED_SIZE, 79, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(8, 8, 8))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 160, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(addRowButton)
                    .addComponent(deleteRowButton)
                    .addComponent(cancelButton)
                    .addComponent(okButton))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void addRowButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addRowButtonActionPerformed
        Object[] row;
        if(type.equals(PropertyType.authors)||type.equals(PropertyType.contributors)){
            row = new Object[]{"","",""};
        }else{//ontologies
            row = new Object[]{"",""};
        }
        ((DefaultTableModel)tableProperties.getModel()).addRow(row);
    }//GEN-LAST:event_addRowButtonActionPerformed

    private void cancelButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cancelButtonActionPerformed
        this.dispose();
    }//GEN-LAST:event_cancelButtonActionPerformed

    private void okButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_okButtonActionPerformed
        //save stuff according to the type and close
        switch(this.type){
            case authors:this.c.getMainOntology().setCreators(getAgentsFromTable());
                break;
            case contributors:this.c.getMainOntology().setContributors(getAgentsFromTable());
                break;
            case publisher:this.c.getMainOntology().setPublisher(getAgentsFromTable().get(0));
                break;
            case extended:this.c.getMainOntology().setExtendedOntologies(getOntologiesFromTable());
                break;
            case imported:this.c.getMainOntology().setImportedOntologies(getOntologiesFromTable());
                break;
            case license:this.c.getMainOntology().setLicense(getLicenseFromTable());
        }
        this.step2Gui.refreshPropertyTable();
        this.dispose();
    }//GEN-LAST:event_okButtonActionPerformed

    private ArrayList<Agent> getAgentsFromTable(){
        ArrayList<Agent> agents = new ArrayList<Agent>();
        for(int row = 0;row < tableProperties.getRowCount();row++) {
            String agentName = (String)tableProperties.getValueAt(row, 0);
            String agentURI = (String)tableProperties.getValueAt(row,1);
            String agentInstitution = (String)tableProperties.getValueAt(row,2);
            String agentInstitutionURI = (String)tableProperties.getValueAt(row,3);
            if((agentName!=null &&!agentName.equals("")) || (agentURI!=null && !agentURI.equals(""))){
                if(agentName==null || agentName.equals("")){
                    agentName = "agent"+row;
                }
                Agent a = new Agent(agentName, agentURI, agentInstitution, agentInstitutionURI);            
                agents.add(a);
            }
        }
        return agents;
    }
    
    private ArrayList<Ontology> getOntologiesFromTable(){
        ArrayList<Ontology> ontos = new ArrayList<Ontology>();
        for(int row = 0;row < tableProperties.getRowCount();row++) {
            String ontologyName = (String)tableProperties.getValueAt(row, 0);
            String ontologyURI = (String)tableProperties.getValueAt(row,1);
            if(!ontologyName.equals("") || !ontologyURI.equals("")){
                if(ontologyName.equals("")){
                    ontologyName = ontologyURI;
                }
                Ontology o = new Ontology(ontologyName, "", ontologyURI);
                ontos.add(o);
            }
        }
        return ontos;
    }
    
    private License getLicenseFromTable() {
        String licName = (String)tableProperties.getValueAt(0, 0);
        String licURI = (String)tableProperties.getValueAt(0,1);
        String licLogo = (String)tableProperties.getValueAt(0,2);
        return new License(licURI, licName, licLogo);
    }
    
    private void deleteRowButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_deleteRowButtonActionPerformed
        if(tableProperties.getSelectedRow()!=-1){
            if(JOptionPane.showConfirmDialog(this, 
                    "Are you sure you want to delete the property?", "Confirm", 
                    JOptionPane.YES_NO_OPTION)==JOptionPane.YES_OPTION)
            {
                while(tableProperties.getSelectedRowCount()>0){
                    this.deleteSelectedRow(tableProperties.getSelectedRow());
                }
            }
        }
    }//GEN-LAST:event_deleteRowButtonActionPerformed

    private void deleteSelectedRow(int rowNumber){
        ((DefaultTableModel)tableProperties.getModel()).removeRow(rowNumber);
    }
    /**
     * @param args the command line arguments
     */
//    public static void main(String args[]) {
//        /* Set the Nimbus look and feel */
//        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
//        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
//         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
//         */
//        try {
//            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
//                if ("Nimbus".equals(info.getName())) {
//                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
//                    break;
//                }
//            }
//        } catch (ClassNotFoundException ex) {
//            java.util.logging.Logger.getLogger(EditProperty.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (InstantiationException ex) {
//            java.util.logging.Logger.getLogger(EditProperty.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (IllegalAccessException ex) {
//            java.util.logging.Logger.getLogger(EditProperty.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
//            java.util.logging.Logger.getLogger(EditProperty.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        }
//        //</editor-fold>
//
//        /* Create and display the form */
//        java.awt.EventQueue.invokeLater(new Runnable() {
//            public void run() {
//                Configuration config = new Configuration();
//                Agent a = new Agent("Dani","http://bananen", "oeg","");
//                Agent a2 = new Agent("Dani2","http://bananen", "oeg","");
//                Agent a3 = new Agent("Dani3","http://bananen", "oeg","");
//                
//                Ontology o1 = new Ontology("blah", "ble","bli");
//                
//                ArrayList<Agent> creators = new ArrayList();
//                
//                creators.add(a);
//                creators.add(a2);
//                creators.add(a3);
//                
//                ArrayList<Ontology> onto = new ArrayList();
//                onto.add(o1);
//                config.setCreators(creators);
//                config.setExtendedOntologies(onto);
//                new EditProperty(null, config, PropertyType.extended).setVisible(true);
//            }
//        });
//    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton addRowButton;
    private javax.swing.JButton cancelButton;
    private javax.swing.JButton deleteRowButton;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JButton okButton;
    private javax.swing.JTable tableProperties;
    // End of variables declaration//GEN-END:variables
}
