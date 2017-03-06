package de.arstulke.controller;

import de.arstulke.model.CardBoard;
import de.arstulke.model.Log;
import de.arstulke.repositories.CardBoardRepository;
import de.arstulke.repositories.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

/**
 * Created LogController.java in de.arstulke.controller
 * by Arne on 05.03.2017.
 */
@RestController
@CrossOrigin
@RequestMapping("log")
public class LogController {
    @Autowired
    private LogRepository logRepo;
    @Autowired
    private CardBoardRepository cardBoardRepo;

    @Transactional
    @GetMapping(value = "", produces = "application/json")
    public List<Log> readAll() {
        List<Log> logs = logRepo.findAll();
        logs.sort(Comparator.comparing(Log::getTime).reversed());
        return logs;
    }

    @Transactional
    @GetMapping(value = "/{id}", produces = "application/json")
    public List<Log> read(@PathVariable Long id) {
        List<Log> logs = logRepo.findByCardBoard(cardBoardRepo.findOne(id));
        logs.sort(Comparator.comparing(Log::getTime).reversed());
        return logs;
    }
}
