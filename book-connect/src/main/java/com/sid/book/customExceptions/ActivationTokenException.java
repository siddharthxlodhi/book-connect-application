package com.sid.book.customExceptions;

import lombok.Getter;

@Getter
public class ActivationTokenException extends RuntimeException {

    public ActivationTokenException(String message) {
        super(message);
    }


}
