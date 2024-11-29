package com.sid.book.feedback;

import com.sid.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Feedback")
@RequiredArgsConstructor
@RestController
@RequestMapping("feedback")
public class FeedbackController {

    private final FeedbackService service;

    @PostMapping
    public ResponseEntity<Integer> saveFeedback(@Valid @RequestBody FeedbackRequest feedbackRequest, Authentication connectedUser) {
        return ResponseEntity.ok(service.saveFeedback(feedbackRequest, connectedUser));
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<PageResponse<FeedbackResponse>> findAllFeedbackByBook(
          @PathVariable  Integer bookId,
          @RequestParam(name = "pageNo", defaultValue = "0",required = false) int pageNo,
          @RequestParam(name = "pageSize", defaultValue = "10",required = false) int pageSize,
          Authentication connectedUser
    ){

        return ResponseEntity.ok(service.findAllFeedbackByBook(bookId,pageNo,pageSize,connectedUser));

    }

}
