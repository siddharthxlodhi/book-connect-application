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


    private final String supabaseUrl="https://viobqsdmsmszszqbioqc.supabase.co";

    private final String supabaseApiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpb2Jxc2Rtc21zenN6cWJpb3FjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQ1MDc5OCwiZXhwIjoyMDY0MDI2Nzk4fQ.ppe_604E4AhI4wbdEu9qo9G94aTOlrh_t034GO3iakk";


    private final String bucket="uploads";

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
