package com.sid.book.notification;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {

    private NotificationStatus status;
    private String message;
    private String bookTitle;


}



