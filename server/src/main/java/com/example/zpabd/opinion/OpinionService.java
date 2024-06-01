package com.example.zpabd.opinion;

import com.example.zpabd.car.Car;
import com.example.zpabd.car.CarRepository;
import com.example.zpabd.opinion.dto.NewOpinionRequest;
import com.example.zpabd.opinion.dto.OpinionDto;
import com.example.zpabd.opinion.dto.OpinionDtoMapper;
import com.example.zpabd.user.User;
import com.example.zpabd.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OpinionService {
    private final static int OPINIONS_PER_PAGE = 5;
    private final OpinionRepository opinionRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getOpinions(Long carId, int pageNum) {
        Pageable paging = PageRequest.of(pageNum-1, OPINIONS_PER_PAGE, Sort.by("creation_date").descending());
        Page<Opinion> page = opinionRepository.findAllByCar(carId, paging);

        List<OpinionDto> opinions = page
                .getContent()
                .stream()
                .map(OpinionDtoMapper::map)
                .toList();

        Map<String, Object> result = new HashMap<>();
        result.put("opinions", opinions);
        result.put("totalItems", page.getTotalElements());
        result.put("totalPages", page.getTotalPages());

        return result;
    }

    public Map<String, Object> getUserOpinion(String username, Long carId) {
        Map<String, Object> result = new HashMap<>();

        Optional<User> user = userRepository.findByUsername(username);
        Optional<Car> car = carRepository.findCarById(carId);

        if (car.isPresent() && user.isPresent()) {
            Optional<Opinion> opinion = opinionRepository.findByCarAndUser(car.get(), user.get());
            opinion.ifPresent(value -> result.put("opinion", OpinionDtoMapper.map(value)));
        }

        return result;
    }

    public Map<String, Float> getRatingAvg(Long carId) {
        Map<String, Float> result = new HashMap<>();

        Optional<Float> ratingAvg = opinionRepository.calcRatingAvg(carId);
        ratingAvg.ifPresent(avg -> result.put("rating", avg));

        return result;
    }

    public OpinionDto addOpinion(String username, NewOpinionRequest request) {
        if (request.rating() == null) return null;

        Optional<User> user = userRepository.findByUsername(username);
        Optional<Car> car = carRepository.findCarById(request.carId());

        if (car.isPresent() && user.isPresent()) {
            if (opinionRepository.existsByCarAndUser(car.get(), user.get()))
                return null;
            Opinion opinion = Opinion.builder()
                    .user(user.get())
                    .car(car.get())
                    .creationDate(Date.valueOf(LocalDate.now()))
                    .rating(request.rating())
                    .comment(request.comment())
                    .build();

            Opinion result = opinionRepository.save(opinion);
            return OpinionDtoMapper.map(result);
        }
        return null;
    }

    public void deleteOpinion(String username, Long opinionId) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            if (opinionRepository.existsByOpinionIdAndUser(opinionId, user.get())) {
                opinionRepository.deleteById(opinionId);
                return;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
