/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *      
 * Copyright (c) 2010-2013, Silvio Peroni <essepuntato@gmail.com>
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
package lode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author Silvio Peroni, adpated by Daniel Garijo
 */
public class SourceExtractor {
	private final List<String> mimeTypes;

	public SourceExtractor() {
		mimeTypes = new ArrayList<String>();
	}
	
	public void addMimeType(String mimeType){
		mimeTypes.add(mimeType);
	}
	
	public void addMimeTypes(String[] mimeTypes) {
		for (String mimeType : mimeTypes) {
			addMimeType(mimeType);
		}
	}
	
	public void removeMimeType(String mimeType){
		mimeTypes.remove(mimeType);
	}
	
	public String exec(URL url) throws IOException {
		String result = "";
		String ex = "\n";
		
		HttpURLConnection.setFollowRedirects(false);
		
		for (String mimeType : mimeTypes) {
			try {
				boolean redirect = true;
				HttpURLConnection connection = null;
				
				while (redirect) {
					connection = (HttpURLConnection) url.openConnection();
					connection.setInstanceFollowRedirects(false);
					connection.setRequestProperty("User-Agent", "LODE extractor");
					connection.setRequestProperty("Accept", mimeType);
					
					redirect = false;
					
					int status = connection.getResponseCode();
					if (status != HttpURLConnection.HTTP_OK) {
						if (status == HttpURLConnection.HTTP_MOVED_TEMP
							|| status == HttpURLConnection.HTTP_MOVED_PERM
								|| status == HttpURLConnection.HTTP_SEE_OTHER)
						redirect = true;
					}
					
					if (redirect) {
						url = new URL(connection.getHeaderField("Location"));
					}
				}
				
				BufferedReader in = new BufferedReader(
						new InputStreamReader(connection.getInputStream()));
			
				String line;
				while ((line = in.readLine()) != null) {
					result += line + "\n";
				}
				
				in.close();
				break;
			} catch (IOException e) {
				ex += "# " + e.getMessage() + "\n";
			}
		}
		
		if (result == null || result.equals("")) {
			throw new IOException("The source can't be downloaded in any permitted format." + ex);
		} else {
			return result;
		}
	}
}
