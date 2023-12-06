package com.FashionStore.repositories;

import com.FashionStore.models.Address;
import com.FashionStore.models.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    Banner findBannerByBannerID(Long bannerID);
}
