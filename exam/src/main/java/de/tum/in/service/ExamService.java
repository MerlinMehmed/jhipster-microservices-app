package de.tum.in.service;

import de.tum.in.domain.Exam;
import de.tum.in.repository.ExamRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Exam}.
 */
@Service
@Transactional
public class ExamService {

    private final Logger log = LoggerFactory.getLogger(ExamService.class);

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    /**
     * Save a exam.
     *
     * @param exam the entity to save.
     * @return the persisted entity.
     */
    public Exam save(Exam exam) {
        log.debug("Request to save Exam : {}", exam);
        return examRepository.save(exam);
    }

    /**
     * Partially update a exam.
     *
     * @param exam the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Exam> partialUpdate(Exam exam) {
        log.debug("Request to partially update Exam : {}", exam);

        return examRepository
            .findById(exam.getId())
            .map(
                existingExam -> {
                    if (exam.getName() != null) {
                        existingExam.setName(exam.getName());
                    }

                    return existingExam;
                }
            )
            .map(examRepository::save);
    }

    /**
     * Get all the exams.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Exam> findAll() {
        log.debug("Request to get all Exams");
        return examRepository.findAll();
    }

    /**
     * Get one exam by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Exam> findOne(Long id) {
        log.debug("Request to get Exam : {}", id);
        return examRepository.findById(id);
    }

    /**
     * Delete the exam by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Exam : {}", id);
        examRepository.deleteById(id);
    }
}
