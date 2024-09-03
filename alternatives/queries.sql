-- SCRIPT 
USE `MMC`;

-- Insert user types  --
INSERT INTO `MMC`.`user_type` (`type`) VALUES   
('admin'),
('operational'),
('viewer');

-- Insert users   --
INSERT INTO `MMC`.`users` (`user_type_id`, `user_number`, `email`, `password`) VALUES
(1, 'admin001', 'admin1@motoman.com', 'password123'), -- Admin
(1, 'admin002', 'admin2@motoman.com', 'password123'), -- Admin
(2, 'operational001', 'operational1@motoman.com', 'password123'), -- Operational
(2, 'operational002', 'operational2@motoman.com', 'password123'), -- Operational
(2, 'operational003', 'operational3@motoman.com', 'password123'), -- Operational
(2, 'operational004', 'operational4@motoman.com', 'password123'), -- Operational
(2, 'operational005', 'operational5@motoman.com', 'password123'), -- Operational
(2, 'operational006', 'operational6@motoman.com', 'password123'), -- Operational
(2, 'operational007', 'operational7@motoman.com', 'password123'), -- Operational
(2, 'operational008', 'operational8@motoman.com', 'password123'), -- Operational
(2, 'operational009', 'operational9@motoman.com', 'password123'), -- Operational
(2, 'operational0010', 'operational10@motoman.com', 'password123'), -- Operational
(3, 'viewer001', 'viewer1@motoman.com', 'password123'), -- Viewer
(3, 'viewer002', 'viewer2@motoman.com', 'password123'); -- Viewer

-- Insert projects  --
INSERT INTO `MMC`.`projects` (`identification_number`, `cost_material`, `description`, `delivery_date`, `completed`) VALUES
(1001, 10000, 'Project 1', '2024-12-31', 0),
(1002, 15000, 'Project 2', '2024-12-31', 0),
(1003, 20000, 'Project 3', '2024-12-31', 1),
(1004, 25000, 'Project 4', '2024-12-31', 0),
(1005, 30000, 'Project 5', '2024-12-31', 0),
(1006, 35000, 'Project 6', '2024-12-31', 1);

-- Assign users to projects --
INSERT INTO `MMC`.`users_projects` (`users_id`, `project_id`) VALUES
-- Admin 1
(15, 1),
(15, 2),
(15, 3),
-- Admin 2
(16, 4),
(16, 5),
(16, 6),
-- Assignment of operational users to active projects
(17, 1),  -- User 17, Project 1
(18, 1),  -- User 18, Project 1
(19, 2),  -- User 19, Project 2
(20, 2),  -- User 20, Project 2
(21, 4),  -- User 21, Project 4
(22, 4),  -- User 22, Project 4
(23, 5), 

-- Insert assemblies   --
INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `price`, `currency`) VALUES
(1, 'A001', 'Assembly 1 for Project 1', '2024-10-15', 5000.00, 'USD'),
(1, 'A002', 'Assembly 2 for Project 1', '2024-11-01', 5500.00, 'USD'),
(1, 'A003', 'Assembly 3 for Project 1', '2024-11-15', 6000.00, 'USD'),

(2, 'A001', 'Assembly 1 for Project 2', '2024-10-20', 5000.00, 'USD'),
(2, 'A002', 'Assembly 2 for Project 2', '2024-11-05', 5500.00, 'USD'),
(2, 'A003', 'Assembly 3 for Project 2', '2024-11-20', 6000.00, 'USD'),

(3, 'A001', 'Assembly 1 for Project 3', '2024-10-25', 5000.00, 'USD'),
(3, 'A002', 'Assembly 2 for Project 3', '2024-11-10', 5500.00, 'USD'),
(3, 'A003', 'Assembly 3 for Project 3', '2024-11-25', 6000.00, 'USD'),

(4, 'A001', 'Assembly 1 for Project 4', '2024-11-01', 5000.00, 'USD'),
(4, 'A002', 'Assembly 2 for Project 4', '2024-11-15', 5500.00, 'USD'),
(4, 'A003', 'Assembly 3 for Project 4', '2024-12-01', 6000.00, 'USD'),

(5, 'A001', 'Assembly 1 for Project 5', '2024-11-05', 5000.00, 'USD'),
(5, 'A002', 'Assembly 2 for Project 5', '2024-11-20', 5500.00, 'USD'),
(5, 'A003', 'Assembly 3 for Project 5', '2024-12-05', 6000.00, 'USD'),

(6, 'A001', 'Assembly 1 for Project 6', '2024-11-10', 5000.00, 'USD'),
(6, 'A002', 'Assembly 2 for Project 6', '2024-11-25', 5500.00, 'USD'),
(6, 'A003', 'Assembly 3 for Project 6', '2024-12-10', 6000.00, 'USD');

-- Insert items   -- 
INSERT INTO `MMC`.`items` (`project_id`, `assembly_id`, `name`, `description`, `quantity`, `stock_quantity`, `price`, `currency`, `arrived_date`, `date_order`, `in_assembly`, `number_material`, `number_price_item`, `suppler`) VALUES

-- Items for Assembly 1 of Project 1
(1, 1, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(1, 1, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(1, 1, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(1, 1, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(1, 1, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 1
(1, 2, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(1, 2, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(1, 2, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(1, 2, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(1, 2, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 1
(1, 3, 'Item 1 for Assembly 3', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(1, 3, 'Item 2 for Assembly 3', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(1, 3, 'Item 3 for Assembly 3', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(1, 3, 'Item 4 for Assembly 3', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(1, 3, 'Item 5 for Assembly 3', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 1 of Project 2
(2, 4, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(2, 4, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(2, 4, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(2, 4, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(2, 4, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 2
(2, 5, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(2, 5, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(2, 5, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(2, 5, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(2, 5, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 2
(2, 6, 'Item 1 for Assembly 3', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(2, 6, 'Item 2 for Assembly 3', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(2, 6, 'Item 3 for Assembly 3', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(2, 6, 'Item 4 for Assembly 3', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(2, 6, 'Item 5 for Assembly 3', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 1 of Project 3
(3, 7, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(3, 7, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(3, 7, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(3, 7, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(3, 7, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 3
(3, 8, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(3, 8, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(3, 8, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(3, 8, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(3, 8, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 3
(3, 9, 'Item 1 for Assembly 3', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(3, 9, 'Item 2 for Assembly 3', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(3, 9, 'Item 3 for Assembly 3', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(3, 9, 'Item 4 for Assembly 3', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(3, 9, 'Item 5 for Assembly 3', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 1 of Project 4
(4, 10, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(4, 10, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(4, 10, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(4, 10, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(4, 10, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 4
(4, 11, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(4, 11, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(4, 11, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(4, 11, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(4, 11, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 4
(4, 12, 'Item 1 for Assembly 3', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(4, 12, 'Item 2 for Assembly 3', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(4, 12, 'Item 3 for Assembly 3', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(4, 12, 'Item 4 for Assembly 3', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(4, 12, 'Item 5 for Assembly 3', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 1 of Project 5
(5, 13, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(5, 13, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(5, 13, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(5, 13, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(5, 13, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 5
(5, 14, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(5, 14, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(5, 14, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(5, 14, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(5, 14, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 5
(5, 15, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(5, 15, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(5, 15, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(5, 15, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(5, 15, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 1 of Project 6
(6, 16, 'Item 1 for Assembly 1', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(6, 16, 'Item 2 for Assembly 1', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(6, 16, 'Item 3 for Assembly 1', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(6, 16, 'Item 4 for Assembly 1', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(6, 16, 'Item 5 for Assembly 1', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 2 of Project 6
(6, 17, 'Item 1 for Assembly 2', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(6, 17, 'Item 2 for Assembly 2', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(6, 17, 'Item 3 for Assembly 2', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(6, 17, 'Item 4 for Assembly 2', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(6, 17, 'Item 5 for Assembly 2', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E'),

-- Items for Assembly 3 of Project 6
(6, 18, 'Item 1 for Assembly 3', 'Description of Item 1', 10, 5, 100.00, 'USD', '2024-09-01', '2024-08-01', 1, '001', 'PN001', 'Supplier A'),
(6, 18, 'Item 2 for Assembly 3', 'Description of Item 2', 15, 10, 150.00, 'USD', '2024-09-05', '2024-08-05', 1, '002', 'PN002', 'Supplier B'),
(6, 18, 'Item 3 for Assembly 3', 'Description of Item 3', 20, 15, 200.00, 'USD', '2024-09-10', '2024-08-10', 1, '003', 'PN003', 'Supplier C'),
(6, 18, 'Item 4 for Assembly 3', 'Description of Item 4', 25, 20, 250.00, 'USD', '2024-09-15', '2024-08-15', 1, '004', 'PN004', 'Supplier D'),
(6, 18, 'Item 5 for Assembly 3', 'Description of Item 5', 30, 25, 300.00, 'USD', '2024-09-20', '2024-08-20', 1, '005', 'PN005', 'Supplier E');

-- Insert data into the `bom` table --
INSERT INTO `MMC`.`bom` (`project_id`, `item_id`) VALUES
-- Project 1
(1, 1),  -- Item 1 from assembly 1 for Project 1
(1, 2),  -- Item 2 from assembly 1 for Project 1
(1, 3),  -- Item 3 from assembly 1 for Project 1
(1, 4),  -- Item 4 from assembly 1 for Project 1
(1, 5),  -- Item 5 from assembly 1 for Project 1

(1, 6),  -- Item 1 from assembly 2 for Project 1
(1, 7),  -- Item 2 from assembly 2 for Project 1
(1, 8),  -- Item 3 from assembly 2 for Project 1
(1, 9),  -- Item 4 from assembly 2 for Project 1
(1, 10),  -- Item 5 from assembly 2 for Project 1

(1, 11),  -- Item 1 from assembly 3 for Project 1
(1, 12),  -- Item 2 from assembly 3 for Project 1
(1, 13),  -- Item 3 from assembly 3 for Project 1
(1, 14),  -- Item 4 from assembly 3 for Project 1
(1, 15),  -- Item 5 from assembly 3 for Project 1

-- Project 2
(2, 16),  -- Item 1 from assembly 1 for Project 2
(2, 17),  -- Item 2 from assembly 1 for Project 2
(2, 18),  -- Item 3 from assembly 1 for Project 2
(2, 19),  -- Item 4 from assembly 1 for Project 2
(2, 20),  -- Item 5 from assembly 1 for Project 2

(2, 21),  -- Item 1 from assembly 2 for Project 2
(2, 22),  -- Item 2 from assembly 2 for Project 2
(2, 23),  -- Item 3 from assembly 2 for Project 2
(2, 24),  -- Item 4 from assembly 2 for Project 2
(2, 25),  -- Item 5 from assembly 2 for Project 2

(2, 26),  -- Item 1 from assembly 3 for Project 2
(2, 27),  -- Item 2 from assembly 3 for Project 2
(2, 28),  -- Item 3 from assembly 3 for Project 2
(2, 29),  -- Item 4 from assembly 3 for Project 2
(2, 30),  -- Item 5 from assembly 3 for Project 2

-- Project 3
(3, 31),  -- Item 1 from assembly 1 for Project 3
(3, 32),  -- Item 2 from assembly 1 for Project 3
(3, 33),  -- Item 3 from assembly 1 for Project 3
(3, 34),  -- Item 4 from assembly 1 for Project 3
(3, 35),  -- Item 5 from assembly 1 for Project 3

(3, 36),  -- Item 1 from assembly 2 for Project 3
(3, 37),  -- Item 2 from assembly 2 for Project 3
(3, 38),  -- Item 3 from assembly 2 for Project 3
(3, 39),  -- Item 4 from assembly 2 for Project 3
(3, 40),  -- Item 5 from assembly 2 for Project 3

(3, 41),  -- Item 1 from assembly 3 for Project 3
(3, 42),  -- Item 2 from assembly 3 for Project 3
(3, 43),  -- Item 3 from assembly 3 for Project 3
(3, 44),  -- Item 4 from assembly 3 for Project 3
(3, 45),  -- Item 5 from assembly 3 for Project 3

-- Project 4
(4, 46),  -- Item 1 from assembly 1 for Project 4
(4, 47),  -- Item 2 from assembly 1 for Project 4
(4, 48),  -- Item 3 from assembly 1 for Project 4
(4, 49),  -- Item 4 from assembly 1 for Project 4
(4, 50),  -- Item 5 from assembly 1 for Project 4

(4, 51),  -- Item 1 from assembly 2 for Project 4
(4, 52),  -- Item 2 from assembly 2 for Project 4
(4, 53),  -- Item 3 from assembly 2 for Project 4
(4, 54),  -- Item 4 from assembly 2 for Project 4
(4, 55),  -- Item 5 from assembly 2 for Project 4

(4, 56),  -- Item 1 from assembly 3 for Project 4
(4, 57),  -- Item 2 from assembly 3 for Project 4
(4, 58),  -- Item 3 from assembly 3 for Project 4
(4, 59),  -- Item 4 from assembly 3 for Project 4
(4, 60),  -- Item 5 from assembly 3 for Project 4

-- Project 5
(5, 61),  -- Item 1 from assembly 1 for Project 5
(5, 62),  -- Item 2 from assembly 1 for Project 5
(5, 63),  -- Item 3 from assembly 1 for Project 5
(5, 64),  -- Item 4 from assembly 1 for Project 5
(5, 65),  -- Item 5 from assembly 1 for Project 5

(5, 66),  -- Item 1 from assembly 2 for Project 5
(5, 67),  -- Item 2 from assembly 2 for Project 5
(5, 68),  -- Item 3 from assembly 2 for Project 5
(5, 69),  -- Item 4 from assembly 2 for Project 5
(5, 70),  -- Item 5 from assembly 2 for Project 5

(5, 71),  -- Item 1 from assembly 3 for Project 5
(5, 72),  -- Item 2 from assembly 3 for Project 5
(5, 73),  -- Item 3 from assembly 3 for Project 5
(5, 74),  -- Item 4 from assembly 3 for Project 5
(5, 75),  -- Item 5 from assembly 3 for Project 5

-- Project 6
(6, 76),  -- Item 1 from assembly 1 for Project 6
(6, 77),  -- Item 2 from assembly 1 for Project 6
(6, 78),  -- Item 3 from assembly 1 for Project 6
(6, 79),  -- Item 4 from assembly 1 for Project 6
(6, 80),  -- Item 5 from assembly 1 for Project 6

(6, 81),  -- Item 1 from assembly 2 for Project 6
(6, 82),  -- Item 2 from assembly 2 for Project 6
(6, 83),  -- Item 3 from assembly 2 for Project 6
(6, 84),  -- Item 4 from assembly 2 for Project 6
(6, 85),  -- Item 5 from assembly 2 for Project 6

(6, 86),  -- Item 1 from assembly 3 for Project 6
(6, 87),  -- Item 2 from assembly 3 for Project 6
(6, 88),  -- Item 3 from assembly 3 for Project 6
(6, 89),  -- Item 4 from assembly 3 for Project 6
(6, 90);  -- Item 5 from assembly 3 for Project 6
