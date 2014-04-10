/*
 *  Copyright 2012-2013 Ontology Engineering Group, Universidad Politécnica de Madrid, Spain

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
package htmlfromowlgenerator;

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

/**
 * General class for reading the properties to generate the HTML
 * @author Daniel Garijo
 */
public class Configuration {
    private static Configuration conf = null;
    private Properties config = null;
    final String configPath = "config"+File.separator+"config.properties";
    
    //read each of these parameters from a configuration file in a singleton
    private Configuration(){
        config = new Properties();
 
    	try { 		
    		URL root = htmlfromowlgenerator.TemplateGeneratorGUI.class.getProtectionDomain().getCodeSource().getLocation();
    		String path = (new File(root.toURI())).getParentFile().getPath();
    		
			config.load(new FileInputStream(path+File.separator+configPath));
 
    	} catch (Exception ex) {
    		System.err.println("Error while reading configuration properties "+ex.getMessage());
        }
    }
    
    private static Configuration getConfigurationFile(){
        if (conf == null){
            conf = new Configuration();
        }
        return conf;
    }
    
    public static String getTitle(){
        return getConfigurationFile().config.getProperty("title");
    }
    
    public static String getDateOfRelease(){
        return getConfigurationFile().config.getProperty("dateOfRelease");
    }
    
    public static String getThisVersion(){
        return getConfigurationFile().config.getProperty("thisVersion");
    }
    
    public static String getLatestVersion(){
        return getConfigurationFile().config.getProperty("latestVersion");
    }
    
    public static String getPreviousVersion(){
        return getConfigurationFile().config.getProperty("previousVersion");
    }
    
    public static String getRevision(){
        return getConfigurationFile().config.getProperty("revision");
    }
    
    public static String getAuthors(){
        return getConfigurationFile().config.getProperty("authors");
    }
    public static String getAuthorsURL(){
        return getConfigurationFile().config.getProperty("authorURL");
    }
    public static String getAuthorInstitution(){
        return getConfigurationFile().config.getProperty("authorInstitution");
    }
    public static String getContributors(){
        return getConfigurationFile().config.getProperty("contributors");
    }
    public static String getContributorsURL(){
        return getConfigurationFile().config.getProperty("contributorsURL");
    }
    public static String getContributorsInstitution(){
        return getConfigurationFile().config.getProperty("contributorsInstitution");
    }
    public static String getImportsNames(){
        return getConfigurationFile().config.getProperty("importsNames");
    }
    public static String getImportsURLs(){
        return getConfigurationFile().config.getProperty("importsURLs");
    }
    public static String getExtendsNames(){
        return getConfigurationFile().config.getProperty("extendsNames");
    }
    public static String getExtendsURLS(){
        return getConfigurationFile().config.getProperty("extendsURLS");
    }
    public static String getLicense(){
        return getConfigurationFile().config.getProperty("license");
    }
    
    public static String getLicenseURL(){
        return getConfigurationFile().config.getProperty("licenseURL");
    }
    
    public static String getOntologyName(){
        return getConfigurationFile().config.getProperty("name");
    }
    
    public static String getOntologyPrefix(){
        return getConfigurationFile().config.getProperty("ontologyPrefix");
    }
    
    public static String getOntologyNamespaceURI(){
        return getConfigurationFile().config.getProperty("ontologyNamespaceURI");
    }
    
//    public static void main(String[] args){
//        System.out.println(Configuration.getTitle());
//        System.out.println(Configuration.getDateOfRelease());
//        System.out.println(Configuration.getThisVersion());
//        System.out.println(Configuration.getLatestVersion());
//        System.out.println(Configuration.getAuthors());
//        System.out.println(Configuration.getAuthorInstitution());
//        
//        //print the old values so I can replace them in the prop file
////        String subdueFolderPath = "C:"+File.separator+"Users"+File.separator+"Monen"+File.separator+"Documents"+File.separator+"NetBeansProjects"+File.separator+"MotifFinder"+File.separator+"SUBDUE_TOOL";
////        System.out.println(subdueFolderPath+File.separator+"input_graphs"+File.separator);        
////        System.out.println(subdueFolderPath+File.separator+"results"+File.separator);    
////        System.out.println(subdueFolderPath+File.separator+"Log"+File.separator);
////        System.out.println(subdueFolderPath+File.separator+"bin"+File.separator);
//    }
}
