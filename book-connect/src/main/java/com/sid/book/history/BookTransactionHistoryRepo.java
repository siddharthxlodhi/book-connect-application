package com.sid.book.history;

import com.sid.book.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookTransactionHistoryRepo extends JpaRepository<BookTransactionHistory, Integer> {


    @Query(
            "SELECT history FROM BookTransactionHistory history WHERE history.userId= :userId"
    )
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageRequest, @Param("userId") String userId);

    @Query(
            "SELECT history FROM BookTransactionHistory history WHERE history.book.createdBy= :username"
    )
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageRequest, @Param("username") String username);

    @Query("""
            SELECT
            (COUNT (*) > 0) AS isBorrowed
            FROM BookTransactionHistory bookTransactionHistory
            WHERE bookTransactionHistory.book.id = :bookId
            AND bookTransactionHistory.returnApproved = false
            """)
    boolean isAlreadyBorrowed(@Param("bookId") Integer bookId);

    @Query("""
            SELECT bookTransactionHistory
            FROM BookTransactionHistory bookTransactionHistory
            WHERE bookTransactionHistory.book.id = :bookId
            AND bookTransactionHistory.userId= :username
            AND bookTransactionHistory.returned = false
            AND bookTransactionHistory.returnApproved=false
            """
    )
    Optional<BookTransactionHistory> findHistoryWithBookIdUserID(@Param("bookId") Integer bookId, @Param("username") String username);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory  transaction
            WHERE transaction.book.createdBy = :owner
            AND transaction.book.id = :bookId
            AND transaction.returned = true
            AND transaction.returnApproved = false
            """
    )
    Optional<BookTransactionHistory> findHistoryWithBookIdOwnerID(Integer bookId, String owner);
}
