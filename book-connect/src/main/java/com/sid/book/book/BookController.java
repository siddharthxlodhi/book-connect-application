package com.sid.book.book;

import com.sid.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Book")
@RequiredArgsConstructor
@RestController
@RequestMapping("book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/save")
    public ResponseEntity<Integer> saveBook(@RequestBody @Valid BookRequest bookRequest, Authentication authentication) {

        return ResponseEntity.ok(bookService.saveBook(bookRequest, authentication));
    }

    @GetMapping("{bookId}")
    public ResponseEntity<BookResponse> findBookById(@PathVariable Integer bookId) {
        return ResponseEntity.ok(bookService.findBookById(bookId));

    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks
            (@RequestParam(name = "pageNo", defaultValue = "0", required = false) int pageNo,
             @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
             Authentication connectedUser) {
        return ResponseEntity.ok(bookService.findAllBooks(pageNo, pageSize, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BookResponse>> findAllBooksByOwner
            (@RequestParam(name = "pageNo", defaultValue = "0", required = false) int pageNo,
             @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
             Authentication connectedUser) {
        return ResponseEntity.ok(bookService.findAllBooksByOwner(pageNo, pageSize, connectedUser));
    }

    @GetMapping("/borrowed")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllBorrowedBooks
            (@RequestParam(name = "pageNo", defaultValue = "0", required = false) int pageNo,
             @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
             Authentication connectedUser) {
        return ResponseEntity.ok(bookService.findAllBorrowedBooks(pageNo, pageSize, connectedUser));
    }

    @GetMapping("/returned")
    public ResponseEntity<PageResponse<BorrowedBookResponse>> findAllReturnedBooks
            (@RequestParam(name = "pageNo", defaultValue = "0", required = false) int pageNo,
             @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
             Authentication connectedUser) {
        return ResponseEntity.ok(bookService.findAllReturnedBooks(pageNo, pageSize, connectedUser));
    }

    @PatchMapping("/shareable/{bookId}")
    public ResponseEntity<Integer> updateBookShareableStatus(@PathVariable Integer bookId, Authentication connectedUser) {
        return ResponseEntity.ok(bookService.updateShareableStatus(bookId, connectedUser));
    }

    @PatchMapping("/archieved/{bookId}")
    public ResponseEntity<Integer> updateBookArchieveStatus(@PathVariable Integer bookId, Authentication connectedUser) {
        return ResponseEntity.ok(bookService.updateArchieveStatus(bookId, connectedUser));
    }

    @PostMapping("borrow/{bookId}")
    public ResponseEntity<Integer> borrowBook(@PathVariable Integer bookId, Authentication connectedUser) {

        return ResponseEntity.ok(bookService.borrowBook(bookId, connectedUser));
    }

    @PatchMapping("borrow/return/{bookId}")
    public ResponseEntity<Integer> returnBorrowedBook(@PathVariable Integer bookId, Authentication connectedUser) {

        return ResponseEntity.ok(bookService.returnBorrowedBook(bookId, connectedUser));
    }

    @PatchMapping("borrow/return/approve/{bookId}")
    public ResponseEntity<Integer> approveReturnBorrowedBook(@PathVariable Integer bookId, Authentication connectedUser) {

        return ResponseEntity.ok(bookService.approveReturnBorrowedBook(bookId, connectedUser));
    }

    @PostMapping(value = "cover/{bookId}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCover(
            @PathVariable Integer bookId,
            @RequestPart("file") MultipartFile file,
            Authentication connectedUser

    ) {
        bookService.uploadBookCoverPicture(file, connectedUser, bookId);
        return ResponseEntity.accepted().build();
    }
}
