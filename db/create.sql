drop sequence if exists seq_users;
create sequence seq_users;

drop sequence if exists seq_authority;
create sequence seq_authority;

drop table if exists user_roles;

drop table if exists authorities;
drop table if exists users;

create table users (
	id bigint,
	displayName varchar(32),
	email varchar(32),
	password varchar(32),
	enable boolean default true,
	primary key(id),
	unique(email),
	check(email is not null and email <> ''),
	check(password is not null and password <> '')
);

create table authorities (
	id bigint,
	authority text not null,
	primary key (id),
	check (authority <> '')
);

create table user_roles (
	id_user bigint not null,
	id_authority bigint not null,
	primary key(id_user, id_authority),
	foreign key(id_user) references users(id),
	foreign key(id_authority) references authorities(id)
);

insert into authorities (id, authority) values (1, 'ROLE_ADMIN');
insert into authorities (id, authority) values (2, 'ROLE_PLAYER');

insert into users (id, displayname, enable, email, password) 
values (nextval('seq_users'), 
'Administrator',
't',
'root@dbzwcg.com', 
'root');

insert into user_roles (id_user, id_authority)
values (1, 1);

select * from users;
select * from authorities;
select * from user_roles;