-- select tables
select * from mmc.user_type; 
select * from mmc.users;
select * from mmc.projects;
select * from mmc.users_projects;
select * from mmc.assembly;
select * from mmc.subassembly;
select * from mmc.items;
select * from mmc.stock;
select * from mmc.stock_items;
select * from mmc.bom;

-- tables description
DESCRIBE `MMC`.`user_type`;
DESCRIBE `MMC`.`users`;
DESCRIBE `MMC`.`projects`;
DESCRIBE `MMC`.`users_projects`;
DESCRIBE `MMC`.`assembly`;
DESCRIBE `MMC`.`subassembly`;
DESCRIBE `MMC`.`items`;
DESCRIBE `MMC`.`stock`;
DESCRIBE `MMC`.`stock_items`;
DESCRIBE `MMC`.`bom`;

-- insert data in user_type table example
INSERT INTO `MMC`.`user_type` (`type`) VALUES   
('admin'),
('operational'),
('viewer');

-- insert data in users table example
INSERT INTO `MMC`.`users` (`user_type_id`, `user_number`, `email`, `password`) VALUES
(1, 'YMR20231001JBRA', 'ymr20231001jbra@motoman.com', 'password123'), -- Admin
(1, 'YMR20231001MLGO', 'ymr20231001mlgo@motoman.com', 'password123'), -- Admin
(2, 'YMR20231002ACRA', 'ymr20231002acra@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002ERLA', 'ymr20231002erla@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002SMGO', 'ymr20231002smgo@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002LSMI', 'ymr20231002lsmi@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JMPE', 'ymr20231002jmpe@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002RGMA', 'ymr20231002rgma@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JOGA', 'ymr20231002joga@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002MLSA', 'ymr20231002mlsa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002FRPA', 'ymr20231002frpa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002LUSA', 'ymr20231002lusa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002OLRO', 'ymr20231002olro@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002AMZA', 'ymr20231002amza@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JLPA', 'ymr20231002jlpa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JPMA', 'ymr20231002jpma@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JRRA', 'ymr20231002jrra@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002JGRI', 'ymr20231002jgri@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002RDSA', 'ymr20231002rdsa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002MTSI', 'ymr20231002mtsi@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002GVPE', 'ymr20231002gvpe@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002ASMI', 'ymr20231002asmi@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002NTPA', 'ymr20231002ntpa@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002LRMA', 'ymr20231002lrma@motoman.com', '12345678'), -- Operational
(2, 'YMR20231002OMRA', 'ymr20231002omra@motoman.com', '12345678'), -- Operational
(3, 'YMR20231003CDRO', 'ymr20231003cdro@motoman.com', '12345678'), -- Viewer
(3, 'YMR20231003DARA', 'ymr20231003dara@motoman.com', '12345678'), -- Viewer
(3, 'YMR20231003FERA', 'ymr20231003fera@motoman.com', '12345678'), -- Viewer
(3, 'YMR20231003JARO', 'ymr20231003jaro@motoman.com', '12345678'); -- Viewer

-- insert data in projects table example
INSERT INTO `MMC`.`projects` (`identification_number`, `delivery_date`, `completed`, `cost_material`, `description`) VALUES
('21051171', '2024-11-02', 0, 372500, 'Robot para automatización en soldadura en líneas de ensamblaje de electrodomésticos.'),
('21051272', '2024-11-03', 0, 455000, 'Sistema robótico avanzado para el transporte de materiales a diferentes secciones de la planta.'),
('21051383', '2025-01-15', 0, 158000, 'Robot colaborativo para la manipulación de materiales en procesos de manufactura ligera.'),
('21051494', '2025-01-20', 0, 185000, 'Brazo robótico especializado en tareas de ensamblaje en líneas de alta velocidad para piezas electrónicas.'),
('21051565', '2025-01-25', 0, 600750, 'Robot de transporte interno autónomo para mover productos entre estaciones de trabajo en fábricas grandes.'),
('21051676', '2025-01-30', 0, 92500, 'Sistema automatizado de control y ensamblaje de motores pequeños con precisión robótica.'),
('21051787', '2025-02-05', 0, 132000, 'Robot programado para operaciones de soldadura de precisión en áreas de difícil acceso.'),
('21051898', '2025-06-15', 0, 490000, 'Robot autónomo para manejo de materiales delicados en líneas de empaque de productos.'),
('21051979', '2025-06-20', 0, 860000, 'Sistema robótico para ensamblaje de componentes complejos con control de calidad en tiempo real.'),
('210520810', '2025-06-25', 0, 75500, 'Robot rápido y preciso para carga y descarga de piezas en procesos industriales de alto volumen.'),
('210521911', '2025-06-30', 0, 125000, 'Robot con tecnología de visión para tareas de inspección y mantenimiento en sistemas industriales.'),
('210522612', '2025-08-10', 0, 355000, 'Robot de alta precisión para ensamblaje de dispositivos electrónicos de consumo masivo.'),
('210523713', '2024-10-19', 1, 410000, 'Brazo robótico especializado para tareas de precisión en ensamblaje de piezas delicadas.'),
('210524814', '2024-10-12', 1, 295000, 'Robot diseñado para inspección de calidad automatizada en líneas de empaque de productos de consumo.'),
('210525915', '2024-09-25', 1, 630000, 'Robot autónomo con sistema de aprendizaje para manipular materiales en procesos industriales variables.'),
('210526616', '2024-08-15', 1, 910000, 'Sistema de robots de alta precisión para ensamblaje en masa en industria de electrónica.'),
('210527717', '2024-07-20', 1, 845000, 'Robot con sensores avanzados para optimizar la productividad en líneas de producción.'),
('210528818', '2024-06-01', 1, 450000, 'Robot móvil para transporte autónomo de materiales en almacenes con múltiples estaciones.'),
('210529919', '2024-05-10', 1, 145000, 'Brazo robótico de precisión para aplicaciones de ensamblaje en industria farmacéutica.'),
('210530620', '2024-04-15', 1, 330000, 'Robot para manejo de materiales frágiles en líneas de producción de alto volumen.'),
('210531721', '2023-02-01', 1, 520000, 'Robot especializado en ensamblaje de componentes automotrices de gran tamaño.'),
('210532822', '2023-02-05', 1, 340000, 'Brazo robótico para soldadura en procesos industriales de estructuras metálicas grandes.'),
('210533923', '2023-04-10', 1, 905000, 'Robot autónomo para inspección de maquinaria en áreas de difícil acceso en plantas.'),
('210534624', '2023-04-20', 1, 430000, 'Sistema robótico para control de calidad mediante visión artificial en productos embotellados.'),
('210535725', '2023-06-15', 1, 285000, 'Brazo robótico para ensamblaje de precisión en productos electrónicos delicados.'),
('210536826', '2023-06-30', 1, 680000, 'Robot para corte y manipulación de materiales en industria de manufactura pesada.'),
('210537927', '2023-08-05', 1, 25550, 'Brazo robótico de precisión para ensamblaje de dispositivos electrónicos pequeños.'),
('210538628', '2023-08-15', 1, 755000, 'Sistema de robots colaborativos para producción de electrodomésticos complejos.'),
('210539729', '2023-10-25', 1, 430000, 'Robot autónomo para navegación y traslado de productos en fábricas de múltiples áreas.'),
('210540830', '2022-01-01', 1, 150000, 'Sistema robótico para ensamblaje y soldadura en procesos de manufactura automotriz.'),
('210541931', '2022-01-10', 1, 640000, 'Robot para manipulación de materiales en almacenes de gran altura con control autónomo.'),
('210542632', '2022-01-20', 1, 995000, 'Robot con IA para clasificación y organización de componentes en producción masiva.'),
('210543733', '2022-02-15', 1, 850000, 'Brazo robótico industrial para montaje en producción de dispositivos electrónicos.'),
('210544834', '2022-03-10', 1, 99500, 'Sistema robótico para carga y descarga de materiales en líneas de ensamblaje industrial.'),
('210545935', '2022-04-01', 1, 430000, 'Robot colaborativo para manejo de materiales en áreas restringidas de producción.'),
('210546636', '2022-05-15', 1, 705000, 'Robot para ensamblaje de precisión en la industria de dispositivos electrónicos.'),
('210547737', '2022-06-10', 1, 290000, 'Sistema de robot para carga y descarga de mercancías pesadas en grandes almacenes.'),
('210548838', '2022-07-05', 1, 670000, 'Robot para tareas de ensamblaje de piezas automotrices en líneas de producción intensiva.'),
('210549939', '2022-12-01', 1, 750000, 'Robot para inspección de calidad en procesos de ensamblaje de electrónica avanzada.'),
('210550640', '2022-04-20', 1, 450000, 'Robot industrial para procesos de manufactura complejos con integración de IA para optimización.');

-- insert data in users_projects table example
-- ADMINS
INSERT INTO `MMC`.`users_projects` (`users_id`, `project_id`) VALUES 
(1, 1),
(2, 2),
(1, 3),
(2, 4),
(1, 5),
(2, 6),
(1, 7),
(1, 8),
(2, 9),
(2, 10),
(1, 11),
(1, 12),
(2, 13),
(1, 14),
(1, 15),
(2, 16),
(2, 17),
(1, 18),
(1, 19),
(2, 20),
(2, 21),
(1, 22),
(1, 23),
(2, 24),
(2, 25),
(1, 26),
(1, 27),
(2, 28),
(2, 29),
(1, 30),
(1, 31),
(2, 32),
(2, 33),
(1, 34),
(1, 35),
(2, 36),
(1, 37),
(2, 38),
(2, 39),
(1, 40);
-- OPERS
INSERT INTO `MMC`.`users_projects` (`users_id`, `project_id`) VALUES 
(3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1),
(9, 2), (10, 2), (11, 2), (12, 2), (13, 2), (14, 2),
(15, 3), (16, 3), (17, 3), (18, 3), (19, 3), (20, 3),
(21, 4), (22, 4), (23, 4), (24, 4), (25, 4), (3, 4),
(4, 5), (5, 5), (6, 5), (7, 5), (8, 5), (9, 5),
(10, 6), (11, 6), (12, 6), (13, 6), (14, 6), (15, 6),
(16, 7), (17, 7), (18, 7), (19, 7), (20, 7), (21, 7),
(22, 8), (23, 8), (24, 8), (25, 8), (3, 8), (4, 8),
(5, 9), (6, 9), (7, 9), (8, 9), (9, 9), (10, 9),
(11, 10), (12, 10), (13, 10), (14, 10), (15, 10), (16, 10),
(17, 11), (18, 11), (19, 11), (20, 11), (21, 11), (22, 11),
(23, 12), (24, 12), (25, 12), (3, 12), (4, 12), (5, 12),
(6, 13), (7, 13), (8, 13), (9, 13), (10, 13), (11, 13),
(12, 14), (13, 14), (14, 14), (15, 14), (16, 14), (17, 14),
(18, 15), (19, 15), (20, 15), (21, 15), (22, 15), (23, 15),
(24, 16), (25, 16), (3, 16), (4, 16), (5, 16), (6, 16),
(7, 17), (8, 17), (9, 17), (10, 17), (11, 17), (12, 17),
(13, 18), (14, 18), (15, 18), (16, 18), (17, 18), (18, 18),
(19, 19), (20, 19), (21, 19), (22, 19), (23, 19), (24, 19),
(25, 20), (3, 20), (4, 20), (5, 20), (6, 20), (7, 20),
(8, 21), (9, 21), (10, 21), (11, 21), (12, 21), (13, 21),
(14, 22), (15, 22), (16, 22), (17, 22), (18, 22), (19, 22),
(20, 23), (21, 23), (22, 23), (23, 23), (24, 23), (25, 23),
(3, 24), (4, 24), (5, 24), (6, 24), (7, 24), (8, 24),
(9, 25), (10, 25), (11, 25), (12, 25), (13, 25), (14, 25),
(15, 26), (16, 26), (17, 26), (18, 26), (19, 26), (20, 26),
(21, 27), (22, 27), (23, 27), (24, 27), (25, 27), (3, 27),
(4, 28), (5, 28), (6, 28), (7, 28), (8, 28), (9, 28),
(10, 29), (11, 29), (12, 29), (13, 29), (14, 29), (15, 29),
(16, 30), (17, 30), (18, 30), (19, 30), (20, 30), (21, 30),
(22, 31), (23, 31), (24, 31), (25, 31), (3, 31), (4, 31),
(5, 32), (6, 32), (7, 32), (8, 32), (9, 32), (10, 32),
(11, 33), (12, 33), (13, 33), (14, 33), (15, 33), (16, 33),
(17, 34), (18, 34), (19, 34), (20, 34), (21, 34), (22, 34),
(23, 35), (24, 35), (25, 35), (3, 35), (4, 35), (5, 35),
(6, 36), (7, 36), (8, 36), (9, 36), (10, 36), (11, 36),
(12, 37), (13, 37), (14, 37), (15, 37), (16, 37), (17, 37),
(18, 38), (19, 38), (20, 38), (21, 38), (22, 38), (23, 38),
(24, 39), (25, 39), (3, 39), (4, 39), (5, 39), (6, 39),
(7, 40), (8, 40), (9, 40), (10, 40), (11, 40), (12, 40);

-- insert data in assembly table example
-- ACTIVES PROJECTS
INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(1, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(1, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(1, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(1, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(1, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(1, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(1, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(1, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(1, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(1, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(1, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(1, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(2, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(2, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(2, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(2, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(2, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(2, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(2, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(2, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(2, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(2, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(2, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(2, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(3, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(3, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(3, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(3, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(3, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(3, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(3, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(3, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(3, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(3, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(3, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(3, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(4, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(4, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(4, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(4, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(4, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(4, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(4, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(4, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(4, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(4, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(4, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(4, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(5, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(5, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(5, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(5, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(5, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(5, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(5, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(5, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(5, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(5, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(5, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(5, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(6, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(6, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(6, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(6, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(6, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(6, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(6, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(6, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(6, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(6, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(6, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(6, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);


INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(7, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(7, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(7, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(7, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(7, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(7, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(7, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(7, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(7, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(7, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(7, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(7, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(8, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(8, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(8, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(8, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(8, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(8, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(8, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(8, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(8, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(8, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(8, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(8, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(9, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(9, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(9, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(9, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(9, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(9, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(9, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(9, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(9, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(9, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(9, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(9, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(10, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(10, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(10, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(10, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(10, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(10, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(10, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(10, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(10, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(10, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(10, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(10, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(11, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(11, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(11, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(11, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(11, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(11, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(11, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(11, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(11, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(11, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(11, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(11, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(12, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-12', '2024-10-01', 3200, 'MXN', 0),
(12, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-15', '2024-10-05', 4500, 'MXN', 0),
(12, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-10', '2024-10-20', 2800, 'MXN', 0),
(12, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-12', '2024-10-25', 3700, 'MXN', 0),
(12, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-20', '2024-10-08', 3900, 'MXN', 0),
(12, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-17', '2024-10-26', 3100, 'MXN', 0),
(12, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-18', '2024-10-28', 5000, 'MXN', 0),
(12, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-19', '2024-10-13', 3600, 'MXN', 0),
(12, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-21', '2024-10-16', 4200, 'MXN', 0),
(12, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-22', '2024-10-21', 3300, 'MXN', 0),
(12, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-25', '2024-10-19', 3400, 'MXN', 0),
(12, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-30', '2024-10-31', 4600, 'MXN', 0);

-- CLOCED PROJECTS
INSERT INTO `MMC`.`assembly` (`project_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(13, 'ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(13, 'ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(13, 'ASM. 3 YMX-FAC-ASY-TRB-209938-3', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(14, 'ASM. 4 YMX-PEQ-ASY-FAC-209938-4', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(14, 'ASM. 5 YMX-CMP-ASY-VXZ-209938-5', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(14, 'ASM. 6 YMX-EAC-ASY-JGR-209938-6', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(15, 'ASM. 7 YMX-KQP-ASY-KTD-209938-7', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(15, 'ASM. 8 YMX-TRB-ASY-WNF-209938-8', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(15, 'ASM. 9 YMX-VXZ-ASY-PTF-209938-9', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(16, 'ASM. 10 YMX-KNK-ASY-OQN-209938-10', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(16, 'ASM. 11 YMX-TRB-ASY-MDW-209938-11', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(16, 'ASM. 12 YMX-INT-ASY-JVN-209938-12', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(17, 'ASM. 13 YMX-PNE-ASY-WFT-209938-13', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(17, 'ASM. 14 YMX-MEC-ASY-KQP-209938-14', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(17, 'ASM. 15 YMX-FAC-ASY-TRB-209938-15', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(18, 'ASM. 16 YMX-PEQ-ASY-FAC-209938-16', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(18, 'ASM. 17 YMX-CMP-ASY-VXZ-209938-17', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(18, 'ASM. 18 YMX-EAC-ASY-JGR-209938-18', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(19, 'ASM. 19 YMX-KQP-ASY-KTD-209938-19', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(19, 'ASM. 20 YMX-TRB-ASY-WNF-209938-20', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(19, 'ASM. 21 YMX-VXZ-ASY-PTF-209938-21', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(20, 'ASM. 22 YMX-KNK-ASY-OQN-209938-22', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(20, 'ASM. 23 YMX-TRB-ASY-MDW-209938-23', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(20, 'ASM. 24 YMX-INT-ASY-JVN-209938-24', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(21, 'ASM. 25 YMX-PNE-ASY-WFT-209938-25', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(21, 'ASM. 26 YMX-MEC-ASY-KQP-209938-26', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(21, 'ASM. 27 YMX-FAC-ASY-TRB-209938-27', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(22, 'ASM. 28 YMX-PEQ-ASY-FAC-209938-28', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(22, 'ASM. 29 YMX-CMP-ASY-VXZ-209938-29', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(22, 'ASM. 30 YMX-EAC-ASY-JGR-209938-30', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(23, 'ASM. 31 YMX-KQP-ASY-KTD-209938-31', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(23, 'ASM. 32 YMX-TRB-ASY-WNF-209938-32', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(23, 'ASM. 33 YMX-VXZ-ASY-PTF-209938-33', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(24, 'ASM. 34 YMX-KNK-ASY-OQN-209938-34', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(24, 'ASM. 35 YMX-TRB-ASY-MDW-209938-35', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(24, 'ASM. 36 YMX-INT-ASY-JVN-209938-36', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(25, 'ASM. 37 YMX-PNE-ASY-WFT-209938-37', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(25, 'ASM. 38 YMX-MEC-ASY-KQP-209938-38', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(25, 'ASM. 39 YMX-FAC-ASY-TRB-209938-39', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(26, 'ASM. 40 YMX-PEQ-ASY-FAC-209938-40', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(26, 'ASM. 41 YMX-CMP-ASY-VXZ-209938-41', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(26, 'ASM. 42 YMX-EAC-ASY-JGR-209938-42', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(27, 'ASM. 43 YMX-KQP-ASY-KTD-209938-43', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(27, 'ASM. 44 YMX-TRB-ASY-WNF-209938-44', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(27, 'ASM. 45 YMX-VXZ-ASY-PTF-209938-45', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(28, 'ASM. 46 YMX-KNK-ASY-OQN-209938-46', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(28, 'ASM. 47 YMX-TRB-ASY-MDW-209938-47', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(28, 'ASM. 48 YMX-INT-ASY-JVN-209938-48', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(29, 'ASM. 49 YMX-PNE-ASY-WFT-209938-49', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(29, 'ASM. 50 YMX-MEC-ASY-KQP-209938-50', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(29, 'ASM. 51 YMX-FAC-ASY-TRB-209938-51', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(30, 'ASM. 52 YMX-PEQ-ASY-FAC-209938-52', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(30, 'ASM. 53 YMX-CMP-ASY-VXZ-209938-53', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(30, 'ASM. 54 YMX-EAC-ASY-JGR-209938-54', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(31, 'ASM. 55 YMX-KQP-ASY-KTD-209938-55', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(31, 'ASM. 56 YMX-TRB-ASY-WNF-209938-56', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(31, 'ASM. 57 YMX-VXZ-ASY-PTF-209938-57', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(32, 'ASM. 58 YMX-KNK-ASY-OQN-209938-58', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(32, 'ASM. 59 YMX-TRB-ASY-MDW-209938-59', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(32, 'ASM. 60 YMX-INT-ASY-JVN-209938-60', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(33, 'ASM. 61 YMX-PNE-ASY-WFT-209938-61', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(33, 'ASM. 62 YMX-MEC-ASY-KQP-209938-62', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(33, 'ASM. 63 YMX-FAC-ASY-TRB-209938-63', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(34, 'ASM. 64 YMX-PEQ-ASY-FAC-209938-64', 'description', '2024-11-10', '2024-10-25', 3700, 'MXN', 0),
(34, 'ASM. 65 YMX-CMP-ASY-VXZ-209938-65', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(34, 'ASM. 66 YMX-EAC-ASY-JGR-209938-66', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(35, 'ASM. 67 YMX-KQP-ASY-KTD-209938-67', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(35, 'ASM. 68 YMX-TRB-ASY-WNF-209938-68', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(35, 'ASM. 69 YMX-VXZ-ASY-PTF-209938-69', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(36, 'ASM. 70 YMX-KNK-ASY-OQN-209938-70', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(36, 'ASM. 71 YMX-TRB-ASY-MDW-209938-71', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(36, 'ASM. 72 YMX-INT-ASY-JVN-209938-72', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0),

(37, 'ASM. 73 YMX-PNE-ASY-WFT-209938-73', 'description', '2024-11-10', '2024-10-01', 3200, 'MXN', 0),
(37, 'ASM. 74 YMX-MEC-ASY-KQP-209938-74', 'description', '2024-11-11', '2024-10-05', 4500, 'MXN', 0),
(37, 'ASM. 75 YMX-FAC-ASY-TRB-209938-75', 'description', '2024-11-12', '2024-10-20', 2800, 'MXN', 0),

(38, 'ASM. 76 YMX-PEQ-ASY-FAC-209938-76', 'description', '2024-11-10', '2024-10-25', 1300, 'MXN', 0),
(38, 'ASM. 77 YMX-CMP-ASY-VXZ-209938-77', 'description', '2024-11-11', '2024-10-08', 3900, 'MXN', 0),
(38, 'ASM. 78 YMX-EAC-ASY-JGR-209938-78', 'description', '2024-11-12', '2024-10-26', 3100, 'MXN', 0),

(39, 'ASM. 79 YMX-KQP-ASY-KTD-209938-79', 'description', '2024-11-10', '2024-10-28', 5000, 'MXN', 0),
(39, 'ASM. 80 YMX-TRB-ASY-WNF-209938-80', 'description', '2024-11-11', '2024-10-13', 3600, 'MXN', 0),
(39, 'ASM. 81 YMX-VXZ-ASY-PTF-209938-81', 'description', '2024-11-12', '2024-10-16', 4200, 'MXN', 0),

(40, 'ASM. 82 YMX-KNK-ASY-OQN-209938-82', 'description', '2024-11-10', '2024-10-21', 3300, 'MXN', 0),
(40, 'ASM. 83 YMX-TRB-ASY-MDW-209938-83', 'description', '2024-11-11', '2024-10-19', 3400, 'MXN', 0),
(40, 'ASM. 84 YMX-INT-ASY-JVN-209938-84', 'description', '2024-11-12', '2024-10-31', 4600, 'MXN', 0);

-- insert data in subassembly table example
-- ACTIVE PROJECTS
-- 1, 2, 13, 14, 25, 26, 37, 38, 49, 50, 61, 62, 73, 74, 85, 86, 97, 98, 109, 110, 121, 122, 133, 134
INSERT INTO `MMC`.`subassembly` (`assembly_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(1, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(1, 'SUB.ASM. 2 YMX-PNE-ASY-WFT-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(2, 'SUB.ASM. 1 YMX-MEC-ASY-KQP-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(2, 'SUB.ASM. 2 YMX-MEC-ASY-KQP-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(13, 'SUB.ASM. 1 YMX-FAC-ASY-TRB-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(13, 'SUB.ASM. 2 YMX-FAC-ASY-TRB-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(14, 'SUB.ASM. 1 YMX-PEQ-ASY-FAC-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(14, 'SUB.ASM. 2 YMX-PEQ-ASY-FAC-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(25, 'SUB.ASM. 1 YMX-CMP-ASY-VXZ-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(25, 'SUB.ASM. 2 YMX-CMP-ASY-VXZ-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(26, 'SUB.ASM. 1 YMX-EAC-ASY-JGR-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(26, 'SUB.ASM. 2 YMX-EAC-ASY-JGR-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(37, 'SUB.ASM. 1 YMX-KQP-ASY-KTD-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(37, 'SUB.ASM. 2 YMX-KQP-ASY-KTD-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(38, 'SUB.ASM. 1 YMX-TRB-ASY-WNF-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(38, 'SUB.ASM. 2 YMX-TRB-ASY-WNF-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(49, 'SUB.ASM. 1 YMX-VXZ-ASY-PTF-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(49, 'SUB.ASM. 2 YMX-VXZ-ASY-PTF-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(50, 'SUB.ASM. 1 YMX-KNK-ASY-OQN-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(50, 'SUB.ASM. 2 YMX-KNK-ASY-OQN-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(61, 'SUB.ASM. 1 YMX-TRB-ASY-MDW-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(61, 'SUB.ASM. 2 YMX-TRB-ASY-MDW-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(62, 'SUB.ASM. 1 YMX-INT-ASY-JVN-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(62, 'SUB.ASM. 2 YMX-INT-ASY-JVN-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(73, 'SUB.ASM. 1 YMX-SUB-ASY-XYZ-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(73, 'SUB.ASM. 2 YMX-SUB-ASY-XYZ-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(74, 'SUB.ASM. 1 YMX-SUB-ASY-ABC-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(74, 'SUB.ASM. 2 YMX-SUB-ASY-ABC-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(85, 'SUB.ASM. 1 YMX-SUB-ASY-PQR-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(85, 'SUB.ASM. 2 YMX-SUB-ASY-PQR-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(86, 'SUB.ASM. 1 YMX-SUB-ASY-LMN-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(86, 'SUB.ASM. 2 YMX-SUB-ASY-LMN-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(97, 'SUB.ASM. 1 YMX-SUB-ASY-XYZ-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(97, 'SUB.ASM. 2 YMX-SUB-ASY-XYZ-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(98, 'SUB.ASM. 1 YMX-SUB-ASY-ABC-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(98, 'SUB.ASM. 2 YMX-SUB-ASY-ABC-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(109, 'SUB.ASM. 1 YMX-SUB-ASY-PQR-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(109, 'SUB.ASM. 2 YMX-SUB-ASY-PQR-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(110, 'SUB.ASM. 1 YMX-SUB-ASY-LMN-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(110, 'SUB.ASM. 2 YMX-SUB-ASY-LMN-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(121, 'SUB.ASM. 1 YMX-SUB-ASY-XYZ-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(121, 'SUB.ASM. 2 YMX-SUB-ASY-XYZ-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(122, 'SUB.ASM. 1 YMX-SUB-ASY-ABC-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(122, 'SUB.ASM. 2 YMX-SUB-ASY-ABC-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(133, 'SUB.ASM. 1 YMX-SUB-ASY-PQR-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(133, 'SUB.ASM. 2 YMX-SUB-ASY-PQR-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(134, 'SUB.ASM. 1 YMX-SUB-ASY-LMN-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0),
(134, 'SUB.ASM. 2 YMX-SUB-ASY-LMN-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 0);

-- COMPLETED PROJECTS
-- 145, 148, 151, 154, 157, 160, 163, 166, 169, 172, 175, 178, 181, 184, 187, 190, 193, 196, 199, 202, 205, 208, 211, 214, 217, 220, 223, 226
INSERT INTO `MMC`.`subassembly` (`assembly_id`, `identification_number`, `description`, `delivery_date`, `completed_date`, `price`, `currency`, `completed`) VALUES 
(145, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-1', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(148, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-2', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(151, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-3', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(154, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-4', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(157, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-5', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(160, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-6', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(163, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-7', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(166, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-8', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(169, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-9', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(172, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-10', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(175, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-11', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(178, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-12', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(181, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-13', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(184, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-14', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(187, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-15', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(190, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-16', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(193, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-17', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(196, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-18', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(199, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-19', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(202, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-20', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(205, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-21', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(208, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-22', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(211, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-23', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(214, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-24', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(217, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-25', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(220, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-26', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(223, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-27', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1),
(226, 'SUB.ASM. 1 YMX-PNE-ASY-WFT-209938-28', 'description', '2024-12-01', '2024-11-01', 1000, 'MXN', 1);

-- insert data in items table example
-- 15 MATERIALES EN ENSAMBLES DIRECTOS 
-- 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144.
-- 146, 147, 149, 150, 152, 153, 155, 156, 158, 159, 161, 162, 164, 165, 167, 168, 170, 171, 173, 174, 176, 177, 179, 180, 182, 183, 185, 186, 188, 189, 191, 192, 194, 195, 197, 198, 200, 201, 203, 204, 206, 207, 209, 210, 212, 213, 215, 216, 218, 219, 221, 222, 224, 225, 227, 228
-- 10 MATERIALES EN SUBENSAMBLES
-- 1, 2, 13, 14, 25, 26, 37, 38, 49, 50, 61, 62, 73, 74, 85, 86, 97, 98, 109, 110, 121, 122, 133, 134
-- 145, 148, 151, 154, 157, 160, 163, 166, 169, 172, 175, 178, 181, 184, 187, 190, 193, 196, 199, 202, 205, 208, 211, 214, 217, 220, 223, 226

DESCRIBE `MMC`.`items`;
-- STOCK ITEM
INSERT INTO `MMC`.`items` (
  `name`, `description`, `price`, `currency`, `supplier`) VALUES (
  'Item 3 for Stock', 'Description of Item', 100, 'USD', 'Supplier');
-- PROJECT & ASSEMBLY ITEM
INSERT INTO `MMC`.`items` (
  `project_id`, `assembly_id`, `name`, `description`, `project_assignment_quantity`, `price`, `currency`, `arrived_date`, 
  `date_order`, `in_assembly`, `number_material`, `number_cotizacion`, `supplier`) VALUES (
  42, 13, 'Item for Assembly', 'Description of Item', 1, 100, 'USD', '2024-09-01', '2024-08-01', 1, 
  '003', 'PN003', 'Supplier');
select * from mmc.items;

-- insert data in stock table example
DESCRIBE `MMC`.`stock`;
INSERT INTO `MMC`.`stock` (`stock_quantity`)
VALUES 
(1);
select * from mmc.stock;

-- insert data in stock_items table example
DESCRIBE `MMC`.`stock_items`;
INSERT INTO `MMC`.`stock_items` (`item_id`, `stock_id`)
VALUES 
(70, 16); 
select * from mmc.stock_items;

-- insert data in bom table example
DESCRIBE `MMC`.`bom`;
-- STOCK ASSIGNMENT
INSERT INTO `MMC`.`bom` (`project_id`, `assembly_id`, `stock_items_id`) 
VALUES (41, 9, 13);
-- PROJECT & ASSEMBLY ASSIGNMENT
INSERT INTO `MMC`.`bom` (`project_id`, `assembly_id`, `item_id`) 
VALUES (42, 13, 74);
select * from mmc.bom;



