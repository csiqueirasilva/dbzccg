/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.maps;

import com.dbzwcg.model.match.callbacks.Callback;
import com.dbzwcg.model.match.callbacks.sets.CallbackSet;
import java.util.HashMap;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@SequenceGenerator(name = CallbackMap.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
public class CallbackMap extends HashMap<Class, CallbackSet> {

    @Id
    @Column
    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
    private Long id;

    public final static String SEQUENCE_NAME = "seq_callback_map";

    public void registerCallback(Class c, Callback callback) {
        CallbackSet cs;
        if (!this.containsKey(c)) {
            this.put(c, new CallbackSet());
        }
        cs = this.get(c);
        cs.add(callback);
    }

    public void unregisterCallback(Class c, Callback callback) {
        if (this.containsKey(c)) {
            CallbackSet cs = this.get(c);
            if (cs.remove(callback)) {
                if (cs.size() == 0) {
                    this.remove(c);
                }
            }
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
