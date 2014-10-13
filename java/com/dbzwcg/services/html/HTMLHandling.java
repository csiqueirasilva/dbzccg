/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dbzwcg.services.html;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author csiqueira
 */
public class HTMLHandling {

    public static String getURLContent(String url) {
        URL u;
        InputStream is = null;
        BufferedReader br;
        String total = null;
        try {
            u = new URL(url);
            is = u.openStream();  // throws an IOException
            br = new BufferedReader(new InputStreamReader(is));

            String line;
            total = "";
            while ((line = br.readLine()) != null) {
                total += line;
            }
        } catch (IOException e) {
            total = null;
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException ioe) {
                // nothing to see here
            }
        }
        return total;
    }

    public static List<String> getNews() {
        List<String> ret = new ArrayList<>();

        try {
            Document d = Jsoup.parse(new URL("http://dragonballzocg.com/forums/index.php?/forum/120-dragon-ball-z-ccg-video-game/"), 1000);
            Elements titles = (Elements) d.getElementsByClass("topic_title");

            if (titles.isEmpty()) {
                ret.add("No news available");
            } else {
                for (int i = 0; i < titles.size() && i < 5; i++) {
                    Element title = titles.get(i);
                    Elements siblings = title.siblingElements();
                    Element username = null;
                    for (int j = siblings.size() - 1; j >= 0 && username == null; j--) {
                        if (siblings.get(j).classNames().contains("username")) {
                            username = siblings.get(j);
                        }
                    }

                    String displayableUserName = username != null ? " - " + username.text() : "";

                    String str = "<a href='" + title.attr("href") + "' target='_blank'>" + title.text() + "</a>" + displayableUserName;

                    ret.add(str);
                }
            }

        } catch (IOException e) {
            ret.add("No news available");
        }
        return ret;
    }

}
