package com.FashionStore.controllers;

import com.FashionStore.freeimage.FreeImageService;
import com.FashionStore.models.Banner;
import com.FashionStore.models.ResponseObject;
import com.FashionStore.repositories.BannerRepository;
import com.FashionStore.security.JwtTokenUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${api.base-path}")
public class BannerController {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private FreeImageService freeImageService;

    @Value("${multipart.banner-images}")
    private String MULTIPART_BANNER_IMAGES;

    @Value("${param.banners}")
    private String PARAM_BANNERS;

    private final String RESPONSE_BANNER_SAVE_SUCCESS;

    @Autowired
    public BannerController(MessageSource messageSource) {
        this.RESPONSE_BANNER_SAVE_SUCCESS = messageSource.getMessage("response.banner.save-success", null, LocaleContextHolder.getLocale());
    }

    @GetMapping("${endpoint.public.get-all-banners}")
    public ResponseEntity<?> getAllBanners(HttpServletRequest request) {
        List<Banner> banners = bannerRepository.findAll();
        return ResponseEntity.ok(banners);
    }

    @PostMapping("${endpoint.admin.edit-banner}")
    public ResponseEntity<?> editBanner(HttpServletRequest request) throws IOException {
        List<MultipartFile> images = ((MultipartHttpServletRequest) request).getFiles(MULTIPART_BANNER_IMAGES);
        String bannersJson = request.getParameter(PARAM_BANNERS);
        ObjectMapper objectMapper = new ObjectMapper();

        List<Banner> banners;
        try {
            banners = objectMapper.readValue(bannersJson, new TypeReference<List<Banner>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile image : images) {
            String url = freeImageService.uploadImageToFreeImage(image.getBytes());
            paths.add(url);
        }

        bannerRepository.deleteAll();

        for (int i = 0; i < banners.size(); ++i) {
            Banner banner = banners.get(i);
            banner.setImagePath(paths.get(i));
            bannerRepository.save(banner);
        }
        ResponseObject responseObject = new ResponseObject(RESPONSE_BANNER_SAVE_SUCCESS);
        return ResponseEntity.ok(responseObject);
    }
}
