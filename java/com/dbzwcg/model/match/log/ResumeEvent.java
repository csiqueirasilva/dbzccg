/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match.log;

import com.dbzwcg.model.match.Match;
import com.dbzwcg.model.match.MatchDLO;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

/**
 *
 * @author csiqueira
 */
@Entity
@Table
@PrimaryKeyJoinColumn
public class ResumeEvent extends MatchEvent {
    
    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn
    private MatchEvent resumeEvent;

    protected ResumeEvent() {
    }

    public ResumeEvent (MatchEvent resumeEvent) {
        super.sourceActor = resumeEvent.sourceActor;
        super.targetActor = resumeEvent.targetActor;
        super.player = resumeEvent.player;
        this.resumeEvent = resumeEvent;
    }
    
    @Override
    protected void phaseEffect(Match m) {
        MatchDLO.resolveEvent(m, this.resumeEvent);
    }

    @Override
    public String logMessage() {
        return "RESUMING EVENT";
    }

    @Override
    public void applyFromDatabase(Match m) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}