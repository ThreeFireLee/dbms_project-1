create table if not exists `Role`(
	`id` int primary key auto_increment,
	`age` int,
	`email` varchar(200) not null unique,
	`password` varchar(200) not null
);

create table if not exists `Name`(
	`role` int primary key auto_increment,
	`first` varchar(200),
	`middle` varchar(200),
	`last` varchar(200),
	foreign key (`role`) references `Role`(`id`)
	on update cascade on delete cascade
);

create table if not exists `Address`(
	`id` int primary key auto_increment,
	`name` varchar(200) not null,
	`phone` varchar(200) not null,
	`postal` varchar(200) not null,
	`street` varchar(200) not null,
	`apt` varchar(200) not null,
	`state` varchar(200) not null,
	`country` varchar(200) not null,
	`role` int,
	foreign key (`role`) references `Role`(`id`)
	on update cascade on delete set null
);

create table if not exists `Payment`(
	`id` int primary key auto_increment,
	`creditType` enum("visa", "mastercard", "discovery", "amex") not null,
	`cardNumber` varchar(200) not null,
	`validDate` varchar(200) not null,
	`cardHolder` varchar(200) not null,
	`role` int not null,
	foreign key (`role`) references `Role`(`id`)
	on update cascade on delete cascade
);

create table if not exists `Buyer`(
	`role` int primary key auto_increment,
	foreign key (`role`) references `Role`(`id`)
	on update cascade on delete cascade
);

create table if not exists `Seller`(
	`role` int primary key auto_increment,
	foreign key (`role`) references `Role`(`id`)
	on update cascade on delete cascade
);

create table if not exists `Order`(
	`id` int primary key auto_increment,
	`createTime` timestamp not null default current_timestamp,
	`address` int not null,
	foreign key (`address`) references `Address`(`id`)
	on update cascade on delete no action,
	`buyer` int not null,
	foreign key (`buyer`) references `Buyer`(`role`)
	on update cascade on delete no action
);

create table if not exists `Item`(
	`id` int primary key auto_increment,
	`name` varchar(200) not null,
	`price` double not null default 0,
	`quantity` int not null default 0,
	`description` varchar(500),
	`seller` int,
	foreign key (`seller`) references `Seller`(`role`)
	on update cascade on delete no action,
	`order` int,
	foreign key (`order`) references `Order`(`id`)
	on update cascade on delete cascade
);

create table if not exists `ShoppingCart`(
	`quantity` int not null default 0,
	`buyer` int not null,
	foreign key (`buyer`) references `Buyer`(`role`)
	on update cascade on delete cascade,
	`item` int not null,
	foreign key (`item`) references `Item`(`id`)
	on update cascade on delete cascade,
	primary key (`buyer`, `item`)
);
