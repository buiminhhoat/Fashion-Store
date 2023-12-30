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
    private String API_ENDPOINT;

    @Value("${freeimage.api-key}")
    private String API_KEY;

    @Value("${freeimage.content-type-multipart-form-data}")
    private String CONTENT_TYPE_MULTIPART_FORM_DATA;

    @Value("${freeimage.api-key-param}")
    private String API_KEY_PARAM;

    @Value("${freeimage.source-param}")
    private String SOURCE_PARAM;

    @Value("${freeimage.image-node}")
    private String IMAGE_NODE;

    @Value("${freeimage.url-node}")
    private String URL_NODE;

    @Value("${freeimage.error-message}")
    private String ERROR_MESSAGE;

    private static String convertToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }

    public String uploadImageToFreeImage(byte[] imageData) {
        String apiUrl = API_ENDPOINT + "?" + API_KEY_PARAM + "=" + API_KEY;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(CONTENT_TYPE_MULTIPART_FORM_DATA));

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add(SOURCE_PARAM, convertToBase64(imageData));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, requestEntity, String.class);

        String resultJson = responseEntity.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode resultNode;
        try {
            resultNode = objectMapper.readTree(resultJson);
        } catch (Exception e) {
            return ERROR_MESSAGE;
        }

        return resultNode.path(IMAGE_NODE).path(URL_NODE).asText();
    }
}
