package com.example.zpabd.car;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String make;
    private String model;
	private String generation;
	private Short yearFrom;
	private Short yearTo;
	private String series;
	private String trim;
	private String bodyType;
    @Column(name = "load_height_mm")
	private Integer loadHeight;
	private Integer numberOfSeats;
    @Column(name = "length_mm")
    private Integer length;
    @Column(name = "width_mm")
    private Integer width;
    @Column(name = "height_mm")
    private Integer height;
    @Column(name = "wheelbase_mm")
    private Integer wheelbase;
    @Column(name = "front_track_mm")
    private Integer frontTrack;
    @Column(name = "rear_track_mm")
    private Integer rearTrack;
    @Column(name = "curb_weight_kg")
    private Integer curbWeight;
    @Column(name = "wheel_size_R14")
    private String wheelSizeR14;
    @Column(name = "ground_clearance_mm")
    private Integer groundClearance;
    @Column(name = "trailer_load_with_brakes_kg")
    private Integer trailerLoadWithBrakes;
    @Column(name = "payload_kg")
    private Integer payload;
    @Column(name = "back_track_width_mm")
    private Integer backTrackWidth;
    @Column(name = "front_track_width_mm")
    private Integer frontTrackWidth;
    @Column(name = "clearance_mm")
    private Integer clearance;
    @Column(name = "full_weight_kg")
    private Integer fullWeight;
    @Column(name = "front_rear_axle_load_kg")
    private String frontRearAxleLoad;
    @Column(name = "max_trunk_capacity_l")
    private Integer maxTrunkCapacity;
    @Column(name = "cargo_compartment_length_width_height_mm")
    private String cargoCompartmentLengthWidthHeight;
    @Column(name = "cargo_volume_m3")
	private Float cargoVolume;
    @Column(name = "minimum_trunk_capacity_l")
    private Integer minimumTrunkCapacity;
    @Column(name = "maximum_torque_n_m")
    private Integer maximumTorque;
    private String injectionType;
    private String cylinderLayout;
    private Integer numberOfCylinders;
    private Float compressionRatio;
    private String engineType;
    private Integer valvesPerCylinder;
    private String boostType;
    @Column(name = "cylinder_bore_mm")
    private Integer cylinderBore;
    @Column(name = "stroke_cycle_mm")
    private Integer strokeCycle;
    private String enginePlacement;
    @Column(name = "cylinder_bore_and_stroke_cycle_mm")
    private String cylinderBoreAndStrokeCycleMm;
    private String turnoverOfMaximumTorqueRpm;
    @Column(name = "max_power_kw")
    private Integer maxPower;
    private String presenceOfIntercooler;
    @Column(name = "capacity_cm3")
    private Integer capacity;
    private Integer engineHp;
    private String engineHpRpm;
    private String driveWheels;
    private Float boreStrokeRatio;
    private Integer numberOfGears;
    @Column(name = "turning_circle_m")
    private Float turningCircle;
    private String transmission;
    @Column(name = "mixed_fuel_consumption_per_100_km_l")
    private Float mixedFuelConsumption;
    @Column(name = "range_km")
    private String range;
    private String emissionStandards;
    @Column(name = "fuel_tank_capacity_l")
    private Integer fuelTankCapacity;
    @Column(name = "acceleration_0_100_km_h_s")
    private Float acceleration;
    @Column(name = "max_speed_km_per_h")
    private Integer maxSpeed;
    @Column(name = "city_fuel_per_100km_l")
    private Float cityFuel;
    @Column(name = "co2_emissions_g_km")
    private Integer co2Emissions;
    private String fuelGrade;
    @Column(name = "highway_fuel_per_100km_l")
    private Float highwayFuel;
    private String backSuspension;
    private String rearBrakes;
    private String frontBrakes;
    private String frontSuspension;
    private String steeringType;
    private String carClass;
    private String countryOfOrigin;
    private Integer numberOfDoors;
    private String safetyAssessment;
    private String ratingName;
    @Column(name = "battery_capacity_kw_per_h")
    private Float batteryCapacity;
    @Column(name = "electric_range_km")
    private Integer electricRange;
    @Column(name = "charging_time_h")
    private Float chargingTime;
}
