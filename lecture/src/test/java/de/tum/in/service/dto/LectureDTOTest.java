package de.tum.in.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import de.tum.in.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LectureDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LectureDTO.class);
        LectureDTO lectureDTO1 = new LectureDTO();
        lectureDTO1.setId(1L);
        LectureDTO lectureDTO2 = new LectureDTO();
        assertThat(lectureDTO1).isNotEqualTo(lectureDTO2);
        lectureDTO2.setId(lectureDTO1.getId());
        assertThat(lectureDTO1).isEqualTo(lectureDTO2);
        lectureDTO2.setId(2L);
        assertThat(lectureDTO1).isNotEqualTo(lectureDTO2);
        lectureDTO1.setId(null);
        assertThat(lectureDTO1).isNotEqualTo(lectureDTO2);
    }
}
