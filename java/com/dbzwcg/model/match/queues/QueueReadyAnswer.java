/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.queues;

/**
 *
 * @author csiqueira
 */
public class QueueReadyAnswer {
    private Boolean answer;
    private QueuedPlayer player;

    public Boolean getAnswer() {
        return answer;
    }

    public void setAnswer(Boolean answer) {
        this.answer = answer;
    }

    public QueuedPlayer getPlayer() {
        return player;
    }

    public void setPlayer(QueuedPlayer player) {
        this.player = player;
    }
}
