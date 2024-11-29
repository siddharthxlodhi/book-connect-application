package com.sid.book.book;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BookResponse {

 private Integer id;
 private String title;
 private String authorName;
 private String isbn;
 private String synopsis;
 private String owner;
 private byte[] cover;
 private boolean archived;
 private boolean shareable;
 private double rate;

}
