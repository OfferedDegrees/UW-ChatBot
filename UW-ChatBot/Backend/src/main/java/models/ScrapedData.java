package com.example.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "scraped_data")
public class ScrapedData {

    @Id
    private String scrapeId;
    private String url;
    private String title;
    private String content;
    private List<String> tags;
    private LocalDateTime timestamp;

    public ScrapedData() {
    }

    public ScrapedData(String url, String title, String content, List<String> tags) {
        this.url = url;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.timestamp = LocalDateTime.now();
    }

    public String getScrapeId() {
        return scrapeId;
    }

    public void setScrapeId(String scrapeId) {
        this.scrapeId = scrapeId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
