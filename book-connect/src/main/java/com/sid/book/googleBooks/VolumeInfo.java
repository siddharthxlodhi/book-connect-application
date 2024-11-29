package com.sid.book.googleBooks;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class VolumeInfo {

    private String title;
    private String subtitle;
    private List<String> authors;
    private String publisher;
    private String publishedDate;
    private String description;
    private List<IndustryIdentifier> industryIdentifiers;
    private int pageCount;
    private String printType;
    private List<String> categories;
    private double averageRating;
    private int ratingsCount;
    private String maturityRating;
    private String language;
    private String previewLink;
    private String infoLink;
    private String canonicalVolumeLink;
    private ImageLinks imageLinks;

}
