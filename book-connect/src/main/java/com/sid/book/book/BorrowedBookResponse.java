package com.sid.book.book;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {

    private Integer id;
    private String title;
    private String authorName;
    private String isbn;
    private double rate;
    private String synopsis;
    private boolean returned;
    private boolean returnApproved;
    private String owner;
    private String borrower;
}
