package com.sid.book.book;
import com.sid.book.common.PageResponse;
import com.sid.book.customExceptions.OperationNotPermittedException;
import com.sid.book.file.FileStorageService;
import com.sid.book.history.BookTransactionHistory;
import com.sid.book.history.BookTransactionHistoryRepo;
import com.sid.book.notification.Notification;
import com.sid.book.notification.NotificationService;
import com.sid.book.notification.NotificationStatus;
import com.sid.book.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

import static com.sid.book.notification.NotificationStatus.RETURNED;
import static com.sid.book.notification.NotificationStatus.RETURN_APPROVED;

@RequiredArgsConstructor
@Service
public class BookService {

    private final BookRepository bookRepository;
    private final BookTransactionHistoryRepo historyRepo;
    private final BookMapper mapper;
    private final NotificationService notificationService;
    private final FileStorageService fileStorageService;


    public Integer saveBook(BookRequest bookRequest, Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        Book book = mapper.toBook(bookRequest);
        book.setOwner(user);
        return bookRepository.save(book).getId();

    }

    public BookResponse findBookById(Integer bookId) {
        return bookRepository.findById(bookId)
                .map(mapper::toBookResponse)
                .orElseThrow(() -> new EntityNotFoundException("Book not found with id:" + bookId));
    }


    public PageResponse<BookResponse> findAllBooks(int pageNo, int pageSize, Authentication connectedUser) {
//        User user = (User) connectedUser.getPrincipal(); we used created by
        Pageable pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDate").descending());
        Page<Book> books = bookRepository.findAllDisplayableBooks(pageRequest, connectedUser.getName());
        List<BookResponse> bookResponseList = books.map(mapper::toBookResponse).toList();
        return new PageResponse<>(
                bookResponseList, -
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public PageResponse<BookResponse> findAllBooksByOwner(int pageNo, int pageSize, Authentication connectedUser) {
        Pageable pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDate").descending());
        Page<Book> books = bookRepository.findAll(BookSpecification.withOwner(connectedUser.getName()), pageRequest);
        List<BookResponse> bookResponseList = books.map(mapper::toBookResponse).toList();
        return new PageResponse<>(
                bookResponseList,
                books.getNumber(),
                books.getSize(),
                books.getTotalElements(),
                books.getTotalPages(),
                books.isFirst(),
                books.isLast()
        );
    }

    public PageResponse<BorrowedBookResponse> findAllBorrowedBooks(int pageNo, int pageSize, Authentication connectedUser) {
        Pageable pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDate").descending());
        Page<BookTransactionHistory> allBorrowedBooks = historyRepo.findAllBorrowedBooks(pageRequest, connectedUser.getName());
        List<BorrowedBookResponse> borrowedBookResponsesList = allBorrowedBooks.map(mapper::toBorrowedBookResponse).toList();
        return new PageResponse<>(
                borrowedBookResponsesList,
                allBorrowedBooks.getNumber(),
                allBorrowedBooks.getSize(),
                allBorrowedBooks.getTotalElements(),
                allBorrowedBooks.getTotalPages(),
                allBorrowedBooks.isFirst(),
                allBorrowedBooks.isLast()
        );
    }

    //todo update
    public PageResponse<BorrowedBookResponse> findAllReturnedBooks(int pageNo, int pageSize, Authentication connectedUser) {
        Pageable pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDate").descending());
        Page<BookTransactionHistory> allReturnedBooks = historyRepo.findAllReturnedBooks(pageRequest, connectedUser.getName());
        List<BorrowedBookResponse> returnedBookResponsesList = allReturnedBooks.map(mapper::toBorrowedBookResponse).toList();
        return new PageResponse<>(
                returnedBookResponsesList,
                allReturnedBooks.getNumber(),
                allReturnedBooks.getSize(),
                allReturnedBooks.getTotalElements(),
                allReturnedBooks.getTotalPages(),
                allReturnedBooks.isFirst(),
                allReturnedBooks.isLast()
        );
    }

    public Integer updateShareableStatus(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("No book found with BookId:" + bookId));
        if (!Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You can not update other books shareable status");
        }
        book.setShareable(!book.isShareable());
        bookRepository.save(book);
        return bookId;
    }

    public Integer updateArchieveStatus(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("No book found with BookId:" + bookId));
        if (!Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You can not update other books Archive status");
        }
        book.setArchived(!book.isArchived());
        bookRepository.save(book);
        return bookId;
    }

    public Integer borrowBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with Book id:" + bookId));

        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("The requested book cannot be borrowed since it is archived or not shareable");
        }
        if (Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot borrow your own book");
        }
        final boolean isbookAlreadyBorrowed = historyRepo.isAlreadyBorrowed(bookId);
        if (isbookAlreadyBorrowed) {
            throw new OperationNotPermittedException("Book is already borrowed and it is still not returned or the return is not approved by the owner ");
        }
        ;
        BookTransactionHistory history = BookTransactionHistory
                .builder()
                .userId(connectedUser.getName())
                .book(book)
                .returned(false)
                .returnApproved(false)
                .build();

        BookTransactionHistory transactionHistory = historyRepo.save(history);
        notificationService.sendNotification(
                book.getCreatedBy(),
                Notification.builder().status(NotificationStatus.BORROWED).bookTitle(book.getTitle()).message("Your book has been borrowed").build()
        );
        return transactionHistory.getId();
    }

    public Integer returnBorrowedBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with Book id:" + bookId));

        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("The requested book cannot be borrowed since it is archived or not shareable");
        }
        if (Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot borrow or return your own book");
        }
        User user = (User) connectedUser.getPrincipal();
        BookTransactionHistory requiredHistory = historyRepo.findHistoryWithBookIdUserID(bookId, user.getName()).orElseThrow(() -> new OperationNotPermittedException("You have not borrowed this book"));
        requiredHistory.setReturned(true);
        BookTransactionHistory history = historyRepo.save(requiredHistory);
        notificationService.sendNotification(
                book.getCreatedBy(),
                Notification.builder().status(RETURNED).bookTitle(book.getTitle()).message("Your book has been returned").build()
        );
        return history.getId();
    }

    public Integer approveReturnBorrowedBook(Integer bookId, Authentication connectedUser) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new EntityNotFoundException("Book not found with Book id:" + bookId));

        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedException("The requested book cannot be borrowed since it is archived or not shareable");
        }
        if (!Objects.equals(book.getCreatedBy(), connectedUser.getName())) {
            throw new OperationNotPermittedException("You cannot approve the return of a book you not own ");
        }
        BookTransactionHistory history = historyRepo.findHistoryWithBookIdOwnerID(bookId, connectedUser.getName()).orElseThrow(() -> new OperationNotPermittedException("No return approved request for this book found"));
        history.setReturnApproved(true);
        var saved = historyRepo.save(history);
        notificationService.sendNotification(
                history.getCreatedBy(),
                Notification.builder().status(RETURN_APPROVED).bookTitle(book.getTitle()).message("Your book return has been approved").build()
        );
        return saved.getId();
    }

    public void uploadBookCoverPicture(MultipartFile file, Authentication connectedUser, Integer bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + bookId));

        var profilePicture = fileStorageService.saveFile(file, connectedUser.getName());
        book.setBookCover(profilePicture);
        bookRepository.save(book);
    }
}
