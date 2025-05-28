package com.sid.book.test;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Objects;

@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;
    @Value("${supabase.Api-key}")
    private String supabaseApiKey;

    @Value("${supabase.bucket}")
    private String bucket;

    private WebClient getClient() {
        return WebClient.builder()
                .baseUrl(supabaseUrl)
                .defaultHeader("apikey", supabaseApiKey)
                .defaultHeader("Authorization", "Bearer " + supabaseApiKey)
                .build();
    }

    public Mono<String> uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "-" + Objects.requireNonNull(file.getOriginalFilename());

        // ✅ Correct upload path with upsert=true
        String uploadPath = "/storage/v1/object/" + bucket + "/" + fileName + "?upsert=true";

        return getClient().put()
                .uri(uploadPath)
                .contentType(MediaType.parseMediaType(Objects.requireNonNull(file.getContentType())))
                .bodyValue(file.getBytes())
                .retrieve()
                .toBodilessEntity()
                .map(response -> supabaseUrl + "/storage/v1/object/public/" + bucket + "/" + fileName);
    }


}
