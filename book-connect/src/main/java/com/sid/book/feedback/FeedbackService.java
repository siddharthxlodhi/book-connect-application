package com.sid.book.feedback;

import com.sid.book.book.Book;
import com.sid.book.book.BookMapper;
import com.sid.book.book.BookRepository;
import com.sid.book.common.PageResponse;
import com.sid.book.customExceptions.OperationNotPermittedException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class FeedbackService {
    private final BookRepository bookRepository;
    private final FeedbackMapper mapper;
    private final FeedbackRepository repository;
    private final FeedbackRepository feedbackRepository;

    public Integer saveFeedback(FeedbackRequest feedbackRequest, Authentication connectedUser) {
        Book book = bookRepository.findById(feedbackRequest.bookId())
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + feedbackRequest.bookId()));
        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("You cannot give a feedback for and archived or not shareable book");
        }
        if (Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot give feedback to your own book");
        }
        Feedback feedback = mapper.toFeedback(feedbackRequest);
        return repository.save(feedback).getId();

    }

    public PageResponse<FeedbackResponse> findAllFeedbackByBook(Integer bookId, int pageNo, int pageSize, Authentication connectedUser) {
        Pageable pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDate").descending());

        Page<Feedback> feedbacks = feedbackRepository.findAll(pageRequest, bookId);
        List<FeedbackResponse> feedbackResponseList = feedbacks.map(feedback -> mapper.toFeedbackResponse(feedback, connectedUser.getName())).toList();
        return new PageResponse<>(feedbackResponseList
                , feedbacks.getNumber()
                , feedbacks.getSize()
                , feedbacks.getTotalElements()
                , feedbacks.getTotalPages()
                , feedbacks.isFirst()
                , feedbacks.isLast());
    }
}
