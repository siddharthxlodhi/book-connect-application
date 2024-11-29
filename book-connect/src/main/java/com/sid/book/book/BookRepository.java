package com.sid.book.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {


    @Query(
            "SELECT book FROM Book book where  book.archived=false AND book.shareable=true AND book.createdBy!= :username"
    )
    Page<Book> findAllDisplayableBooks(Pageable pageRequest, @Param("username") String username);
}
