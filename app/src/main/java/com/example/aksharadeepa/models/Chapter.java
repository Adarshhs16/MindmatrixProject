package com.example.aksharadeepa.models;

public class Chapter {
    private String id;
    private String title;
    private String subject;
    private String category;
    private boolean isCompleted;
    private String pdfUrl;

    public Chapter(String id, String title, String subject, String category, boolean isCompleted, String pdfUrl) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.category = category;
        this.isCompleted = isCompleted;
        this.pdfUrl = pdfUrl;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getCategory() { return category; }
    public boolean isCompleted() { return isCompleted; }
    public void setCompleted(boolean completed) { isCompleted = completed; }
    public String getPdfUrl() { return pdfUrl; }
}
