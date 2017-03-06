package de.arstulke.repositories;

import de.arstulke.model.Card;
import org.springframework.data.repository.CrudRepository;

/**
 * Created CardRepository.java in de.arstulke.repositories
 * by Arne on 03.03.2017.
 */
public interface CardRepository extends CrudRepository<Card, Long> {
}
