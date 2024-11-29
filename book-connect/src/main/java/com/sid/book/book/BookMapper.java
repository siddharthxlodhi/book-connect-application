package com.sid.book.book;

import com.sid.book.file.FileUtils;
import com.sid.book.history.BookTransactionHistory;
import org.springframework.stereotype.Service;

import static com.sid.book.file.FileUtils.readFileFromLocation;

@Service
public class BookMapper {
    public Book toBook(BookRequest request) {
        return Book.builder()
                .id(request.id())
                .title(request.title())
                .isbn(request.isbn())
                .authorName(request.authorName())
                .synopsis(request.synopsis())
                .archived(false)
                .shareable(request.shareable())
                .build();
    }


    public BookResponse toBookResponse(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .authorName(book.getAuthorName())
                .isbn(book.getIsbn())
                .synopsis(book.getSynopsis())
                .archived(book.isArchived())
                .shareable(book.isShareable())
                .rate(book.getRate())
                .owner(book.getOwner().getFullName())
                .cover(readFileFromLocation(book.getBookCover()))
                .build();

    }

    public BorrowedBookResponse toBorrowedBookResponse(BookTransactionHistory history) {
        return BorrowedBookResponse.builder()
                .id(history.getBook().getId())
                .title(history.getBook().getTitle())
                .authorName(history.getBook().getAuthorName())
                .isbn(history.getBook().getIsbn())
                .synopsis(history.getBook().getSynopsis())
                .rate(history.getBook().getRate())
                .returned(history.isReturned())
                .returnApproved(history.isReturnApproved())
                .owner(history.getBook().getCreatedBy())
                .borrower(history.getUserId())
                .build();

    }
}
