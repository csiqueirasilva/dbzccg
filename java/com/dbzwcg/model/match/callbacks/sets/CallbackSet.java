/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.sets;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.Callback;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.log.MatchEvent;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;
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
@SequenceGenerator(name = CallbackSet.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
public class CallbackSet extends TreeSet<Callback> implements SortedSet<Callback> {

    @Id
    @Column
    @GeneratedValue(generator = SEQUENCE_NAME, strategy = GenerationType.SEQUENCE)
    private Long id;

    public final static String SEQUENCE_NAME = "seq_callback_set";

    final private static Comparator<? super Callback> comparator = new Comparator<Callback>() {
        @Override
        public int compare(Callback o1, Callback o2) {
            return o1.getPriority() - o2.getPriority();
        }
    };

    @Override
    public boolean add(Callback e) {
        e.setCallbackSet(this);
        return super.add(e);
    }

    @Override
    public boolean remove(Object o) {
        boolean ret = super.remove(o);
        if (ret) {
            Callback e = (Callback) o;
            e.setCallbackSet(null);
        }
        return ret;
    }

    @Override
    public Comparator<? super Callback> comparator() {
        return CallbackSet.comparator;
    }

    public CallbackReturn resolveCallbacks(Match m, MatchEvent event) {
        CallbackReturn ret = null;

        for (int i = this.size() - 1; i >= 0; i--) {
            Callback callback = this.last();
            ret = callback.exec(m, event);

            if (callback.getLife() == 0) {
                this.pollLast();
            }
        }

        return ret;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
