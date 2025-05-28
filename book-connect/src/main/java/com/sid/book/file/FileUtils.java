package com.sid.book.file;

import io.micrometer.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
@Slf4j
public class FileUtils {

//    public static byte[] readFileFromLocation(String fileUrl) {
//        if (StringUtils.isBlank(fileUrl)) {
//            return null;
//        }
//        try {
//            Path filePath = new File(fileUrl).toPath();
//            return Files.readAllBytes(filePath);
//        } catch (IOException e) {
//            log.warn("Nou file found in the path {}", fileUrl);
//        }
//        return null;
//    }

    public static byte[] readFileFromLocation(String fileUrl) {
        if (StringUtils.isBlank(fileUrl)) {
            return null;
        }

        try {
            if (fileUrl.startsWith("http")) {
                // It's a Supabase or other cloud URL
                try (InputStream in = new URL(fileUrl).openStream()) {
                    return in.readAllBytes();
                }
            } else {
                // It's a local file path
                Path filePath = new File(fileUrl).toPath();
                return Files.readAllBytes(filePath);
            }
        } catch (IOException e) {
            log.warn("File not found or failed to read from path/url: {}", fileUrl);
            return null;
        }
    }



}
