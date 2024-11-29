package com.sid.book.googleBooks;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccessInfo {

    private String country;
    private String viewability;
    private boolean embeddable;
    private boolean publicDomain;
    private String textToSpeechPermission;
    private String webReaderLink;
    private String accessViewStatus;
    private boolean quoteSharingAllowed;


}
