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

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import javax.swing.ImageIcon;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.table.TableModel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import widoco.Configuration;
import widoco.CreateResources;
import widoco.Constants;
import widoco.entities.Agent;
import widoco.entities.Ontology;

/**
 *
 * @author Daniel Garijo
 */
public final class GuiStep2 extends javax.swing.JFrame {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	private final GuiController g;
	// private HashMap<String,String> properties;
	private final Configuration conf;
	private static final String WARNING_DEFAULT = "Reloading the properties will erase the values you have already introduced. Are you sure?";
	private static final String WARNING_LICENSIUS = "This action will reload the properties from the ontology and use Licensius WS to retrieve license metadata. Are you sure?";

	/**
	 * Creates new form WidocoGui2
	 * 
	 * @param g
	 */
	public GuiStep2(GuiController g) {
		this.g = g;
		conf = g.getConfig();
		initComponents();
		initializeGUI();
	}

	private void initializeGUI() {
		Image l = g.getConfig().getWidocoLogo().getScaledInstance(widocoLogo.getWidth(), widocoLogo.getHeight(),
				Image.SCALE_SMOOTH);
		widocoLogo.setIcon(new ImageIcon(l));
		this.setIconImage(g.getConfig().getWidocoLogoMini());

		Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

		// Determine the new location of the window
		int w = this.getSize().width;
		int h = this.getSize().height;
		int x = (dim.width - w) / 2;
		int y = (dim.height - h) / 2;

		// Center the window
		this.setLocation(x, y);
		this.barStatus.setVisible(true);
		this.barStatus.setIndeterminate(true);
		this.labelStatusReading.setVisible(true);
		this.backButton.setEnabled(false);
		this.nextButton.setEnabled(false);
		this.languageButton.setEnabled(false);
		this.tableProperties.setEnabled(false);
		this.loadMetadataFromOnto.setEnabled(false);
		this.loadMetadataFromDefaultConfigFile.setEnabled(false);
		this.useLicensiusWSCheckBox.setEnabled(false);
		this.useLicensiusWSCheckBox.setSelected(conf.isUseLicensius());

		// properties = g.getEditableProperties();
		// refreshTable();
		final GuiStep2 gAux = this;
		// events for clicking: for agents and ontologies
		tableProperties.addMouseListener(new java.awt.event.MouseAdapter() {
			@Override
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				if (evt.getClickCount() == 2) {// doubleclick
					int row = tableProperties.rowAtPoint(evt.getPoint());
					int col = tableProperties.columnAtPoint(evt.getPoint());
					if (row >= 0 && col >= 0) {
						// System.out.println("clicked on "+tableProperties.getModel().getValueAt(row,
						// 0));
						// here I should verify that the edit property form is not already editing the
						// current property.
						String prop = (String) tableProperties.getModel().getValueAt(row, 0);
						JFrame form = null;
						switch (prop) {
							case "abstract":
								form = new BiggerTextArea(gAux, conf, BiggerTextArea.PropertyType.abs);
								break;
							case "ontology description":
								form = new BiggerTextArea(gAux, conf, BiggerTextArea.PropertyType.description);
								break;
							case "ontology introduction":
								form = new BiggerTextArea(gAux, conf, BiggerTextArea.PropertyType.introduction);
								break;
							case "cite as":
								form = new BiggerTextArea(gAux, conf, BiggerTextArea.PropertyType.citeAs);
								break;
							case "authors":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.authors);
								break;
							case "contributors":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.contributors);
								break;
							case "funders":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.funders);
								break;
							case "publisher":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.publisher);
								break;
							case "extended ontologies":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.extended);
								break;
							case "imported ontologies":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.imported);
								break;
							case "license":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.license);
								break;
							case "images":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.image);
								break;
							case "see also":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.seeAlso);
								break;
							case "sources":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.source);
								break;
							case "funding":
								form = new EditProperty(gAux, conf, EditProperty.PropertyType.funding);
								break;
						}
						if (form != null) {
							gAux.saveMetadata();
							form.setVisible(true);
						}
					}
				}
			}
		});
		this.refreshLanguages();
	}

	public void refreshPropertyTable() {
		refreshTable();
	}

	public void stopLoadingAnimation() {
		this.barStatus.setVisible(false);
		this.barStatus.setIndeterminate(false);
		this.backButton.setEnabled(true);
		this.nextButton.setEnabled(true);
		this.languageButton.setEnabled(true);
		this.labelStatusReading.setVisible(false);
		this.tableProperties.setEnabled(true);
		this.loadMetadataFromOnto.setEnabled(true);
		this.loadMetadataFromDefaultConfigFile.setEnabled(true);
		this.useLicensiusWSCheckBox.setEnabled(true);

	}

	private void refreshTable() {
		StringBuilder authors = new StringBuilder();
		StringBuilder contributors = new StringBuilder();
		StringBuilder imported = new StringBuilder();
		StringBuilder extended = new StringBuilder();
		StringBuilder publisher = new StringBuilder();
		StringBuilder images = new StringBuilder();
		StringBuilder sources = new StringBuilder();
		StringBuilder seeAlso = new StringBuilder();
		StringBuilder funders = new StringBuilder();
		StringBuilder funding = new StringBuilder();
		for (Agent a : conf.getMainOntology().getCreators()) {
			if (a.getName() == null || a.getName().equals("")) {
				authors.append("creator; ");
			} else {
				authors.append(a.getName()).append("; ");
			}
		}
		for (Agent a : conf.getMainOntology().getContributors()) {
			if (a.getName() == null || a.getName().equals("")) {
				contributors.append("contributor; ");
			} else {
				contributors.append(a.getName()).append("; ");
			}
		}
		for (Agent a : conf.getMainOntology().getFunders()) {
			if (a.getName() == null || a.getName().equals("")) {
				funders.append("funding; ");
			} else {
				funders.append(a.getName()).append("; ");
			}
		}
		for (Ontology a : conf.getMainOntology().getImportedOntologies()) {
			if (a.getName() == null || a.getName().equals("")) {
				imported.append("importedOnto; ");
			} else {
				imported.append(a.getName()).append("; ");
			}
		}
		for (Ontology a : conf.getMainOntology().getExtendedOntologies()) {
			if (a.getName() == null || a.getName().equals("")) {
				extended.append("extendedOnto; ");
			} else {
				extended.append(a.getName()).append("; ");
			}
		}
		Agent p = conf.getMainOntology().getPublisher();
		if (p.getName() == null || p.getName().equals("")) {
			if (p.getURL() != null) {
				publisher.append("publisherName ");
			}
		} else {
			publisher.append(p.getName());
		}
		for (String img: conf.getMainOntology().getImages()){
			if(!img.equals("")){
				images.append(img).append(";");
			}
		}
		for (String source: conf.getMainOntology().getSources()){
			if(!source.equals("")){
				sources.append(source).append(";");
			}
		}
		for (String see: conf.getMainOntology().getSeeAlso()){
			if(!see.equals("")){
				seeAlso.append(see).append(";");
			}
		}
		for (String see: conf.getMainOntology().getFundingGrants()){
			if(!see.equals("")){
				funding.append(see).append(";");
			}
		}
		tableProperties.setModel(new javax.swing.table.DefaultTableModel(new Object[][] {
				{ "abstract", conf.getAbstractSection() },
				{ "ontology title", conf.getMainOntology().getTitle() },
				{ "ontology name", conf.getMainOntology().getName() },
				{ "ontology description", conf.getMainOntology().getDescription() },
				{ "ontology introduction", conf.getIntroText() },
				{ "ontology prefix", conf.getMainOntology().getNamespacePrefix() },
				{ "ontology ns URI", conf.getMainOntology().getNamespaceURI() },
				{ "creation date", conf.getMainOntology().getCreationDate() },
				{ "modified date", conf.getMainOntology().getModifiedDate() },
				{ "this version URI", conf.getMainOntology().getThisVersion() },
				{ "latest version URI", conf.getMainOntology().getNamespaceURI() },
				{ "previous version URI", conf.getMainOntology().getPreviousVersion() },
				{ "ontology revision", conf.getMainOntology().getRevision() },
				{ "authors", authors.toString()},
				{ "contributors", contributors.toString()},
				{ "funders", funders.toString()},
				{ "publisher", publisher.toString() },
				{ "imported ontologies", imported.toString()},
				{ "extended ontologies", extended.toString()},
				{ "license", conf.getMainOntology().getLicense().getUrl() },
				{ "cite as", conf.getMainOntology().getCiteAs() },
				{ "doi", conf.getMainOntology().getDoi() },
				{ "status", conf.getMainOntology().getStatus() },
				{ "backwards compatible with", conf.getMainOntology().getBackwardsCompatibleWith() },
                { "incompatible with", conf.getMainOntology().getIncompatibleWith()},
				{ "images", images.toString()},
				{ "logo", conf.getMainOntology().getLogo() },
				{ "sources", sources.toString() },
				{ "funding", funding.toString() },
				{ "see also", seeAlso.toString() }
				},
				new String[] { "Property", "Value" }) {
			Class[] types = new Class[] { java.lang.String.class, java.lang.Object.class };
			boolean[] canEdit = new boolean[] { false, true };

			@Override
			public Class getColumnClass(int columnIndex) {
				return types[columnIndex];
			}

			@Override
			public boolean isCellEditable(int rowIndex, int columnIndex) {
				if (getValueAt(rowIndex, 0).equals("abstract")
						|| getValueAt(rowIndex, 0).equals("ontology introduction")
						|| getValueAt(rowIndex, 0).equals("ontology description")
						|| getValueAt(rowIndex, 0).equals("cite as")
						|| getValueAt(rowIndex, 0).equals("authors")
						|| getValueAt(rowIndex, 0).equals("contributors")
						|| getValueAt(rowIndex, 0).equals("publisher")
						|| getValueAt(rowIndex, 0).equals("funders")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("extended")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("license")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("images")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("see also")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("source")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("funding")
						|| ((String) getValueAt(rowIndex, 0)).toLowerCase().contains("imported")) {
					return false;
				}
				return canEdit[columnIndex];
			}
		});

	}

	/**
	 * Method to save the table values in the config object.
	 */
	private void saveMetadata() {
		TableModel tableModel = tableProperties.getModel();
		int rows = tableModel.getRowCount();
		for (int i = 0; i < rows; i++) {
			String prop = (String) tableModel.getValueAt(i, 0);
			String value = (String) tableModel.getValueAt(i, 1);
			// we save all except for: authors, contribs, imported and exported
			// ontos, which will be saved with the other form
			// if(value!=null && !value.equals("")){
			switch (prop) {
				case "abstract":
					conf.setAbstractSection(value);
					break;
				case "ontology title":
					conf.getMainOntology().setTitle(value);
					break;
				case "ontology name":
					conf.getMainOntology().setName(value);
					break;
				case "ontology description":
					conf.getMainOntology().setDescription(value);
				case "ontology introduction":
					conf.setIntroText(value);
				case "ontology prefix":
					conf.getMainOntology().setNamespacePrefix(value);
					break;
				case "ontology ns URI":
					conf.getMainOntology().setNamespaceURI(value);
					break;
				case "creation date":
					conf.getMainOntology().setCreationDate(value);
					break;
				case "modified date":
					conf.getMainOntology().setModifiedDate(value);
					break;
				case "this version URI":
					conf.getMainOntology().setThisVersion(value);
					break;
				case "latest version URI":
					conf.getMainOntology().setLatestVersion(value);
					break;
				case "previous version URI":
					conf.getMainOntology().setPreviousVersion(value);
					break;
				case "ontology revision":
					conf.getMainOntology().setRevision(value);
					break;
				case "license URI":
					conf.getMainOntology().getLicense().setUrl(value);
					break;
				case "cite as":
					conf.getMainOntology().setCiteAs(value);
					break;
				case "doi":
					conf.getMainOntology().setDoi(value);
					break;
				case "status":
					conf.getMainOntology().setStatus(value);
					break;
				case "backwards compatible with":
					conf.getMainOntology().setBackwardsCompatibleWith(value);
					break;
				case "incompatible with":
					conf.getMainOntology().setIncompatibleWith(value);
					break;
				case "logo":
					conf.getMainOntology().setLogo(value);
					break;
			}
		}
	}

	/**
	 * This method is called from within the constructor to initialize the form.
	 * WARNING: Do NOT modify this code. The content of this method is always
	 * regenerated by the Form Editor.
	 */
	@SuppressWarnings("unchecked")
	// <editor-fold defaultstate="collapsed" desc="Generated
	// Code">//GEN-BEGIN:initComponents
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
		jLabel1 = new javax.swing.JLabel();
		labelCurrentLanguage = new javax.swing.JLabel();
		languageButton = new javax.swing.JToggleButton();
		jLabel2 = new javax.swing.JLabel();
		labelCurrentLanguage1 = new javax.swing.JLabel();
		jLabel3 = new javax.swing.JLabel();
		useLicensiusWSCheckBox = new javax.swing.JCheckBox();
		checkListLabel = new javax.swing.JLabel();

		setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
		setTitle("Step 2: Load the metadata");
		setResizable(true);
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
		textPaneSteps.setText(
				"<html>\r\n  <head>\r\n\r\n  </head>\r\n  <body>\r \n1. Select template<br/>       \n<b>2. Load metadata</b><br/>\n3. Load sections<br/>\n4. Finish\n  </body>\r\n</html>\r\n");
		jScrollPane1.setViewportView(textPaneSteps);

		labelTitle.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
		labelTitle.setText("Step 2: Load and comple the metadata properties of your vocabulary. ");

		labelSteps.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
		labelSteps.setText("Steps");
		tableProperties.setModel(new javax.swing.table.DefaultTableModel(
				new Object[][] { { "abstract", "" }, { "ontology title", null }, { "ontology name", null },
						{ "ontology description", null }, { "ontology introduction", null },
						{ "ontology prefix", null }, { "ontology ns URI", null }, { "creation date", null },
						{ "modified date", null }, { "this version URI", null }, { "latest version URI", null },
						{ "previous version URI", null }, { "ontology revision", null }, { "authors", null },
						{ "contributors", null }, { "publisher", null }, { "imported ontologies", null },
						{ "extended ontologies", null }, { "license", null }, { "cite as", null }, { "doi", null },
						{ "status", null }, { "backwards compatible with", null },{ "incompatible with", null }},
				new String[] { "Property", "Value" }) {
			Class[] types = new Class[] { java.lang.String.class, java.lang.Object.class };
			boolean[] canEdit = new boolean[] { false, false };

			public Class getColumnClass(int columnIndex) {
				return types[columnIndex];
			}

			public boolean isCellEditable(int rowIndex, int columnIndex) {
				return canEdit[columnIndex];
			}
		});
		tableProperties.getTableHeader().setReorderingAllowed(false);
		jScrollPane2.setViewportView(tableProperties);

		loadMetadataFromOnto.setSelected(true);
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

		loadMetadataFromDefaultConfigFile.setText("Load metadata from default config file");
		loadMetadataFromDefaultConfigFile.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				loadMetadataFromDefaultConfigFileActionPerformed(evt);
			}
		});

		labelStatusReading.setText("Loading ...");

		jLabel1.setText("Generating documentation for language:");

		labelCurrentLanguage.setFont(new java.awt.Font("Tahoma", 0, 18)); // NOI18N
		labelCurrentLanguage.setText("en");

		languageButton.setText("add Language...");
		languageButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				languageButtonActionPerformed(evt);
			}
		});

		jLabel2.setText("Will generate documentation in lang:  ");

		labelCurrentLanguage1.setText("en");

		jLabel3.setFont(new java.awt.Font("Tahoma", 1, 11)); // NOI18N
		jLabel3.setText("Select the languages in which the documentation will be generated");

		useLicensiusWSCheckBox.setText("Use Licensius WS");
		useLicensiusWSCheckBox.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				useLicensiusWSCheckBoxActionPerformed(evt);
			}
		});

		checkListLabel.setForeground(new java.awt.Color(0, 0, 255));
		checkListLabel.setText("Check out our proposed metadata properties for reference");
		checkListLabel.addMouseListener(new java.awt.event.MouseAdapter() {
			public void mouseClicked(java.awt.event.MouseEvent evt) {
				checkListLabelMouseClicked(evt);
			}

			public void mouseEntered(java.awt.event.MouseEvent evt) {
				checkListLabelMouseEntered(evt);
			}

			public void mouseExited(java.awt.event.MouseEvent evt) {
				checkListLabelMouseExited(evt);
			}
		});

		javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
		getContentPane().setLayout(layout);
		layout.setHorizontalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
				.addGroup(layout.createSequentialGroup().addContainerGap()
						.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
								.addComponent(jSeparator2, javax.swing.GroupLayout.Alignment.TRAILING)
								.addGroup(javax.swing.GroupLayout.Alignment.TRAILING,
										layout.createSequentialGroup().addComponent(checkListLabel)
												.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED,
														javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
												.addComponent(backButton, javax.swing.GroupLayout.PREFERRED_SIZE, 85,
														javax.swing.GroupLayout.PREFERRED_SIZE)
												.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
												.addComponent(nextButton, javax.swing.GroupLayout.PREFERRED_SIZE, 89,
														javax.swing.GroupLayout.PREFERRED_SIZE)
												.addGap(88, 88, 88).addComponent(cancelButton,
														javax.swing.GroupLayout.PREFERRED_SIZE, 85,
														javax.swing.GroupLayout.PREFERRED_SIZE))
								.addGroup(layout.createSequentialGroup().addGroup(layout
										.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
										.addGroup(layout
												.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
												.addComponent(saveMetadataButton, javax.swing.GroupLayout.DEFAULT_SIZE,
														javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
												.addComponent(labelSteps, javax.swing.GroupLayout.PREFERRED_SIZE, 56,
														javax.swing.GroupLayout.PREFERRED_SIZE)
												.addComponent(jScrollPane1).addComponent(loadMetadataButton,
														javax.swing.GroupLayout.DEFAULT_SIZE,
														javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
										.addComponent(widocoLogo, javax.swing.GroupLayout.PREFERRED_SIZE, 141,
												javax.swing.GroupLayout.PREFERRED_SIZE))
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
												.addComponent(jSeparator1, javax.swing.GroupLayout.Alignment.TRAILING)
												.addComponent(
														jScrollPane2, javax.swing.GroupLayout.DEFAULT_SIZE, 557,
														Short.MAX_VALUE)
												.addGroup(layout.createSequentialGroup().addGroup(layout
														.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
														.addGroup(layout.createSequentialGroup().addComponent(jLabel1)
																.addPreferredGap(
																		javax.swing.LayoutStyle.ComponentPlacement.RELATED)
																.addComponent(
																		labelCurrentLanguage,
																		javax.swing.GroupLayout.PREFERRED_SIZE, 75,
																		javax.swing.GroupLayout.PREFERRED_SIZE))
														.addComponent(labelTitle).addComponent(jLabel3)
														.addGroup(layout.createSequentialGroup().addGroup(layout
																.createParallelGroup(
																		javax.swing.GroupLayout.Alignment.LEADING)
																.addGroup(layout.createSequentialGroup().addGroup(layout
																		.createParallelGroup(
																				javax.swing.GroupLayout.Alignment.LEADING,
																				false)
																		.addGroup(layout.createSequentialGroup()
																				.addComponent(loadMetadataFromOnto,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						289,
																						javax.swing.GroupLayout.PREFERRED_SIZE)
																				.addPreferredGap(
																						javax.swing.LayoutStyle.ComponentPlacement.UNRELATED,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						Short.MAX_VALUE))
																		.addGroup(layout.createSequentialGroup()
																				.addComponent(jLabel2)
																				.addPreferredGap(
																						javax.swing.LayoutStyle.ComponentPlacement.RELATED)
																				.addComponent(labelCurrentLanguage1,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						Short.MAX_VALUE)
																				.addGap(36, 36, 36)))
																		.addGroup(layout.createParallelGroup(
																				javax.swing.GroupLayout.Alignment.LEADING,
																				false)
																				.addComponent(languageButton,
																						javax.swing.GroupLayout.DEFAULT_SIZE,
																						133, Short.MAX_VALUE)
																				.addComponent(barStatus,
																						javax.swing.GroupLayout.PREFERRED_SIZE,
																						0, Short.MAX_VALUE)
																				.addComponent(useLicensiusWSCheckBox)))
																.addComponent(
																		loadMetadataFromDefaultConfigFile,
																		javax.swing.GroupLayout.PREFERRED_SIZE, 289,
																		javax.swing.GroupLayout.PREFERRED_SIZE))
																.addPreferredGap(
																		javax.swing.LayoutStyle.ComponentPlacement.RELATED)
																.addComponent(labelStatusReading,
																		javax.swing.GroupLayout.PREFERRED_SIZE, 99,
																		javax.swing.GroupLayout.PREFERRED_SIZE)))
														.addGap(0, 23, Short.MAX_VALUE)))))
						.addContainerGap()));
		layout.setVerticalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
				.addGroup(layout.createSequentialGroup().addContainerGap()
						.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
								.addGroup(layout.createSequentialGroup()
										.addComponent(widocoLogo, javax.swing.GroupLayout.PREFERRED_SIZE, 61,
												javax.swing.GroupLayout.PREFERRED_SIZE)
										.addGap(15, 15, 15).addComponent(labelSteps)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
										.addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 116,
												javax.swing.GroupLayout.PREFERRED_SIZE)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
										.addComponent(loadMetadataButton)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addComponent(saveMetadataButton))
								.addGroup(layout.createSequentialGroup()
										.addComponent(labelTitle, javax.swing.GroupLayout.PREFERRED_SIZE, 19,
												javax.swing.GroupLayout.PREFERRED_SIZE)
										.addGap(2, 2, 2).addComponent(jLabel3)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
												.addComponent(jLabel1).addComponent(labelCurrentLanguage))
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE,
												javax.swing.GroupLayout.DEFAULT_SIZE,
												javax.swing.GroupLayout.PREFERRED_SIZE)
										.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
										.addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 232,
												javax.swing.GroupLayout.PREFERRED_SIZE)))
						.addGap(10, 10, 10)
						.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(languageButton)
								.addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 15,
										javax.swing.GroupLayout.PREFERRED_SIZE)
								.addComponent(labelCurrentLanguage1))
						.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
						.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout
								.createSequentialGroup()
								.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
										.addComponent(loadMetadataFromOnto).addComponent(useLicensiusWSCheckBox))
								.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
								.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
										.addComponent(loadMetadataFromDefaultConfigFile)
										.addComponent(labelStatusReading)))
								.addComponent(barStatus, javax.swing.GroupLayout.Alignment.TRAILING,
										javax.swing.GroupLayout.PREFERRED_SIZE, 23,
										javax.swing.GroupLayout.PREFERRED_SIZE))
						.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
						.addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, 10,
								javax.swing.GroupLayout.PREFERRED_SIZE)
						.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
						.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(nextButton).addComponent(backButton).addComponent(cancelButton)
								.addComponent(checkListLabel))
						.addContainerGap()));

		pack();
	}// </editor-fold>//GEN-END:initComponents

	private void backButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_backButtonActionPerformed
		// this.g.saveEditableProperties(this.properties);
		this.saveMetadata();
		this.g.switchState("back");
	}// GEN-LAST:event_backButtonActionPerformed

	private void cancelButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_cancelButtonActionPerformed
		this.g.switchState("cancel");
	}// GEN-LAST:event_cancelButtonActionPerformed

	private void nextButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_nextButtonActionPerformed
		saveMetadata();
		this.g.switchState("next");
	}// GEN-LAST:event_nextButtonActionPerformed

	private void loadMetadataFromOntoActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_loadMetadataFromOntoActionPerformed
		if (loadMetadataFromDefaultConfigFile.isSelected() && loadMetadataFromOnto.isSelected()) {
			loadMetadataFromDefaultConfigFile.setSelected(false);
		}
		if (loadMetadataFromOnto.isSelected()) {
			if (showReloadWarning(WARNING_DEFAULT) == JOptionPane.OK_OPTION) {
				this.barStatus.setVisible(true);
				this.barStatus.setIndeterminate(true);
				this.saveMetadata();// we save the metadata before checking: the URI could have changed.
				g.switchState("loadOntologyProperties");
				this.backButton.setEnabled(false);
				this.nextButton.setEnabled(false);
				this.languageButton.setEnabled(false);
				useLicensiusWSCheckBox.setEnabled(true);
			} else {
				loadMetadataFromOnto.setSelected(false);
				useLicensiusWSCheckBox.setEnabled(false);
			}
		} else {
			useLicensiusWSCheckBox.setEnabled(false);
		}
	}// GEN-LAST:event_loadMetadataFromOntoActionPerformed

	private int showReloadWarning(String message) {
		return JOptionPane.showConfirmDialog(this, message, "Warning", JOptionPane.YES_NO_OPTION);
	}

	private void loadMetadataButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_loadMetadataButtonActionPerformed
		this.useLicensiusWSCheckBox.setEnabled(false);
		this.loadMetadataFromOnto.setSelected(false);
		this.loadMetadataFromDefaultConfigFile.setSelected(false);
//		JFileChooser chooser = new JFileChooser(new File("").getAbsolutePath());
//		int returnVal = chooser.showOpenDialog(this);
//		if (returnVal == JFileChooser.APPROVE_OPTION) {
//			// g.reloadConfiguration(chooser.getSelectedFile().getAbsolutePath());
//			conf.reloadPropertyFile(chooser.getSelectedFile().getAbsolutePath());
//			this.refreshPropertyTable();
//		}
		FileDialog chooser = new FileDialog(this, "Select .properties file", FileDialog.LOAD);
		chooser.setVisible(true);
		String directory = chooser.getDirectory();
		String file = chooser.getFile();
		if (directory != null && file != null) {
			File selectedFile = new File(directory, file);
			conf.reloadPropertyFile(selectedFile.getAbsolutePath());
			this.refreshPropertyTable();
		} else {
			logger.info("Load canceled.");
		}
	}// GEN-LAST:event_loadMetadataButtonActionPerformed

	private void formWindowClosing(java.awt.event.WindowEvent evt) {// GEN-FIRST:event_formWindowClosing
		this.g.switchState("cancel");
	}// GEN-LAST:event_formWindowClosing

	private void loadMetadataFromDefaultConfigFileActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_loadMetadataFromDefaultConfigFileActionPerformed

		useLicensiusWSCheckBox.setEnabled(false);
		if (loadMetadataFromDefaultConfigFile.isSelected() && loadMetadataFromOnto.isSelected()) {
			loadMetadataFromOnto.setSelected(false);
		}
		if (loadMetadataFromDefaultConfigFile.isSelected()) {
			if (showReloadWarning(WARNING_DEFAULT) == JOptionPane.OK_OPTION) {
				// load metadata from the default property file.
				// taken from config
				try {
					URL root = GuiController.class.getProtectionDomain().getCodeSource().getLocation();
					String path = (new File(root.toURI())).getParentFile().getPath();
					conf.reloadPropertyFile(path + File.separator + Constants.CONFIG_PATH);
					// g.reloadConfiguration(path+File.separator+TextConstants.configPath);
					this.refreshPropertyTable();
				} catch (URISyntaxException e) {
					logger.error("Error while reading the default config file");
					JOptionPane.showMessageDialog(null, "Error while reading the default .properties file");
				}
			} else {
				loadMetadataFromDefaultConfigFile.setSelected(false);
			}
		}

	}// GEN-LAST:event_loadMetadataFromDefaultConfigFileActionPerformed

	private void saveMetadataButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_saveMetadataButtonActionPerformed
		saveMetadata();
//		JFileChooser chooser = new JFileChooser();
//		int returnVal = chooser.showSaveDialog(this);
//		if (returnVal == JFileChooser.APPROVE_OPTION) {
//			// create a file (if not exists already)
//			String path = chooser.getSelectedFile().getAbsolutePath();
//			try {
//				CreateResources.saveConfigFile(path, conf);
//				JOptionPane.showMessageDialog(this, "Property file saved successfully");
//			} catch (IOException e) {
//				JOptionPane.showMessageDialog(this, "Error while saving the property file ");
//			}
//		}

		FileDialog chooser = new FileDialog(this, "Select A file to save all ontology metadata", FileDialog.SAVE);
		chooser.setVisible(true);
		String directory = chooser.getDirectory();
		String file = chooser.getFile();
		if (directory != null && file != null) {
			File selectedFile = new File(directory, file);
			logger.info("You chose to save this file: " + selectedFile.getName());
			try {
				CreateResources.saveConfigFile(selectedFile.getAbsolutePath(), conf);
				JOptionPane.showMessageDialog(this, "Property file saved successfully");
			} catch (IOException e) {
				JOptionPane.showMessageDialog(this, "Error while saving the property file ");
			}
		} else {
			logger.info("Selection canceled.");
		}

	}// GEN-LAST:event_saveMetadataButtonActionPerformed

	public void refreshLanguages() {
		this.labelCurrentLanguage.setText(conf.getCurrentLanguage());
		// refresh all the available languages to generate
		ArrayList<String> remainingLangs = conf.getRemainingToGenerateDoc();
		Iterator<String> it = remainingLangs.iterator();
		String aux = "";
		while (it.hasNext()) {
			aux += it.next() + ";";
		}
		this.labelCurrentLanguage1.setText(aux);
		// if the language changes, we might want to reload the properties accordingly.
		this.conf.loadPropertiesFromOntology(conf.getMainOntology().getOWLAPIModel());
		this.refreshPropertyTable();
	}

	private void languageButtonActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_languageButtonActionPerformed
		SelectLanguage s = new SelectLanguage(this, conf);
		s.setVisible(true);
	}// GEN-LAST:event_languageButtonActionPerformed

	private void useLicensiusWSCheckBoxActionPerformed(java.awt.event.ActionEvent evt) {// GEN-FIRST:event_useLicensiusWSCheckBoxActionPerformed
		if (useLicensiusWSCheckBox.isSelected()) {
			conf.setUseLicensius(true);
			loadMetadataFromOntoActionPerformed(evt);
		} else {
			conf.setUseLicensius(false);
		}
	}// GEN-LAST:event_useLicensiusWSCheckBoxActionPerformed

	private void checkListLabelMouseClicked(java.awt.event.MouseEvent evt) {// GEN-FIRST:event_checkListLabelMouseClicked
		try {
			g.openBrowser(new URI("https://w3id.org/widoco/bestPractices"));
		} catch (URISyntaxException ex) {
		}
	}// GEN-LAST:event_checkListLabelMouseClicked

	private void checkListLabelMouseEntered(java.awt.event.MouseEvent evt) {// GEN-FIRST:event_checkListLabelMouseEntered
		setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
	}// GEN-LAST:event_checkListLabelMouseEntered

	private void checkListLabelMouseExited(java.awt.event.MouseEvent evt) {// GEN-FIRST:event_checkListLabelMouseExited
		setCursor(Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR));
	}// GEN-LAST:event_checkListLabelMouseExited

	/**
	 * @param args
	 *            the command line arguments
	 */
	// public static void main(String args[]) {
	// /* Set the Nimbus look and feel */
	// //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code
	// (optional) ">
	// /* If Nimbus (introduced in Java SE 6) is not available, stay with the
	// default look and feel.
	// * For details see
	// http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html
	// */
	// try {
	// for (javax.swing.UIManager.LookAndFeelInfo info :
	// javax.swing.UIManager.getInstalledLookAndFeels()) {
	// if ("Nimbus".equals(info.getName())) {
	// javax.swing.UIManager.setLookAndFeel(info.getClassName());
	// break;
	// }
	// }
	// } catch (ClassNotFoundException ex) {
	// java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE,
	// null, ex);
	// } catch (InstantiationException ex) {
	// java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE,
	// null, ex);
	// } catch (IllegalAccessException ex) {
	// java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE,
	// null, ex);
	// } catch (javax.swing.UnsupportedLookAndFeelException ex) {
	// java.util.logging.Logger.getLogger(GuiStep2.class.getName()).log(java.util.logging.Level.SEVERE,
	// null, ex);
	// }
	// //</editor-fold>
	//
	// /* Create and display the form */
	// java.awt.EventQueue.invokeLater(new Runnable() {
	//
	// public void run() {
	// new GuiStep2().setVisible(true);
	// }
	// });
	// }
	// Variables declaration - do not modify//GEN-BEGIN:variables
	private javax.swing.JButton backButton;
	private javax.swing.JProgressBar barStatus;
	private javax.swing.JButton cancelButton;
	private javax.swing.JLabel checkListLabel;
	private javax.swing.JLabel jLabel1;
	private javax.swing.JLabel jLabel2;
	private javax.swing.JLabel jLabel3;
	private javax.swing.JScrollPane jScrollPane1;
	private javax.swing.JScrollPane jScrollPane2;
	private javax.swing.JSeparator jSeparator1;
	private javax.swing.JSeparator jSeparator2;
	private javax.swing.JLabel labelCurrentLanguage;
	private javax.swing.JLabel labelCurrentLanguage1;
	private javax.swing.JLabel labelStatusReading;
	private javax.swing.JLabel labelSteps;
	private javax.swing.JLabel labelTitle;
	private javax.swing.JToggleButton languageButton;
	private javax.swing.JButton loadMetadataButton;
	private javax.swing.JCheckBox loadMetadataFromDefaultConfigFile;
	private javax.swing.JCheckBox loadMetadataFromOnto;
	private javax.swing.JButton nextButton;
	private javax.swing.JButton saveMetadataButton;
	private javax.swing.JTable tableProperties;
	private javax.swing.JTextPane textPaneSteps;
	private javax.swing.JCheckBox useLicensiusWSCheckBox;
	private javax.swing.JLabel widocoLogo;
	// End of variables declaration//GEN-END:variables
}
