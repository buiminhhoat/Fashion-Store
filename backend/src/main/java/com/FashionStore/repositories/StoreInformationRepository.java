package com.FashionStore.repositories;

import com.FashionStore.models.Banner;
import com.FashionStore.models.StoreInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreInformationRepository extends JpaRepository<StoreInformation, Long> {
    StoreInformation findStoreInformationByStoreInformationID(Long storeInformationID);
}
