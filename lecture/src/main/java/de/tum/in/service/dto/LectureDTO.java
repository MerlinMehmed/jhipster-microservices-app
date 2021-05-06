package de.tum.in.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link de.tum.in.domain.Lecture} entity.
 */
public class LectureDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String lecturer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LectureDTO)) {
            return false;
        }

        LectureDTO lectureDTO = (LectureDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lectureDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LectureDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lecturer='" + getLecturer() + "'" +
            "}";
    }
}
