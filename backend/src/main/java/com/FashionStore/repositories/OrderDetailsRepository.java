package com.FashionStore.repositories;

import com.FashionStore.models.OrderDetails;
import com.FashionStore.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    OrderDetails findOrderDetailsByOrderDetailID(Long orderDetailID);
}
