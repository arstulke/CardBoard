package de.arstulke.repositories;

import de.arstulke.model.CardBoard;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created CardBoardRepository.java in de.arstulke.repositories
 * by Arne on 03.03.2017.
 */
public interface CardBoardRepository extends CrudRepository<CardBoard, Long> {
    List<CardBoard> findAll();
}
