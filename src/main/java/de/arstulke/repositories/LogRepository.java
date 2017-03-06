package de.arstulke.repositories;

import de.arstulke.model.Log;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created LogRepository.java in de.arstulke.repositories
 * by Arne on 05.03.2017.
 */
public interface LogRepository extends CrudRepository<Log, Long> {
    List<Log> findAll();
}
