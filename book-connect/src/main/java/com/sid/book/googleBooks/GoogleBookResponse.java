package com.sid.book.googleBooks;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class GoogleBookResponse {
    private List<Item> items;
    private int totalItems;
}
