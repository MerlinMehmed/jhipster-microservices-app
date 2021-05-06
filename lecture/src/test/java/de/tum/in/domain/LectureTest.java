package de.tum.in.domain;

import static org.assertj.core.api.Assertions.assertThat;

import de.tum.in.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LectureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lecture.class);
        Lecture lecture1 = new Lecture();
        lecture1.setId(1L);
        Lecture lecture2 = new Lecture();
        lecture2.setId(lecture1.getId());
        assertThat(lecture1).isEqualTo(lecture2);
        lecture2.setId(2L);
        assertThat(lecture1).isNotEqualTo(lecture2);
        lecture1.setId(null);
        assertThat(lecture1).isNotEqualTo(lecture2);
    }
}
