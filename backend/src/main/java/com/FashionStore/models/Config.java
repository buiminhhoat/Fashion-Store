package com.FashionStore.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Config {
    @Value("${image.category_default}")
    private String IMAGE_CATEGORY_DEFAULT;

    public String getImageCategoryDefault() {
        return IMAGE_CATEGORY_DEFAULT;
    }
}
