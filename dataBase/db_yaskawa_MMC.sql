-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MMC
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema MMC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MMC` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema new_schema1
-- -----------------------------------------------------
USE `MMC` ;

-- -----------------------------------------------------
-- Table `MMC`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `identification_number` INT(30) NOT NULL,
  `delivery_date` DATE NULL,
  `completed` TINYINT NOT NULL DEFAULT 0,
  `cost_material` INT NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `identification_number_UNIQUE` (`identification_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`user_type` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(15) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_type_id` INT UNSIGNED NOT NULL,
  `user_number` VARCHAR(25) NOT NULL,
  `email` VARCHAR(65) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `deleted_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_type_id_fk_idx` (`user_type_id` ASC) VISIBLE,
  CONSTRAINT `user_type_user_id_fk`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `MMC`.`user_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`assembly`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`assembly` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `identification_number` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL,
  `delivery_date` DATE NULL,
  `completed_date` DATE NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(5) NOT NULL,
  `completed_assembly` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `project_id_fk_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `project_id_assembly_fk`
    FOREIGN KEY (`project_id`)
    REFERENCES `MMC`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `assembly_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(110) NOT NULL,
  `description` VARCHAR(255) NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `currency` VARCHAR(5) NOT NULL,
  `arrived_date` DATE NULL,
  `date_order` DATE NULL,
  `in_assembly` TINYINT NULL,
  `number_material` INT NOT NULL,
  `number_price_item` VARCHAR(25) NULL,
  `supplier` VARCHAR(55) NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `project_id_fk_idx` (`project_id` ASC) VISIBLE,
  INDEX `assembly_fk_idx` (`assembly_id` ASC) VISIBLE,
  CONSTRAINT `project_id_items_fk`
    FOREIGN KEY (`project_id`)
    REFERENCES `MMC`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `assembly_items_fk`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `MMC`.`assembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`bom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`bom` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `assembly_id` INT UNSIGNED NOT NULL,
  `item_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `project_id_fk_idx` (`project_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `assembly_id_bom_fk_idx` (`assembly_id` ASC) VISIBLE,
  CONSTRAINT `item_id_bom_fk`
    FOREIGN KEY (`item_id`)
    REFERENCES `MMC`.`items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `project_id_bom_fk`
    FOREIGN KEY (`project_id`)
    REFERENCES `MMC`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `assembly_id_bom_fk`
    FOREIGN KEY (`assembly_id`)
    REFERENCES `MMC`.`assembly` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`users_projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`users_projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT UNSIGNED NOT NULL,
  `project_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `projects_id_fk_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_users_id_users_projects_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_id_users_projects`
    FOREIGN KEY (`users_id`)
    REFERENCES `MMC`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_projects_id_users_projects`
    FOREIGN KEY (`project_id`)
    REFERENCES `MMC`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MMC`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MMC`.`stock` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(110) NOT NULL,
  `description` VARCHAR(255) NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `currency` VARCHAR(5) NOT NULL,
  `supplier` VARCHAR(55) NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
