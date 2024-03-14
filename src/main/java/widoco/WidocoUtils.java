/*
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politecnica de Madrid, Spain
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package widoco;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.commons.io.FileUtils;
import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.io.FileDocumentSource;
import org.semanticweb.owlapi.model.*;
import org.semanticweb.owlapi.util.AutoIRIMapper;

/**
 * Some useful methods reused across different classes
 * 
 * @author Daniel Garijo
 */
public class WidocoUtils {

	private static final Logger logger = LoggerFactory.getLogger(WidocoUtils.class);
	public static final char JAR_SEPARATOR = '/';
	/**
	 * Method that will download the ontology to document with Widoco.
	 * 
	 * @param c Widoco configuration object.
	 * @throws java.lang.Exception
	 */
	public static void loadModelToDocument(Configuration c) throws Exception {
		if (!c.isFromFile()) {
			String newOntologyPath = c.getTmpFile().getAbsolutePath() + File.separator + "Ontology";
			downloadOntology(c.getOntologyURI(), newOntologyPath);
			c.setFromFile(true);
			c.setOntologyPath(newOntologyPath);
		}

		logger.info("Load ontology " + c.getOntologyPath());
		OWLOntologyManager manager = OWLManager.createOWLOntologyManager();
		OWLOntologyIRIMapper jenaCatalogMapper = new CatalogIRIMapper();
		manager.getIRIMappers().add(jenaCatalogMapper);
		((CatalogIRIMapper) jenaCatalogMapper).printMap();
		OWLOntologyLoaderConfiguration loadingConfig = new OWLOntologyLoaderConfiguration();
		loadingConfig = loadingConfig.setMissingImportHandlingStrategy(MissingImportHandlingStrategy.SILENT);
		if (c.getImports()!=null){
			for(File importDir:c.getImports()){
				AutoIRIMapper mapper = new AutoIRIMapper(importDir, true);
				manager.getIRIMappers().add(mapper);
			}
		}

		OWLOntology ontology = manager
				.loadOntologyFromOntologyDocument(new FileDocumentSource(new File(c.getOntologyPath())), loadingConfig);
		c.getMainOntology().setMainOntology(ontology);
		c.getMainOntology().setMainOntologyManager(manager);
		c.getMainOntology().getOWLAPIModel().setOWLOntologyManager(manager);
	}

	/**
	 * Method that will download an ontology given its URI, doing content
	 * negotiation The ontology will be downloaded in the first serialization
	 * available (see Constants.POSSIBLE_VOCAB_SERIALIZATIONS)
	 * 
	 * @param uri
	 *            the URI of the ontology
	 * @param downloadPath
	 *            path where the ontology will be saved locally.
	 */
	public static void downloadOntology(String uri, String downloadPath) {

		for (String serialization : Constants.POSSIBLE_VOCAB_SERIALIZATIONS) {
			logger.info("Attempting to download vocabulary in " + serialization);
			try {
				URL url = new URL(uri);
				HttpURLConnection connection = (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("GET");
				connection.setInstanceFollowRedirects(true);
				connection.setRequestProperty("Accept", serialization);
				int status = connection.getResponseCode();
				boolean redirect = false;
				if (status != HttpURLConnection.HTTP_OK) {
					if (status == HttpURLConnection.HTTP_MOVED_TEMP || status == HttpURLConnection.HTTP_MOVED_PERM
							|| status == HttpURLConnection.HTTP_SEE_OTHER)
						redirect = true;
				}
				// there are some vocabularies with multiple redirections:
				// 301 -> 303 -> owl
				while (redirect) {
					String newUrl = connection.getHeaderField("Location");
					connection = (HttpURLConnection) new URL(newUrl).openConnection();
					connection.setRequestProperty("Accept", serialization);
					status = connection.getResponseCode();
					if (status != HttpURLConnection.HTTP_MOVED_TEMP && status != HttpURLConnection.HTTP_MOVED_PERM
							&& status != HttpURLConnection.HTTP_SEE_OTHER)
						redirect = false;
				}
				InputStream in = (InputStream) connection.getInputStream();
				Files.copy(in, Paths.get(downloadPath), StandardCopyOption.REPLACE_EXISTING);
				in.close();
				break; // if the vocabulary is downloaded, then we don't download it for the other
						// serializations
			} catch (Exception e) {
				final String message = "Failed to download vocabulary in RDF format [" + serialization +"]: ";
				logger.error(message + e.toString());
				throw new RuntimeException(message, e);
			}
		}
	}

	/**
	 * Writes a model into a file
	 * 
	 * @param m
	 *            the manager
	 * @param o
	 *            the ontology to write
	 * @param f
	 *            the format in which should be written
	 * @param outPath
	 */
	public static void writeModel(OWLOntologyManager m, OWLOntology o, OWLDocumentFormat f, String outPath) {
		OutputStream out = null;
		try {
			out = new FileOutputStream(outPath);
			m.saveOntology(o, f, out);
			out.close();
		} catch (Exception ex) {
			logger.error("Error while writing the model to file " + ex.getMessage());
			if (out != null) {
				try {
					out.close();
				} catch (Exception e) {
				}
			}
		}
	}


	public static void copyResourceDir(String resourceFolder, File destinationFolder) throws IOException {
		// Determine if running from JAR or as source
		logger.info("Copying resource folder from "+resourceFolder+" to "+ destinationFolder);
		URL resourceUrl = WidocoUtils.class.getClassLoader().getResource(resourceFolder);
		if (!destinationFolder.exists())
			destinationFolder.mkdirs();
		if (resourceUrl == null || !resourceUrl.getProtocol().equals("file")) {
			// Running from JAR, use getResourceAsStream
			copyDirFromJar(resourceFolder, destinationFolder);

		} else {
			// Running from source, use Files.copy
			copyDirFromSrc(resourceFolder, destinationFolder);
		}

	}
	// inspired from
	// https://github.com/TriggerReactor/TriggerReactor/blob/7e71958b27231032c04d09795122dfc1d80c51b1/core/src/main/java/io/github/wysohn/triggerreactor/tools/JarUtil.java
	public static void copyDirFromJar(String folderName, File destFolder) throws IOException {

		byte[] buffer = new byte[1024];
		File fullPath = null;
		String path = WidocoUtils.class.getProtectionDomain().getCodeSource().getLocation().getPath();
		try {
			if (!path.startsWith("file"))
				path = "file://" + path;

			fullPath = new File(new URI(path));
		} catch (URISyntaxException e) {
			logger.error("URI syntax error");
		}
		ZipInputStream zis = new ZipInputStream(new FileInputStream(fullPath));

		ZipEntry entry;
		while ((entry = zis.getNextEntry()) != null) {
			if (!entry.getName().startsWith(folderName + JAR_SEPARATOR))
				continue;

			String fileName = entry.getName();

			// Remove the folderName from the fileName
			fileName = fileName.substring((folderName + JAR_SEPARATOR).length());

			File file = new File(destFolder + File.separator + fileName);

			if (fileName.isEmpty() || fileName.charAt(fileName.length() - 1) == JAR_SEPARATOR) {
				// Skip empty or directory entries
				continue;
			}

			if (!file.getParentFile().exists())
				file.getParentFile().mkdirs();

			if (!file.exists())
				file.createNewFile();
			FileOutputStream fos = new FileOutputStream(file);

			int len;
			while ((len = zis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
			fos.close();
		}
		zis.closeEntry();
		zis.close();
	}

	private static void copyDirFromSrc(String resourceFolder, File destinationFolder) throws IOException {
		URL resource = WidocoUtils.class.getClassLoader().getResource(resourceFolder);

		if (resource == null) {
			throw new IllegalArgumentException("Resource not found: " + resourceFolder);
		}
		try {
			File sourceFolder = new File(resource.toURI());
			// Copy only the contents of the source folder to the destination folder
			FileUtils.copyDirectory(sourceFolder, destinationFolder);
		} catch (URISyntaxException e) {
			throw new IOException("Error copying resources to the temp folder: " + e.getMessage(), e);
		} catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
	/**
	 * Method used to copy the local files: styles, images, etc.
	 * 
	 * @param resourceName
	 *            Name of the resource
	 * @param dest
	 *            file where we should copy it.
	 */
	public static void copyLocalResource(String resourceName, File dest) {
		try {
			copy(CreateResources.class.getResourceAsStream(resourceName), dest);
		} catch (Exception e) {
			logger.error("Exception while copying " + resourceName + " - " + e.getMessage());
		}
	}


	/**
	 * Auxiliary method for reading local resources and returning their content
	 * @param path
	 * 		path of the file
	 * @return
	 * 		content of the file
	 */
	public static String readExternalResource(String path) {
		String content = "";
		try{
			content = new String ( Files.readAllBytes( Paths.get(path) ) );
		}catch (IOException e){
			logger.error("Exception while copying " + path + e.getMessage());
		}
		return content;
	}


	public static void copy(InputStream is, File dest) throws Exception {
        try (OutputStream os = new FileOutputStream(dest)) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = is.read(buffer)) > 0) {
                os.write(buffer, 0, length);
            }
        } catch (Exception e) {
            logger.error("Exception while copying resource. " + e.getMessage());
            throw e;
        } finally {
            if (is != null)
                is.close();
        }
	}

	public static String getValueAsLiteralOrURI(OWLAnnotationValue v) {
		try {
			return v.asIRI().get().getIRIString();
		} catch (Exception e) {
			// instead of a resource, it was added as a String
			return v.asLiteral().get().getLiteral();
		}
	}

}
