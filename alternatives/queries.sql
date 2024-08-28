USE mmc;

-- Inserting data into user_type table
INSERT INTO user_type (type) VALUES ('Admin'), ('Operational'), ('Viewer');

-- Insertar registros en la tabla projects
INSERT INTO mmc.projects (identification_number, delivery_date, completed, cost_material, description)
VALUES
(1001, '2024-12-01', 0, 5000, 'Descripción del proyecto 1'),
(1002, '2024-12-15', 1, 15000, 'Descripción del proyecto 2'),
(1003, '2024-11-30', 0, 7500, 'Descripción del proyecto 3'),
(1004, '2024-10-20', 1, 10000, 'Descripción del proyecto 4'),
(1005, '2024-09-10', 0, 20000, 'Descripción del proyecto 5');

-- Insertar registros en la tabla assembly
INSERT INTO mmc.assembly (project_id, identification_number, delivery_date, description, price)
VALUES
(1, 'A001', '2024-12-01', 'Descripción del ensamblaje 1', 2000),
(2, 'A002', '2024-12-15', 'Descripción del ensamblaje 2', 4000),
(3, 'A003', '2024-11-30', 'Descripción del ensamblaje 3', 3000),
(4, 'A004', '2024-10-20', 'Descripción del ensamblaje 4', 5000),
(5, 'A005', '2024-09-10', 'Descripción del ensamblaje 5', 6000);

-- Insertar registros en la tabla bom
INSERT INTO mmc.bom (project_id, item_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Insertar registros en la tabla users
INSERT INTO mmc.users (user_type_id, user_number, email, password)
VALUES
(1, 'U001', 'admin1@example.com', 'password123'),
(2, 'U002', 'manager1@example.com', 'password123'),
(3, 'U003', 'developer1@example.com', 'password123'),
(4, 'U004', 'analyst1@example.com', 'password123'),
(5, 'U005', 'tester1@example.com', 'password123');

-- Insertar registros en la tabla users_projects
INSERT INTO mmc.users_projects (users_id, project_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- number_price
INSERT INTO MMC.price_number (number_price_item, supplier, created_at, updated_at) VALUES 
('Item001', 'SupplierA', NOW(), NOW()),
('Item002', 'SupplierB', NOW(), NOW()),
('Item003', 'SupplierC', NOW(), NOW()),
('Item004', 'SupplierD', NOW(), NOW()),
('Item005', 'SupplierE', NOW(), NOW());








-- ERROR
-- Insertar registros en la tabla items
INSERT INTO mmc.items (project_id, assembly_id, name, quantity, stock_quantity, description, price, arrived_date, date_order, in_assembly)
VALUES
(1, 1, 'Artículo 1', 10, 5, 'Descripción del artículo 1', 50.00, '2024-08-01', '2024-07-15', 1),
(2, 2, 'Artículo 2', 20, 10, 'Descripción del artículo 2', 30.00, '2024-08-15', '2024-07-20', 0),
(3, 3, 'Artículo 3', 15, 7, 'Descripción del artículo 3', 70.00, '2024-09-01', '2024-08-10', 1),
(4, 4, 'Artículo 4', 25, 12, 'Descripción del artículo 4', 40.00, '2024-09-15', '2024-08-20', 0),
(5, 5, 'Artículo 5', 30, 15, 'Descripción del artículo 5', 60.00, '2024-10-01', '2024-09-05', 1);