-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191),
    `email` VARCHAR(191),
    `imageUrl` VARCHAR(191),
    `accessToken` VARCHAR(191),
    `signUpWith` VARCHAR(191),
    `joinedOn` DATETIME(3),
UNIQUE INDEX `User.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` VARCHAR(191),
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postID` INTEGER,
    `tagID` INTEGER,
    `name` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD FOREIGN KEY (`tagID`) REFERENCES `TagList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
