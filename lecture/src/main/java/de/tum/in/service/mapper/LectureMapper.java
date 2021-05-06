package de.tum.in.service.mapper;

import de.tum.in.domain.*;
import de.tum.in.service.dto.LectureDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lecture} and its DTO {@link LectureDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LectureMapper extends EntityMapper<LectureDTO, Lecture> {}
