package com.sid.book.test;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageUploadController {


    private final SupabaseStorageService storageService;

    @PostMapping("/upload")
    public Mono<ResponseEntity<String>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return storageService.uploadFile(file)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage())));
    }
}
