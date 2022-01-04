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
package widoco.entities;

/**
 * Class for representing a contributor, author or an institution.
 * @author Daniel Garijo
 */
public class Agent {
    private String name;
    private String URL;
    private String email;
    private String institutionName;
    private String institutionURL;

    public Agent() {
    }

    public Agent(String name, String URL, String email, String institutionName, String institutionURL) {
        this.name = name;
        this.URL = URL;
        this.email = email;
        this.institutionName = institutionName;
        this.institutionURL = institutionURL;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public String getInstitutionURL() {
        return institutionURL;
    }

    public String getName() {
        return name;
    }

    public String getURL() {
        return URL;
    }

    public String getEmail() { return email; }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public void setInstitutionURL(String institutionURL) {
        this.institutionURL = institutionURL;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
