package com.FashionStore.freeimage;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class FreeImageService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private FreeImageConfig freeImageConfig;

    @Value("${freeimage.host.api-endpoint}")
    private String apiEndpoint;

    public String uploadImage(byte[] imageData) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String url = apiEndpoint + "?key=" + freeImageConfig.getApiKey();

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

    public String uploadImageToFreeImage(byte[] imageData) {
        String apiUrl = apiEndpoint + "?key=" + freeImageConfig.getApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("source", convertToBase64(imageData));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        String responseBody = responseEntity.getBody();
        String resultJson = responseBody;
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode resultNode;
        try {
            resultNode = objectMapper.readTree(resultJson);
        } catch (Exception e) {
            return "Error";
        }

        // Bạn có thể truy cập dữ liệu từ JsonNode và làm gì đó với nó
        String url = resultNode.path("image").path("url").asText();
        return url;
    }
}

