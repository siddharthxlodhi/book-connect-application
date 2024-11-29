package com.sid.book.googleBooks;

import com.sid.book.common.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

import static java.lang.Math.log;

@Slf4j
@RequiredArgsConstructor
@Service
public class GoogleBookService {

    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${application.google.Book.Key}")
    private String API_KEY;


    private final String BASE_URL = "https://www.googleapis.com/books/v1/volumes";

    public PageResponse<Item> searchBooks(String query, int startIndex, int maxResults, String orderBy, String filter) {
        StringBuilder url = new StringBuilder(BASE_URL + "?q=" + query + "&startIndex=" + startIndex + "&maxResults=" + maxResults + "&key=" + API_KEY);

        if (orderBy != null && !orderBy.isEmpty()) {
            url.append("&orderBy=").append(orderBy);
        }
        if (filter != null && !filter.isEmpty()) {
            url.append("&filter=").append(filter);
        }

        GoogleBookResponse response = restTemplate.getForObject(url.toString(), GoogleBookResponse.class);
        List<Item> items = response != null && response.getItems() != null ? response.getItems() : Collections.emptyList();
        long totalItems = response != null && response.getItems() != null ? response.getTotalItems() : 0;

        PageResponse<Item> pagedResponse = createPagedResponse(items, startIndex, maxResults,totalItems);
        return pagedResponse;
    }


    public static <T> PageResponse<T> createPagedResponse(List<T> items, int startIndex, int size, long totalElements) {
        PageResponse<T> response = new PageResponse<>();
        int currentPage = startIndex / size;
        int totalPages = (int) Math.ceil((double) totalElements / size);
        response.setNumber(currentPage);
        response.setSize(size);
        response.setTotalElements(totalElements);
        response.setTotalPages(totalPages);
        response.setFirst(currentPage == 0);
        response.setLast(currentPage == totalPages - 1);
        response.setContent(items);
        return response;
    }

}
