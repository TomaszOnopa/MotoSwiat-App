package com.example.zpabd.opinion;

import com.example.zpabd.opinion.dto.NewOpinionRequest;
import com.example.zpabd.opinion.dto.OpinionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@RequestMapping("/api/opinion")
@RequiredArgsConstructor
public class OpinionController {
    private final OpinionService opinionService;

    @GetMapping("/get")
    public ResponseEntity<?> opinion(Principal principal, Long carId) {
        try {
            return ResponseEntity.ok(opinionService.getUserOpinion(principal.getName(), carId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> opinions(@RequestParam Long carId, @RequestParam(defaultValue = "1") int page) {
        try {
            return ResponseEntity.ok(opinionService.getOpinions(carId, page));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/avg")
    public ResponseEntity<?> opinionsAvg(@RequestParam Long carId) {
        try {
            return ResponseEntity.ok(opinionService.getRatingAvg(carId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(Principal principal, @RequestBody NewOpinionRequest request) {
        try {
            OpinionDto opinion = opinionService.addOpinion(principal.getName(), request);
            if (opinion != null)
                return ResponseEntity.ok(opinion);
            else
                return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(Principal principal, @RequestParam Long opinionId) {
        try {
            opinionService.deleteOpinion(principal.getName(), opinionId);
            return ResponseEntity.ok().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
