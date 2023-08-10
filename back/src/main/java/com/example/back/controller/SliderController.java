package com.example.back.controller;

import com.example.back.dto.SliderDto;
import com.example.back.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/slider")
public class SliderController {

    private final SliderService sliderService;

    @Autowired
    public SliderController(SliderService sliderService) {
        this.sliderService = sliderService;
    }

    @GetMapping("/all")
    public List<SliderDto> getAllSliders() {
        return sliderService.getAllSliders();
    }
//
//    @PostMapping("/add")
//    public SliderDto addSlider(@RequestParam("text") String text, @RequestParam("image") MultipartFile image) {
//        String imagePath = saveImageToDatabase(image);
//        SliderDto sliderDto = new SliderDto();
//        sliderDto.setText(text);
//        sliderDto.setImg(imagePath);
//        return sliderService.addSlider(sliderDto);
//    }

    @PostMapping("/add")
    public SliderDto addSlider(
            @RequestParam("nom") String nom,
            @RequestParam("text") String text,
            @RequestParam("image") MultipartFile image) {
        String imagePath = saveImageToDatabase(image);
        SliderDto sliderDto = new SliderDto();
        sliderDto.setNom(nom);
        sliderDto.setText(text);
        sliderDto.setImg(imagePath);
        return sliderService.addSlider(sliderDto);
    }


    @DeleteMapping("delete/{id}")
    public void deleteSlider(@PathVariable long id) {
        sliderService.deleteSliderById(id);
    }

    @PutMapping("update/{id}")
    public SliderDto updateSlider(@PathVariable long id, @RequestBody SliderDto sliderDto) {
        return sliderService.updateSlider(id,sliderDto);
    }



//    private String saveImageToDatabase(MultipartFile image) {
//        String uploadDirectory = "C:\\Users\\mount\\Desktop\\Hotel19\\front\\public\\images\\slider";
//        try {
//            String originalFileName = image.getOriginalFilename();
//            String newFileName = System.currentTimeMillis() + "_" + originalFileName;
//            Path filePath = Paths.get(uploadDirectory + newFileName);
//            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            return  newFileName;
//        } catch (IOException e) {
//
//            return null;
//        }
//    }


    private String saveImageToDatabase(MultipartFile image) {
        String uploadDirectory = "C:\\Users\\mount\\Desktop\\Hotel19\\front\\public\\images";
        try {
            String originalFileName = image.getOriginalFilename();
            String newFileName = System.currentTimeMillis() + "_" + originalFileName;
            Path filePath = Paths.get(uploadDirectory, newFileName);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return newFileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }




}
