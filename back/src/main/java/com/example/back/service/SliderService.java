package com.example.back.service;


import com.example.back.dao.SliderRepository;
import com.example.back.dto.SliderDto;
import com.example.back.entities.Slider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SliderService {

    private final SliderRepository sliderRepository;

    @Autowired
    public SliderService(SliderRepository sliderRepository) {
        this.sliderRepository = sliderRepository;
    }

    public List<SliderDto> getAllSliders() {
        List<Slider> sliders = sliderRepository.findAll();
        return sliders.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public SliderDto addSlider(SliderDto sliderDto) {
        Slider slider = mapToEntity(sliderDto);
        slider = sliderRepository.save(slider);
        return mapToDto(slider);
    }

    public void deleteSliderById(long id) {
        sliderRepository.deleteById(id);
    }

    public  SliderDto updateSlider(long id, SliderDto sliderDto) {
        Optional<Slider> optionalSlider = sliderRepository.findById(id);
        if (optionalSlider.isPresent()) {
            Slider slider = optionalSlider.get();
            slider.setNom(sliderDto.getNom());
            slider.setImg(sliderDto.getImg());
            slider.setText(sliderDto.getText());
            sliderRepository.save(slider);

            return mapToDto(slider);
        } else {
            return null; // Slider avec l'ID donné non trouvé
        }
    }




    private SliderDto mapToDto(Slider slider) {
        return SliderDto.builder()
                .idSlider(slider.getIdSlider())
                .nom(slider.getNom())
                .img(slider.getImg())
                .text(slider.getText())
                .build();
    }

    private Slider mapToEntity(SliderDto sliderDto) {
        return Slider.builder()
                .nom(sliderDto.getNom())
                .img(sliderDto.getImg())
                .text(sliderDto.getText())
                .build();
    }
}
