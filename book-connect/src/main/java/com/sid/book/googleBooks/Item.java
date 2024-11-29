package com.sid.book.googleBooks;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {

    private String id;
    private VolumeInfo volumeInfo;
    private SaleInfo saleInfo;
    private AccessInfo accessInfo;
    private String selfLink;
}
