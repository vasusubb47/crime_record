-- CreateTable
CREATE TABLE `appleal` (
    `area_code` VARCHAR(7) NOT NULL,
    `court_id` VARCHAR(7) NOT NULL,
    `date_appleal` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`area_code`, `court_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `court` (
    `id` VARCHAR(7) NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `area` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crime` (
    `id` VARCHAR(7) NOT NULL,
    `location` VARCHAR(40) NOT NULL,
    `type_of_crime` VARCHAR(40) NOT NULL,
    `date_of_crime` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fir_id` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crime_archive` (
    `verdict` TEXT NOT NULL,
    `verdict_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `crn_id` VARCHAR(7) NOT NULL,
    `court_id` VARCHAR(7) NOT NULL,

    INDEX `court_id`(`crn_id`, `court_id`),
    UNIQUE INDEX `crime_archive`(`crn_id`, `court_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `crime_commited` (
    `crn_id` VARCHAR(7) NOT NULL,
    `criminal_id` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`crn_id`, `criminal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `criminal` (
    `id` VARCHAR(7) NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `address` VARCHAR(40) NOT NULL,
    `phone_number` VARCHAR(13) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fir` (
    `id` VARCHAR(7) NOT NULL,
    `date_of_filling` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `witness_name` VARCHAR(40) NOT NULL,
    `witness_pho` VARCHAR(13) NOT NULL,
    `summary` TEXT NOT NULL,
    `area_code` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `police_station` (
    `id` VARCHAR(7) NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `address` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appleal` ADD CONSTRAINT `appleal_area_code_fkey` FOREIGN KEY (`area_code`) REFERENCES `police_station`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `appleal` ADD CONSTRAINT `appleal_court_id_fkey` FOREIGN KEY (`court_id`) REFERENCES `court`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `crime` ADD CONSTRAINT `crime_fir_id_fkey` FOREIGN KEY (`fir_id`) REFERENCES `fir`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `crime_archive` ADD CONSTRAINT `crime_archive_court_id_fkey` FOREIGN KEY (`court_id`) REFERENCES `court`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `crime_archive` ADD CONSTRAINT `crime_archive_crn_id_fkey` FOREIGN KEY (`crn_id`) REFERENCES `crime`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `crime_commited` ADD CONSTRAINT `crime_commited_criminal_id_fkey` FOREIGN KEY (`criminal_id`) REFERENCES `criminal`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `crime_commited` ADD CONSTRAINT `crime_commited_crn_id_fkey` FOREIGN KEY (`crn_id`) REFERENCES `crime`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fir` ADD CONSTRAINT `fir_area_code_fkey` FOREIGN KEY (`area_code`) REFERENCES `police_station`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
