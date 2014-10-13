/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.dbzwcg.model.match.queues;

import java.util.List;

/**
 *
 * @author csiqueira
 */
public class QueueReadyAlert {
    private List<QueueReadyAnswer> answers;
    private final Long timestamp = System.currentTimeMillis();

    public List<QueueReadyAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<QueueReadyAnswer> answers) {
        this.answers = answers;
    }

    public Long getTimestamp() {
        return timestamp;
    }
}