package com.example.zpabd.report;

import com.example.zpabd.car.Car;
import com.example.zpabd.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MileageReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
    private Date creationDate;
    @ManyToOne
    @JoinColumn(name = "car")
    private Car car;
    @NotNull
    private Float mileage;
    @NotEmpty
    private String type;
    private String notes;
}
