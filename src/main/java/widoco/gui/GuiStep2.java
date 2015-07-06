/*
 *  Copyright 2012-2013 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

/*
 * WidocoGui2.java
 *
 * Created on 16-jun-2014, 21:38:19
 */
package widoco.gui;

import java.awt.Dimension;
import java.awt.Image;
import java.awt.Toolkit;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import javax.swing.ImageIcon;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.table.TableModel;
import widoco.Configuration;
import widoco.CreateResources;
import widoco.TextConstants;
import widoco.entities.Agent;
import widoco.entities.Ontology;

/**
 *
 * @author Daniel Garijo
 */
public class GuiStep2 extends javax.swing.JFrame {
    private final GuiController g;
//    private HashMap<String,String> properties;
    private final Configuration conf;
    
    /** Creates new form WidocoGui2
     * @param g */
    public GuiStep2(GuiController g) {
        this.g =g;
        conf = g.getConfig();
        initComponents();
        Image l = g.getConfig().getLogo().getScaledInstance(widocoLogo.getWidth(), widocoLogo.getHeight(), Image.SCALE_SMOOTH);
        widocoLogo.setIcon(new ImageIcon(l));
        this.setIconImage(g.getConfig().getLogoMini());
        
        Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

        // Determine the new location of the window
        int w = this.getSize().width;
        int h = this.getSize().height;
        int x = (dim.width-w)/2;
        int y = (dim.height-h)/2;

        // Center the window
        this.setLocation(x, y);
        this.labelStatusReading.setVisible(false);
        this.barStatus.setVisible(false);
//        properties = g.getEditableProperties();
        refreshTable();
        final GuiStep2 gAux = this;
        //events for clicking: for agents and ontologies
        tableProperties.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                if (evt.getClickCount() == 2) {//doubleclick
                    int row = tableProperties.rowAtPoint(evt.getPoint());
                    int col = tableProperties.columnAtPoint(evt.getPoint());
                    if (row >= 0 && col >= 0) {
//                        System.out.println("clicked on "+tableProperties.getModel().getValueAt(row, 0));
                        //here I should verify that the edit property form is not already editing the current property.
                        String prop = (String) tableProperties.getModel().getValueAt(row, 0);
                        EditProperty form = null;
                        if(prop.equals("authors")){
                            form = new EditProperty(gAux, conf, EditProperty.PropertyType.authors);
                        }
                        else if(prop.equals("contributors")){
                            form = new EditProperty(gAux, conf, EditProperty.PropertyType.contributors);
                        }
                        else if(prop.equals("extended ontologies")){
                            form = new EditProperty(gAux, conf, EditProperty.PropertyType.extended);
                        }
                        else if(prop.equals("imported ontologies")){
                            form = new EditProperty(gAux, conf, EditProperty.PropertyType.imported);
                        }
                        if (form!=null){
                            gAux.saveMetadata();
                            form.setVisible(true);
                        }
                    }
                }
            }
        });
    }
    
    public void refreshPropertyTable(){
//        properties = g.getEditableProperties();
        refreshTable();
    }
    
    public void stopLoadingAnimation(){
        this.barStatus.setVisible(false);
        this.barStatus.setIndeterminate(false);
        this.backButton.setEnabled(true);
        this.nextButton.setEnabled(true);
    }
    
    private void refreshTable(){
        String authors="", contributors="", imported="", extended="";
        for(Agent a: conf.getCreators()){
            if(a.getName()==null || a.getName().equals("")){
                authors+="creator; ";
            }
            else{
                authors+=a.getName()+"; ";
            }
        }
        for(Agent a: conf.getContributors()){
            if(a.getName()==null || a.getName().equals("")){
                contributors+="contributor; ";
            }
            else{
                contributors+=a.getName();
            }
        }
        for(Ontology a: conf.getImportedOntologies()){
            if(a.getName()==null || a.getName().equals("")){
                imported+="importedOnto; ";
            }
            else{
                imported+=a.getName()+"; ";
            }
        }
        for(Ontology a: conf.getExtendedOntologies()){
            if(a.getName()==null || a.getName().equals("")){
                extended+="extendedOnto; ";
            }
            else{
                extended+=a.getName()+"; ";
            }
        }
        tableProperties.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {"abstract", conf.getAbstractSection()},
                {"ontology title", conf.getTitle()},
                {"ontology name", conf.getMainOntology().getName()},
                {"ontology prefix", conf.getMainOntology().getNamespacePrefix()},
                {"ontology ns URI", conf.getMainOntology().getNamespaceURI()},
                {"date of release", conf.getReleaseDate()},
                {"this version URI", conf.getThisVersion()},
                {"latest version URI", conf.getLatestVersion()},
                {"previous version URI", conf.getPreviousVersion()},
                {"ontology revision", conf.getRevision()},
                {"authors", authors},
                {"contributors", contributors},
                {"imported ontologies", imported},
                {"extended ontologies", extended},
                {"license URI", conf.getLicense().getUrl()},
                {"cite As", conf.getCiteAs()}
            },
            new String [] {
                "Property", "Value"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.String.class, java.lang.Object.class
            };
            boolean[] canEdit = new boolean [] {
                false, true
            };
            @Override
            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }
            @Override
            public boolean isCellEditable(int rowIndex, int columnIndex) {
                if(getValueAt(rowIndex, 0).equals("authors")||
                        getValueAt(rowIndex, 0).equals("contributors")||
                        ((String)getValueAt(rowIndex, 0)).toLowerCase().contains("extended")||
                        ((String)getValueAt(rowIndex, 0)).toLowerCase().contains("imported")){
                    return false;
                }
                return canEdit [columnIndex];
            }
        });
        
    }
    
    /**
     * Method to save the table values in the config object.
     */
    private void saveMetadata(){
        TableModel tableModel = tableProperties.getModel();
        int rows = tableModel.getRowCount();
        for(int i=0; i< rows;i++){
            String prop = (String) tableModel.getValueAt(i, 0);
            String value = (String) tableModel.getValueAt(i, 1);
            //we save all except for: authors, contribs, imported and exported
            //ontos, which will be saved with the other form
            if(value!=null && !value.equals("")){
                if(prop.equals("abstract")){
                    conf.setAbstractSection(value);
                }else if(prop.equals("ontology title")){
                    conf.setTitle(value);
                }else if(prop.equals("ontology name")){
                    conf.getMainOntology().setName(value);
                }else if(prop.equals("ontology prefix")){
                    conf.getMainOntology().setNamespacePrefix(value);
                }else if(prop.equals("ontology ns URI")){
                    conf.getMainOntology().setNamespaceURI(value);
                }else if(prop.equals("date of release")){
                    conf.setReleaseDate(value);
                }else if(prop.equals("this version URI")){
                    conf.setThisVersion(value);
                }else if(prop.equals("latest version URI")){
                    conf.setLatestVersion(value);
                }else if(prop.equals("previous version URI")){
                    conf.setPreviousVersion(value);
                }else if(prop.equals("ontology revision")){
                    conf.setRevision(value);
                }else if(prop.equals("license URI")){
                    conf.getLicense().setUrl(value);
                }else if(prop.equals("cite as")){
                    conf.setCiteAs(value);
                }
            }
        }
    }

    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        nextButton = new javax.swing.JButton();
        backButton = new javax.swing.JButton();
        cancelButton = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        jScrollPane1 = new javax.swing.JScrollPane();
        textPaneSteps = new javax.swing.JTextPane();
        jSeparator2 = new javax.swing.JSeparator();
        labelTitle = new javax.swing.JLabel();
        labelSteps = new javax.swing.JLabel();
        jScrollPane2 = new javax.swing.JScrollPane();
        tableProperties = new javax.swing.JTable();
        loadMetadataFromOnto = new javax.swing.JCheckBox();
        loadMetadataButton = new javax.swing.JButton();
        saveMetadataButton = new javax.swing.JButton();
        widocoLogo = new javax.swing.JLabel();
        loadMetadataFromDefaultConfigFile = new javax.swing.JCheckBox();
        barStatus = new javax.swing.JProgressBar();
        labelStatusReading = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Step 2: Load the metadata");
        setResizable(false);
        addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosing(java.awt.event.WindowEvent evt) {
                formWindowClosing(evt);
            }
        });

        nextButton.setText("Next >");
        nextButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                nextButtonActionPerformed(evt);
            }
        });

        backButton.setText("< Back");
        backButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                backButtonActionPerformed(evt);
            }
        });

        cancelButton.setText("Cancel");
        cancelButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cancelButtonActionPerformed(evt);
            }
        });

        textPaneSteps.setEditable(false);
        textPaneSteps.setContentType("text/html"); // NOI18N
        textPaneSteps.setText("<html>\r\n  <head>\r\n\r\n  </head>\r\n  <body>\r \n1. Select template<br/>       \n<b>2. Load Metadata</b><br/>\n3. Load Sections<br/>\n4. Finish\n  </body>\r\n</html>\r\n");
        jScrollPane1.setViewportView(textPaneSteps);

        labelTitle.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
        labelTitle.setText("Step 2: Load the metadata. Complete the metadata properties.");

        labelSteps.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
        labelSteps.setText("Steps");

        tableProperties.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {"abstract", ""},
                {"ontology title", null},
                {"ontology name", null},
                {"ontology prefix", null},
                {"ontology ns URI", null},
                {"date of release", null},
                {"this version URI", null},
                {"latest version URI", null},
                {"previous version URI", null},
                {"ontology revision", null},
                {"authors", null},
                {"contributors", null},
                {"imported ontologies", null},
                {"extended ontologies", null},
                {"license", null},
                {"cite as", null}
            },
            new String [] {
                "Property", "Value"
            }
        ) {
            Class[] types = new Class [] {
                java.lang.String.class, java.lang.Object.class
            };
            boolean[] canEdit = new boolean [] {
                false, false
            };

            public Class getColumnClass(int columnIndex) {
                return types [columnIndex];
            }

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        tableProperties.getTableHeader().setReorderingAllowed(false);
        jScrollPane2.setViewportView(tableProperties);

        loadMetadataFromOnto.setText("Load metadata from the ontology URI or file");
        loadMetadataFromOnto.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                loadMetadataFromOntoActionPerformed(evt);
            }
        });

        loadMetadataButton.setText("Load from config file...");
        loadMetadataButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                loadMetadataButtonActionPerformed(evt);
            }
        });

        saveMetadataButton.setText("Save as config file...");
        saveMetadataButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                saveMetadataButtonActionPerformed(evt);
            }
        });

        widocoLogo.setText("LOGO");

        loadMetadataFromDefaultConfigFile.setSelected(true);
        loadMetadataFromDefaultConfigFile.setText("Load metadata from default config file");
        loadMetadataFromDefaultConfigFile.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                loadMetadataFromDefaultConfigFileActionPerformed(evt);
            }
        });

        labelStatusReading.setText("status");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jSeparator2, javax.swing.GroupLayout.Alignment.TRAILING)
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addComponent(backButton, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(nextButton, javax.swing.GroupLayout.PREFERRED_SIZE, 89, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(88, 88, 88)
                                .addComponent(cancelButton, javax.swing.GroupLayout.PREFERRED_SIZE, 85, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addContainerGap())
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                .addComponent(saveMetadataButton, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(labelSteps, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jScrollPane1)
                                .addComponent(loadMetadataButton, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                            .addComponent(widocoLogo, javax.swing.GroupLayout.PREFERRED_SIZE, 141, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jSeparator1, javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addComponent(jScrollPane2)
                                    .addGroup(layout.createSequentialGroup()
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(loadMetadataFromDefaultConfigFile, javax.swing.GroupLayout.PREFERRED_SIZE, 454, javax.swing.GroupLayout.PREFERRED_SIZE)
                                            .addGroup(layout.createSequentialGroup()
                                                .addComponent(loadMetadataFromOnto, javax.swing.GroupLayout.PREFERRED_SIZE, 289, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                                .addComponent(barStatus, javax.swing.GroupLayout.PREFERRED_SIZE, 107, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addGap(18, 18, 18)
                                                .addComponent(labelStatusReading, javax.swing.GroupLayout.PREFERRED_SIZE, 53, javax.swing.GroupLayout.PREFERRED_SIZE)))
                                        .addGap(0, 82, Short.MAX_VALUE)))
                                .addContainerGap())
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(labelTitle, javax.swing.GroupLayout.PREFERRED_SIZE, 408, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(50, 50, 50))))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(labelTitle)
                        .addGap(37, 37, 37)
                        .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(widocoLogo, javax.swing.GroupLayout.DEFAULT_SIZE, 63, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(labelSteps)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 116, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(loadMetadataButton)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(saveMetadataButton))
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(loadMetadataFromOnto)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addComponent(labelStatusReading)
                                .addGap(5, 5, 5)))
                        .addComponent(loadMetadataFromDefaultConfigFile)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(nextButton)
                            .addComponent(backButton)
                            .addComponent(cancelButton)))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(barStatus, javax.swing.GroupLayout.PREFERRED_SIZE, 23, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(0, 0, Short.MAX_VALUE)))
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void backButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_backButtonActionPerformed
//        this.g.saveEditableProperties(this.properties);
        this.saveMetadata();
        this.g.switchState("back");
    }//GEN-LAST:event_backButtonActionPerformed

    private void cancelButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cancelButtonActionPerformed
        this.g.switchState("cancel");
    }//GEN-LAST:event_cancelButtonActionPerformed

    private void nextButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_nextButtonActionPerformed
        saveMetadata();
        this.g.switchState("next");
    }//GEN-LAST:event_nextButtonActionPerformed

    private void loadMetadataFromOntoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_loadMetadataFromOntoActionPerformed
        if(loadMetadataFromDefaultConfigFile.isSelected() && loadMetadataFromOnto.isSelected()){
            loadMetadataFromDefaultConfigFile.setSelected(false);
        }
        if(loadMetadataFromOnto.isSelected()){
            if(showReloadWarning()==JOptionPane.OK_OPTION){
                this.barStatus.setVisible(true);
                this.barStatus.setIndeterminate(true);
                this.saveMetadata();//we save the metadata before checking: the URI could have changed.
                g.switchState("loadOntologyProperties");
                this.backButton.setEnabled(false);
                this.nextButton.setEnabled(false);
            }else{
                loadMetadataFromOnto.setSelected(false);
            }
        }
    }//GEN-LAST:event_loadMetadataFromOntoActionPerformed

    private int showReloadWarning(){
        return JOptionPane.showConfirmDialog(this, "Reloading the properties will erase the values you have already introduced. Are you sure?", "Warning", JOptionPane.YES_NO_OPTION);
    }
    
    private void loadMetadataButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_loadMetadataButtonActionPerformed
        //To do: reload the config file from another .properties file.
        JFileChooser chooser = new JFileChooser(new File("").getAbsolutePath());
        int returnVal = chooser.showOpenDialog(this);
        if(returnVal == JFileChooser.APPROVE_OPTION) {
//           g.reloadConfiguration(chooser.getSelectedFile().getAbsolutePath());
           conf.reloadPropertyFile(chooser.getSelectedFile().getAbsolutePath());
           this.refreshPropertyTable();
        }
    }//GEN-LAST:event_loadMetadataButtonActionPerformed

    private void formWindowClosing(java.awt.event.WindowEvent evt) {//GEN-FIRST:event_formWindowClosing
        this.g.switchState("cancel");
    }//GEN-LAST:event_formWindowClosing

    private void loadMetadataFromDefaultConfigFileActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_loadMetadataFromDefaultConfigFileActionPerformed
        if(loadMetadataFromDefaultConfigFile.isSelected() && loadMetadataFromOnto.isSelected()){
            loadMetadataFromOnto.setSelected(false);
        }
        if(loadMetadataFromDefaultConfigFile.isSelected()){
            if(showReloadWarning()==JOptionPane.OK_OPTION){
                //load metadata from the default property file.
                //taken from config
                try{
                    URL root = GuiController.class.getProtectionDomain().getCodeSource().getLocation();
                    String path = (new File(root.toURI())).getParentFile().getPath();
                    conf.reloadPropertyFile(path+File.separator+TextConstants.configPath);
                    //g.reloadConfiguration(path+File.separator+TextConstants.configPath);
                    this.refreshPropertyTable();
                }catch(URISyntaxException e){
                    System.err.println("Error while reading the default config file");
                    JOptionPane.showMessageDialog(null, "Error while reading the default .properties file");
                }
            }else{
                loadMetadataFromDefaultConfigFile.setSelected(false);
            }
        }
        
    }//GEN-LAST:event_loadMetadataFromDefaultConfigFileActionPerformed

    private void saveMetadataButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_saveMetadataButtonActionPerformed
        //ideally the serialization of config woule have to be done in another class.
        JFileChooser chooser = new JFileChooser();
        int returnVal = chooser.showSaveDialog(this);
        if(returnVal == JFileChooser.APPROVE_OPTION){
            //create a file (if not exists already)
            String path = chooser.getSelectedFile().getAbsolutePath();
            try{
                CreateResources.saveConfigFile(path, conf);
                JOptionPane.showMessageDialog(this, "Property file saved successfully");
            }catch(IOException e){
                JOptionPane.showMessageDialog(this, "Error while saving the property file ");
            }
            /*String textProperties = "\n";//the first line I leave an intro because there have been problems.
            textProperties+=TextConstants.abstractSectionContent+"="+conf.getAbstractSection()+"\n";
            textProperties+=TextConstants.ontTitle+"="+conf.getTitle()+"\n";
            textProperties+=TextConstants.ontPrefix+"="+conf.getMainOntology().getNamespacePrefix()+"\n";
            textProperties+=TextConstants.ontNamespaceURI+"="+conf.getMainOntology().getNamespaceURI()+"\n";
            textProperties+=TextConstants.ontName+"="+conf.getMainOntology().getName()+"\n";
            textProperties+=TextConstants.thisVersionURI+"="+conf.getThisVersion()+"\n";
            textProperties+=TextConstants.latestVersionURI+"="+conf.getLatestVersion()+"\n";
            textProperties+=TextConstants.previousVersionURI+"="+conf.getPreviousVersion()+"\n";
            textProperties+=TextConstants.dateOfRelease+"="+conf.getReleaseDate()+"\n";
            textProperties+=TextConstants.ontologyRevision+"="+conf.getRevision()+"\n";
            textProperties+=TextConstants.licenseURI+"="+conf.getLicense().getUrl()+"\n";
            textProperties+=TextConstants.licenseName+"="+conf.getLicense().getName()+"\n";
            textProperties+=TextConstants.licenseIconURL+"="+conf.getLicense().getIcon()+"\n";
            textProperties+=TextConstants.citeAs+"="+conf.getCiteAs()+"\n";
            String authors="", authorURLs="", authorInstitutions="";
            ArrayList<Agent> ag = conf.getCreators();
            if(!ag.isEmpty()){
                for(int i=0; i<ag.size()-1;i++){
                    Agent a = ag.get(i);
                    if(a.getName()!=null)authors+=a.getName();
                    authors+=";";
                    if(a.getURL()!=null)authorURLs+=a.getURL();
                    authorURLs+=";";
                    if(a.getInstitutionName()!=null)authorInstitutions+=a.getInstitutionName();
                    authorInstitutions+=";";
                }
                //last agent: no ";"
                if(ag.get(ag.size()-1).getName()!=null) authors+=ag.get(ag.size()-1).getName();
                if(ag.get(ag.size()-1).getURL()!=null) authorURLs+=ag.get(ag.size()-1).getURL();
                if(ag.get(ag.size()-1).getInstitutionName()!=null) authorInstitutions+=ag.get(ag.size()-1).getInstitutionName();
            }
            textProperties+=TextConstants.authors+"="+authors+"\n";
            textProperties+=TextConstants.authorsURI+"="+authorURLs+"\n";
            textProperties+=TextConstants.authorsInstitution+"="+authorInstitutions+"\n";
            
            ag = conf.getContributors();
            authors=""; 
            authorURLs="";
            authorInstitutions="";
            if(!ag.isEmpty()){
                for(int i=0; i<ag.size()-1;i++){
                    Agent a = ag.get(i);
                    if(a.getName()!=null)authors+=a.getName();
                    authors+=";";
                    if(a.getURL()!=null)authorURLs+=a.getURL();
                    authorURLs+=";";
                    if(a.getInstitutionName()!=null)authorInstitutions+=a.getInstitutionName();
                    authorInstitutions+=";";
                }
                if(ag.get(ag.size()-1).getName()!=null) authors+=ag.get(ag.size()-1).getName();
                if(ag.get(ag.size()-1).getURL()!=null) authorURLs+=ag.get(ag.size()-1).getURL();
                if(ag.get(ag.size()-1).getInstitutionName()!=null) authorInstitutions+=ag.get(ag.size()-1).getInstitutionName();
            }
            textProperties+=TextConstants.contributors+"="+authors+"\n";
            textProperties+=TextConstants.contributorsURI+"="+authorURLs+"\n";
            textProperties+=TextConstants.contributorsInstitution+"="+authorInstitutions+"\n";
            String importedNames="", importedURIs="";
            ArrayList<Ontology> imported = conf.getImportedOntologies();
            if(!imported.isEmpty()){
                for(int i=0; i<imported.size()-1;i++){
                    Ontology o = imported.get(i);
                    if(o.getName()!=null)importedNames+=o.getName();
                    importedNames+=";";
                    if(o.getNamespaceURI()!=null)importedURIs+=o.getNamespaceURI();
                    importedURIs+=";";
                }
                //last agent: no ";"
                if(imported.get(imported.size()-1).getName()!=null) importedNames+=imported.get(imported.size()-1).getName();
                if(imported.get(imported.size()-1).getNamespaceURI()!=null) importedURIs+=imported.get(imported.size()-1).getNamespaceURI();
            }
            textProperties+=TextConstants.importedOntologyNames+"="+importedNames+"\n";
            textProperties+=TextConstants.importedOntologyURIs+"="+importedURIs+"\n";
            imported = conf.getExtendedOntologies();
            importedNames = "";
            importedURIs = "";
            if(!imported.isEmpty()){
                for(int i=0; i<imported.size()-1;i++){
                    Ontology o = imported.get(i);
                    if(o.getName()!=null)importedNames+=o.getName();
                    importedNames+=";";
                    if(o.getNamespaceURI()!=null)importedURIs+=o.getNamespaceURI();
                    importedURIs+=";";
                }
                //last agent: no ";"
                if(imported.get(imported.size()-1).getName()!=null) importedNames+=imported.get(imported.size()-1).getName();
                if(imported.get(imported.size()-1).getNamespaceURI()!=null) importedURIs+=imported.get(imported.size()-1).getNamespaceURI();
            }
            textProperties+=TextConstants.extendedOntologyNames+"="+importedNames+"\n";
            textProperties+=TextConstants.extendedOntologyURIs+"="+importedURIs+"\n";
            //copy the result into the file
            Writer writer = null;
            try {
                writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), "utf-8"));
                writer.write(textProperties);
                JOptionPane.showMessageDialog(this, "Property file saved successfully");
            } catch (IOException ex) {
              System.err.println("Error while saving the property file "+ex.getMessage());
            } finally {
               try {
                   if(writer!=null)writer.close();
               } catch (IOException ex) {}
            }*/

        }
        
        
    }//GEN-LAST:event_saveMetadataButtonActionPerformed

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
//            java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (InstantiationException ex) {
//            java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (IllegalAccessException ex) {
//            java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
//            java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
//        }
//        //</editor-fold>
//
//        /* Create and display the form */
//        java.awt.EventQueue.invokeLater(new Runnable() {
//
//            public void run() {
//                new GuiStep2().setVisible(true);
//            }
//        });
//    }
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton backButton;
    private javax.swing.JProgressBar barStatus;
    private javax.swing.JButton cancelButton;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JSeparator jSeparator2;
    private javax.swing.JLabel labelStatusReading;
    private javax.swing.JLabel labelSteps;
    private javax.swing.JLabel labelTitle;
    private javax.swing.JButton loadMetadataButton;
    private javax.swing.JCheckBox loadMetadataFromDefaultConfigFile;
    private javax.swing.JCheckBox loadMetadataFromOnto;
    private javax.swing.JButton nextButton;
    private javax.swing.JButton saveMetadataButton;
    private javax.swing.JTable tableProperties;
    private javax.swing.JTextPane textPaneSteps;
    private javax.swing.JLabel widocoLogo;
    // End of variables declaration//GEN-END:variables
}
