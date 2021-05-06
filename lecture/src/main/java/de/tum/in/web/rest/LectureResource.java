package de.tum.in.web.rest;

import de.tum.in.repository.LectureRepository;
import de.tum.in.service.LectureService;
import de.tum.in.service.dto.LectureDTO;
import de.tum.in.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link de.tum.in.domain.Lecture}.
 */
@RestController
@RequestMapping("/api")
public class LectureResource {

    private final Logger log = LoggerFactory.getLogger(LectureResource.class);

    private static final String ENTITY_NAME = "lectureLecture";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LectureService lectureService;

    private final LectureRepository lectureRepository;

    public LectureResource(LectureService lectureService, LectureRepository lectureRepository) {
        this.lectureService = lectureService;
        this.lectureRepository = lectureRepository;
    }

    /**
     * {@code POST  /lectures} : Create a new lecture.
     *
     * @param lectureDTO the lectureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lectureDTO, or with status {@code 400 (Bad Request)} if the lecture has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lectures")
    public ResponseEntity<LectureDTO> createLecture(@Valid @RequestBody LectureDTO lectureDTO) throws URISyntaxException {
        log.debug("REST request to save Lecture : {}", lectureDTO);
        if (lectureDTO.getId() != null) {
            throw new BadRequestAlertException("A new lecture cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LectureDTO result = lectureService.save(lectureDTO);
        return ResponseEntity
            .created(new URI("/api/lectures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lectures/:id} : Updates an existing lecture.
     *
     * @param id the id of the lectureDTO to save.
     * @param lectureDTO the lectureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lectureDTO,
     * or with status {@code 400 (Bad Request)} if the lectureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lectureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lectures/{id}")
    public ResponseEntity<LectureDTO> updateLecture(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LectureDTO lectureDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Lecture : {}, {}", id, lectureDTO);
        if (lectureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lectureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lectureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LectureDTO result = lectureService.save(lectureDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lectureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /lectures/:id} : Partial updates given fields of an existing lecture, field will ignore if it is null
     *
     * @param id the id of the lectureDTO to save.
     * @param lectureDTO the lectureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lectureDTO,
     * or with status {@code 400 (Bad Request)} if the lectureDTO is not valid,
     * or with status {@code 404 (Not Found)} if the lectureDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lectureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/lectures/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<LectureDTO> partialUpdateLecture(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LectureDTO lectureDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Lecture partially : {}, {}", id, lectureDTO);
        if (lectureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lectureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lectureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LectureDTO> result = lectureService.partialUpdate(lectureDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lectureDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /lectures} : get all the lectures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lectures in body.
     */
    @GetMapping("/lectures")
    public List<LectureDTO> getAllLectures() {
        log.debug("REST request to get all Lectures");
        return lectureService.findAll();
    }

    /**
     * {@code GET  /lectures/:id} : get the "id" lecture.
     *
     * @param id the id of the lectureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lectureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lectures/{id}")
    public ResponseEntity<LectureDTO> getLecture(@PathVariable Long id) {
        log.debug("REST request to get Lecture : {}", id);
        Optional<LectureDTO> lectureDTO = lectureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lectureDTO);
    }

    /**
     * {@code DELETE  /lectures/:id} : delete the "id" lecture.
     *
     * @param id the id of the lectureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lectures/{id}")
    public ResponseEntity<Void> deleteLecture(@PathVariable Long id) {
        log.debug("REST request to delete Lecture : {}", id);
        lectureService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
