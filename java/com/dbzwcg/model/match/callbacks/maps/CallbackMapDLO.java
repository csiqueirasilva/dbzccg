/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.callbacks.maps;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.callbacks.returns.CallbackReturn;
import com.dbzwcg.model.match.callbacks.sets.CallbackSet;
import com.dbzwcg.model.match.log.MatchEvent;

/**
 *
 * @author csiqueira
 */
public class CallbackMapDLO {

    public static CallbackReturn solveCallbacks(CallbackMap map, Match m, MatchEvent event) {
        Class c = event.getClass();
        CallbackSet cs = map.get(c);
        CallbackReturn ret = null;

        if (cs != null) {
            ret = cs.resolveCallbacks(m, event);
            if (cs.size() == 0) {
                map.remove(c);
            }
        }

        if (ret == null) {
            ret = new CallbackReturn();

        }

        return ret;
    }
}
