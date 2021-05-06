package de.tum.in.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LectureMapperTest {

    private LectureMapper lectureMapper;

    @BeforeEach
    public void setUp() {
        lectureMapper = new LectureMapperImpl();
    }
}
