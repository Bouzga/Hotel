package com.example.back.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder

public class SliderDto {

    private long idSlider;

    private String nom;

    private String img;



    private String text;
}
