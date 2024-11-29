package com.sid.book.feedback;

import com.sid.book.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

@Query(
        "SELECT feedback FROM Feedback feedback WHERE feedback.book.id= :bookId"
)
    Page<Feedback> findAll(Pageable pageRequest,@Param("bookId") Integer bookId);
}
