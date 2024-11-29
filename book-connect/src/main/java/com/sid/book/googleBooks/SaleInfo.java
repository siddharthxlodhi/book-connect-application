package com.sid.book.googleBooks;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleInfo {
    private String country;
    private String saleability;
    private boolean isEbook;
    private Price listPrice;
    private Price retailPrice;
    private String buyLink;
}
