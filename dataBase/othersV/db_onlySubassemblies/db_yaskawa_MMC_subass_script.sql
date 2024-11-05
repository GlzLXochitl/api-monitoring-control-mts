-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mmc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mmc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mmc` ;
USE `mmc` ;

-- -----------------------------------------------------
-- Table `mmc`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`projects` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `identification_number` BIGINT NOT NULL,
  `delivery_date` DATE NULL DEFAULT NULL,
  `completed` TINYINT(4) NOT NULL DEFAULT 0,
  `cost_material` INT(11) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `identification_number_UNIQUE` (`identification_number` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`assembly`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`assembly` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT(10) UNSIGNED NOT NULL,
  `identification_number` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `delivery_date` DATE NULL DEFAULT NULL,
  `completed_date` DATE NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(5) NULL,
  `completed` TINYINT(4) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `project_id_fk_idx` (`project_id` ASC),
  CONSTRAINT `project_id_assembly_fk`
    FOREIGN KEY (`project_id`)
    REFERENCES `mmc`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`subassembly`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`subassembly` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `assembly_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `identification_number` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `delivery_date` DATE NULL DEFAULT NULL,
  `completed_date` DATE NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  `currency` VARCHAR(5) NULL DEFAULT NULL,
  `completed` TINYINT(4) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `assembly_id_assembly_fk0_idx` (`assembly_id` ASC),
  CONSTRAINT `assembly_id_assembly_fk`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `mmc`.`assembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`items` (
  `id` INT(10) UNSIGNED NULL AUTO_INCREMENT,
  `assembly_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `subassembly_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(110) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `subassembly_assignment_quantity` DECIMAL(10,0) NULL DEFAULT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `currency` VARCHAR(5) NULL DEFAULT NULL,
  `arrived_date` DATE NULL DEFAULT NULL,
  `date_order` DATE NULL DEFAULT NULL,
  `in_subassembly` TINYINT(4) NULL DEFAULT NULL,
  `number_material` INT(11) NULL DEFAULT NULL,
  `number_cotizacion` VARCHAR(25) NULL DEFAULT NULL,
  `supplier` VARCHAR(55) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `subassembly_items_fk_idx` (`subassembly_id` ASC),
  INDEX `assembly_items_fk_idx` (`assembly_id` ASC),
  CONSTRAINT `subassembly_items_fk`
    FOREIGN KEY (`subassembly_id`)
    REFERENCES `mmc`.`subassembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `assembly_items_fk`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `mmc`.`assembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`stock` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `stock_quantity` DECIMAL(10,0) NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 13;


-- -----------------------------------------------------
-- Table `mmc`.`stock_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`stock_items` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_id` INT(10) UNSIGNED NOT NULL,
  `stock_id` INT(10) UNSIGNED NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `item_id_stock_fk_idx` (`item_id` ASC),
  INDEX `stock_id_stock_items_fk_idx` (`stock_id` ASC),
  CONSTRAINT `item_id_stock_items_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `mmc`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `stock_id_stock_items_fk`
    FOREIGN KEY (`stock_id`)
    REFERENCES `mmc`.`stock` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`bom` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `assembly_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `subassembly_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `item_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `stock_items_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `project_id_fk_idx` (`project_id` ASC),
  INDEX `assembly_id_bom_fk_idx` (`assembly_id` ASC),
  INDEX `item_id_bom_fk` (`item_id` ASC),
  INDEX `stock_items_id_bom_fk_idx` (`stock_items_id` ASC),
  INDEX `subassembly_id_bom_fk_idx` (`subassembly_id` ASC),
  CONSTRAINT `assembly_id_bom_fk`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `mmc`.`assembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `item_id_bom_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `mmc`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `project_id_bom_fk`
    FOREIGN KEY (`project_id`)
    REFERENCES `mmc`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `stock_items_id_bom_fk`
    FOREIGN KEY (`stock_items_id`)
    REFERENCES `mmc`.`stock_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `subassembly_id_bom_fk`
    FOREIGN KEY (`subassembly_id`)
    REFERENCES `mmc`.`subassembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`user_type` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type_id` INT(10) UNSIGNED NOT NULL,
  `user_number` VARCHAR(25) NOT NULL,
  `email` VARCHAR(65) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `user_type_id_fk_idx` (`user_type_id` ASC),
  CONSTRAINT `user_type_user_id_fk`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `mmc`.`user_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mmc`.`users_projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mmc`.`users_projects` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT(10) UNSIGNED NOT NULL,
  `project_id` INT(10) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `projects_id_fk_idx` (`project_id` ASC),
  INDEX `fk_users_id_users_projects_idx` (`users_id` ASC),
  CONSTRAINT `fk_projects_id_users_projects`
    FOREIGN KEY (`project_id`)
    REFERENCES `mmc`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_id_users_projects`
    FOREIGN KEY (`users_id`)
    REFERENCES `mmc`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
