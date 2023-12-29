package com.FashionStore.imgBB;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
public class ImgBBService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ImgBBConfig imgBBConfig;

    @Value("${imgbb.api-endpoint}")
    private String apiEndpoint;

    public String uploadImage(byte[] imageData) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String url = apiEndpoint + "?key=" + imgBBConfig.getApiKey();

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(imageData, headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        // Xử lý response, bạn có thể trích xuất URL của hình ảnh đã tải lên từ response
        String imageUrl = responseEntity.getBody();
        return imageUrl;
    }

    // Đọc dữ liệu hình ảnh thành mảng byte
    private static byte[] readImageAsByteArray(String imagePath) throws Exception {
        Path path = Paths.get(imagePath);
        return Files.readAllBytes(path);
    }

    // Chuyển mảng byte thành chuỗi Base64
    private static String convertToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }

    public String uploadImageToImgBB(byte[] imageData) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//        headers.set("Authorization", "Bearer " + imgBBConfig.getApiKey());
//
//        HttpEntity<String> requestEntity = new HttpEntity<>("image=" + base64Image, headers);
//
//        ResponseEntity<String> responseEntity = restTemplate.exchange(apiEndpoint, HttpMethod.POST, requestEntity, String.class);
//
//        // Xử lý response, bạn có thể trích xuất URL của hình ảnh đã tải lên từ response
//        return responseEntity.getBody();

        String apiUrl = apiEndpoint + "?expiration=15552000&key=" + imgBBConfig.getApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", convertToBase64(imageData));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        // Xử lý phản hồi tại đây
        String responseBody = responseEntity.getBody();
//        System.out.println(responseBody);
        String resultJson = responseBody;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode resultNode;
        try {
            resultNode = objectMapper.readTree(resultJson);
        } catch (Exception e) {
            return "Error";
        }

        // Bạn có thể truy cập dữ liệu từ JsonNode và làm gì đó với nó
        String url = resultNode.path("data").path("url").asText();
        return url;
    }
}

