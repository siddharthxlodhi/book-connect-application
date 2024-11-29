package com.sid.book.googleBooks;

import com.sid.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "GoogleBook")
@RestController
@RequiredArgsConstructor
@RequestMapping("/googleBooks")
public class GoogleBookController {

    private final GoogleBookService googleBooksService;

    @GetMapping("/search")
    public ResponseEntity<PageResponse<Item>> searchBooks(@RequestParam String query,
                                                          @RequestParam int startIndex,
                                                          @RequestParam int maxResults,
                                                          @RequestParam(required = false) String orderBy,
                                                          @RequestParam(required = false) String filter) {
        PageResponse<Item> itemPageResponse = googleBooksService.searchBooks(query, startIndex, maxResults,orderBy,filter);
        return new ResponseEntity<>(itemPageResponse, HttpStatus.OK);
    }


}
