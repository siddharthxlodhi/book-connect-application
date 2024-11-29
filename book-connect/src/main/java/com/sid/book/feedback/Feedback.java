package com.sid.book.feedback;

import com.sid.book.book.Book;
import com.sid.book.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback extends BaseEntity {
    private Double note;
    @Getter
    private String comment;

    @JoinColumn(name = "book_id")
    @ManyToOne
    private Book book;

    public Double getNote() {
      if (this.note == null) {
          return 0.0;
      }
      return this.note;
    }

}
