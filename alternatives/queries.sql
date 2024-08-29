--SCRIPT 

USE `MMC`;

-- Inserta datos en la tabla `user_type`
INSERT INTO `user_type` (`type`) VALUES
('Admin'),
('User'),
('Guest');

-- Inserta datos en la tabla `users`
INSERT INTO `users` (`user_type_id`, `user_number`, `email`, `password`) VALUES
(1, '001', 'admin@example.com', 'admin123'),
(2, '002', 'user@example.com', 'user123'),
(3, '003', 'guest@example.com', 'guest123');

-- Inserta datos en la tabla `projects`
INSERT INTO `projects` (`identification_number`, `delivery_date`, `completed`, `cost_material`, `description`) VALUES
(1001, '2024-08-30', 0, 10000, 'Project 1 Description'),
(1002, '2024-09-15', 0, 15000, 'Project 2 Description'),
(1003, '2024-10-01', 1, 20000, 'Project 3 Description');

-- Inserta datos en la tabla `assembly`
INSERT INTO `assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`) VALUES
(1, 'ASM-1001', 'Assembly 1 Description', '2024-08-25', NULL, 5000.00),
(2, 'ASM-1002', 'Assembly 2 Description', '2024-09-10', NULL, 7500.00),
(3, 'ASM-1003', 'Assembly 3 Description', '2024-09-25', '2024-09-24', 10000.00);

-- Inserta datos en la tabla `price_number`
INSERT INTO `price_number` (`number_price_item`, `supplier`) VALUES
('PRC-001', 'Supplier 1'),
('PRC-002', 'Supplier 2'),
('PRC-003', 'Supplier 3');

-- Inserta datos en la tabla `items`
INSERT INTO `items` (`project_id`, `price_number_id`, `assembly_id`, `name`, `quantity`, `stock_quantity`, `description`, `price`, `arrived_date`, `date_order`, `in_assembly`, `currency`, `number_material`) VALUES
(1, 1, 1, 'Item 1', 10, 5, 'Item 1 Description', 100.00, '2024-08-20', '2024-08-18', 1, 'USD', 111),
(2, 2, 2, 'Item 2', 20, 10, 'Item 2 Description', 150.00, '2024-09-05', '2024-09-03', 0, 'USD', 222),
(3, 3, 3, 'Item 3', 30, 15, 'Item 3 Description', 200.00, '2024-09-20', '2024-09-18', 1, 'USD', 333);

-- Inserta datos en la tabla `bom`
INSERT INTO `bom` (`project_id`, `item_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Inserta datos en la tabla `users_projects`
INSERT INTO `users_projects` (`users_id`, `project_id`) VALUES
(1, 1),
(2, 2),
(3, 3);
