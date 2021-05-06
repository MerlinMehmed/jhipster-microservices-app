package de.tum.in.service;

import de.tum.in.domain.Lecture;
import de.tum.in.repository.LectureRepository;
import de.tum.in.service.dto.LectureDTO;
import de.tum.in.service.mapper.LectureMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Lecture}.
 */
@Service
@Transactional
public class LectureService {

    private final Logger log = LoggerFactory.getLogger(LectureService.class);

    private final LectureRepository lectureRepository;

    private final LectureMapper lectureMapper;

    public LectureService(LectureRepository lectureRepository, LectureMapper lectureMapper) {
        this.lectureRepository = lectureRepository;
        this.lectureMapper = lectureMapper;
    }

    /**
     * Save a lecture.
     *
     * @param lectureDTO the entity to save.
     * @return the persisted entity.
     */
    public LectureDTO save(LectureDTO lectureDTO) {
        log.debug("Request to save Lecture : {}", lectureDTO);
        Lecture lecture = lectureMapper.toEntity(lectureDTO);
        lecture = lectureRepository.save(lecture);
        return lectureMapper.toDto(lecture);
    }

    /**
     * Partially update a lecture.
     *
     * @param lectureDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LectureDTO> partialUpdate(LectureDTO lectureDTO) {
        log.debug("Request to partially update Lecture : {}", lectureDTO);

        return lectureRepository
            .findById(lectureDTO.getId())
            .map(
                existingLecture -> {
                    lectureMapper.partialUpdate(existingLecture, lectureDTO);
                    return existingLecture;
                }
            )
            .map(lectureRepository::save)
            .map(lectureMapper::toDto);
    }

    /**
     * Get all the lectures.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LectureDTO> findAll() {
        log.debug("Request to get all Lectures");
        return lectureRepository.findAll().stream().map(lectureMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one lecture by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LectureDTO> findOne(Long id) {
        log.debug("Request to get Lecture : {}", id);
        return lectureRepository.findById(id).map(lectureMapper::toDto);
    }

    /**
     * Delete the lecture by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Lecture : {}", id);
        lectureRepository.deleteById(id);
    }
}
