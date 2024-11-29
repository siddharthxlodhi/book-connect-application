package com.sid.book.book;

import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Book> withOwner(String username) {

        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("createdBy"), username));

    }
}
