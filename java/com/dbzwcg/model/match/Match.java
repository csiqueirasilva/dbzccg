/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.model.match;

import com.dbzwcg.model.gamemechanics.turns.Turn;
import com.dbzwcg.model.match.callbacks.maps.CallbackMap;
import com.dbzwcg.model.match.card.effects.floatings.FloatingEffect;
import com.dbzwcg.model.match.log.MatchEvent;
import com.dbzwcg.model.match.phase.Phase;
import com.dbzwcg.model.match.physicaltables.PhysicalAttackTable;
import com.dbzwcg.model.match.players.MatchPlayer;
import com.dbzwcg.model.players.Player;
import com.dbzwcg.tools.enums.CollectionEnumJsonSerializer;
import com.dbzwcg.tools.enums.EnumJsonSerializer;
import com.dbzwcg.tools.enums.EnumTools;
import com.dbzwcg.types.CardType;
import com.dbzwcg.types.CollectionType;
import com.dbzwcg.types.MatchType;
import com.dbzwcg.model.users.user.User;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Queue;
import java.util.Stack;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

/**
 *
 * @author csiqueira
 */
@Entity(name = "GameMatch")
@SequenceGenerator(name = Match.SEQUENCE_NAME, sequenceName = Match.SEQUENCE_NAME, allocationSize = 1, initialValue = 1)
@Table
public class Match implements Serializable {

    public static final String SEQUENCE_NAME = "seq_match";

    @Column
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    protected DateTime creation;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = SEQUENCE_NAME)
    @Column(name = "id")
    protected Integer id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "match", orphanRemoval = true)
    protected List<MatchPlayer> players;

    @Column(name = "terminated")
    protected Boolean terminated;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn
    protected User winner;

    @OneToOne( cascade = CascadeType.ALL)
    @JoinColumn
    protected Phase currentPhase;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable
    protected List<Turn> turns;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable
    protected List<MatchEvent> pastEvents;

    @JsonSerialize(using = EnumJsonSerializer.class)
    @Column
    @Convert(converter = EnumTools.DatabaseConverter.class)
    protected MatchType type;

    @JsonSerialize(using = CollectionEnumJsonSerializer.class)
    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = CardType.class)
    @JoinTable
    protected Collection<CollectionType> validCollections;

    // Stack
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable
    protected Collection<MatchEvent> resumeEvents;

    // Queue
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable
    protected Collection<MatchEvent> interruptedEvents;

    // Queue
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable
    protected Collection<MatchEvent> queuedEvents;

    @Column(name = "waitingExternalInteraction")
    protected Boolean waitingExternalInteraction;

    @Column(name = "executingEffect")
    protected Boolean executingEffect;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn
    protected CallbackMap callbacks;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn
    protected PhysicalAttackTable pat;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    protected List<FloatingEffect> floatingEffects;

    public List<FloatingEffect> getFloatingEffects() {
        return floatingEffects;
    }

    public void setFloatingEffects(List<FloatingEffect> floatingEffects) {
        this.floatingEffects = floatingEffects;
    }

    public PhysicalAttackTable getPat() {
        return pat;
    }

    public void setPat(PhysicalAttackTable pat) {
        this.pat = pat;
    }

    public CallbackMap getCallbacks() {
        return callbacks;
    }

    public void setCallbacks(CallbackMap callbacks) {
        this.callbacks = callbacks;
    }

    public Stack<MatchEvent> getResumeEvents() {
        return (Stack<MatchEvent>) resumeEvents;
    }

    public void setResumeEvents(Stack<MatchEvent> resumeEvents) {
        this.resumeEvents = resumeEvents;
    }

    public Queue<MatchEvent> getInterruptedEvents() {
        return (Queue<MatchEvent>) interruptedEvents;
    }

    public void setInterruptedEvents(Queue<MatchEvent> interruptedEvents) {
        this.interruptedEvents = interruptedEvents;
    }

    public List<Turn> getTurns() {
        return turns;
    }

    public void setTurns(List<Turn> turns) {
        this.turns = turns;
    }

    public Boolean getExecutingEffect() {
        return executingEffect;
    }

    public void setExecutingEffect(Boolean executingEffect) {
        this.executingEffect = executingEffect;
    }

    public Boolean getWaitingExternalInteraction() {
        return waitingExternalInteraction;
    }

    public void setWaitingExternalInteraction(Boolean waitingExternalInteraction) {
        this.waitingExternalInteraction = waitingExternalInteraction;
    }

    public Queue<MatchEvent> getQueuedEvents() {
        return (Queue<MatchEvent>) queuedEvents;
    }

    public void setQueuedEvents(Queue<MatchEvent> events) {
        this.queuedEvents = events;
    }

    public List<MatchEvent> getPastEvents() {
        return pastEvents;
    }

    public void setPastEvents(List<MatchEvent> events) {
        this.pastEvents = events;
    }

    public Phase getCurrentPhase() {
        return currentPhase;
    }

    public void setCurrentPhase(Phase currentPhase) {
        this.currentPhase = currentPhase;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<MatchPlayer> getPlayers() {
        return players;
    }

    public void setPlayers(List<MatchPlayer> players) {
        this.players = players;
    }

    public Boolean getTerminated() {
        return terminated;
    }

    public void setTerminated(Boolean terminated) {
        this.terminated = terminated;
    }

    public Player getWinner() {
        return (Player) winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
    }

    public DateTime getCreation() {
        return creation;
    }

    public void setCreation(DateTime creation) {
        this.creation = creation;
    }

    public MatchType getType() {
        return type;
    }

    public void setType(MatchType type) {
        this.type = type;
    }

    public Collection<CollectionType> getValidCollections() {
        return validCollections;
    }

    public void setValidCollections(Collection<CollectionType> validCollections) {
        this.validCollections = validCollections;
    }
}
