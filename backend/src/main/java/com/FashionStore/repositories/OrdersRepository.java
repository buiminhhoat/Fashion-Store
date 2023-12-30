package com.FashionStore.repositories;

import com.FashionStore.models.Orders;
import com.FashionStore.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    Orders findOrdersByOrderID(Long orderID);
    List<Orders> findOrdersByUserID(Long userID);

    List<Orders> findOrdersByUserIDAndOrderStatus(Long userID, String orderStatus);

    List<Orders> findOrdersByRecipientPhone(String recipientPhone);
}
