/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Copyright 2012-2013 Ontology Engineering Group, Universidad Politécnica de Madrid, Spain
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
 * Class for representing the ontology objects
 * @author Daniel Garijo
 */
public class Ontology {
    private String name;
    private String namespacePrefix;
    private String namespaceURI;

    public Ontology() {
    }

    public Ontology(String name, String namespacePrefix, String namespaceURI) {
        this.name = name;
        this.namespacePrefix = namespacePrefix;
        this.namespaceURI = namespaceURI;
    }

    public String getName() {
        return name;
    }
    
    public String getNamespacePrefix() {
        return namespacePrefix;
    }

    public String getNamespaceURI() {
        return namespaceURI;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNamespaceURI(String namespaceURI) {
        this.namespaceURI = namespaceURI;
    }

    public void setNamespacePrefix(String namespacePrefix) {
        this.namespacePrefix = namespacePrefix;
    }
}
