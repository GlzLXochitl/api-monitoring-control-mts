-- select tables
select * from mmc.user_type;
select * from mmc.users;
select * from mmc.users_projects;
select * from mmc.projects;
select * from mmc.assembly;
select * from mmc.items;
select * from mmc.bom;
select * from mmc.stock;

-- tables description
DESCRIBE `MMC`.`user_type`;
DESCRIBE `MMC`.`bom`;
DESCRIBE `MMC`.`items`;
DESCRIBE `MMC`.`users`;
DESCRIBE `MMC`.`stock`;
DESCRIBE `MMC`.`projects`;
DESCRIBE `MMC`.`users_projects`;
DESCRIBE `MMC`.`assembly`;

-- insert data in stock table example
DESCRIBE `MMC`.`stock`;
INSERT INTO `MMC`.`stock` (`name`, `description`, `quantity`, `price`, `currency`, `supplier`)
VALUES 
('Producto A', 'Descripción del Producto A', 100, 29.99, 'USD', 'Proveedor A'),
('Producto B', 'Descripción del Producto B', 200, 30, 'USD', 'Proveedor B');
select * from mmc.stock;

-- insert data in user_type table example
DESCRIBE `MMC`.`user_type`;
INSERT INTO `MMC`.`user_type` (`type`) VALUES   
('admin'),
('operational'),
('viewer');
select * from mmc.user_type;

-- insert data in users table example
DESCRIBE `MMC`.`users`;
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
select * from mmc.users;

-- insert data in users_projects table example
DESCRIBE `MMC`.`users_projects`;
INSERT INTO `MMC`.`users_projects` (`users_id`, `project_id`) VALUES (3, 1);
select * from mmc.users_projects;

-- insert data in projects table example
DESCRIBE `MMC`.`projects`;
INSERT INTO `MMC`.`projects` (`identification_number`, `delivery_date`, `completed`, `cost_material`, `description`) VALUES
(1006, '2024-12-31', 0, 10000, 'This is a one project');
select * from mmc.projects;

-- insert data in assembly table example
DESCRIBE `MMC`.`assembly`;
INSERT INTO `MMC`.`assembly` (
  `project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed_assembly`
  ) VALUES (
  4, 'A001', 'Assembly for Project', '2024-12-01', '2024-11-01', 1000, 'USD', 0
  );
select * from mmc.assembly;

-- insert data in items table example
DESCRIBE `MMC`.`items`;
INSERT INTO `MMC`.`items` (
  `project_id`, `assembly_id`, `name`, `description`, `quantity`, `price`, `currency`, `arrived_date`, `date_order`, `in_assembly`, 
  `number_material`, `number_price_item`, `supplier`) VALUES (
  4, 18, 'Item for Assembly', 'Description of Item', 1, 100, 'USD', '2024-09-01', '2024-08-01', 0, 
  '001', 'PN003', 'Supplier');
select * from mmc.items;

-- insert data in bom table example
DESCRIBE `MMC`.`bom`;
INSERT INTO `MMC`.`bom` (`project_id`, `assembly_id`, `item_id`) VALUES (3, 3, 25);
select * from mmc.bom;