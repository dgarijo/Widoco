/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oops;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author dgarijo
 */
public class OOPSevaluationTest {
    
    public OOPSevaluationTest() {
    }

    /**
     * Test of printEvaluation method, of class OOPSevaluation.
     */
    @Test //(Commented out because OOPS! WS seems to be down
    public void testPrintEvaluation()  {
        try{
        System.out.println("printEvaluation with alo");
        String content = null;
        BufferedReader br = new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream("/alo.owl")));
        try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                        sb.append(line);
                        sb.append(System.lineSeparator());
                        line = br.readLine();
                }
                content = sb.toString();
        } finally {
                br.close();
        }
        // The ontology has 6 pitfalls
        OOPSevaluation instance = new OOPSevaluation(content);
        instance.printEvaluation();        
        assertEquals(6, instance.getPitfallNumber());
        }catch(IOException e){
            fail("Error in test "+e.getMessage());
        }
    }
    
    @Test
    public void testPrintEvaluation2()  {
        try{
        System.out.println("printEvaluation with p-plan");
        String content = null;
        BufferedReader br = new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream("/p-plan.owl")));
        try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();

                while (line != null) {
                        sb.append(line);
                        sb.append(System.lineSeparator());
                        line = br.readLine();
                }
                content = sb.toString();
        } finally {
                br.close();
        }
        // The ontology has 6 pitfalls
        OOPSevaluation instance = new OOPSevaluation(content);
        instance.printEvaluation();        
        assertEquals(3, instance.getPitfallNumber());
        }catch(IOException e){
            fail("Error in test "+e.getMessage());
        }
    }
    
}
