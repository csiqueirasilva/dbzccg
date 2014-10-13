drop schema public cascade;
create schema public;

create sequence seq_instance_cards;
create sequence seq_source_cards;
create sequence seq_decks;
create sequence seq_users;
create sequence seq_authority;

create table users (
	id bigint,
	email text,
	password text,
	enable boolean default true,
	primary key(id),
	unique(email),
	check(email is not null and email <> ''),
	check(password is not null and password <> '')
);

create table players (
	id_user bigint,
	displayName varchar(32),
	points integer not null default 1000 /* Should be 0 */,
	foreign key (id_user) references users (id)
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

insert into users (id, enable, email, password) 
values (nextval('seq_users'), 
't',
'root@dbzwcg.com', 
'$2a$10$0uF2XwWv9UxLUDVDRwFNG.PtDyHQ73oaUV/0cvxqoosbvnWiELK0G'); /* 'root' using Bcrypt */

insert into players (id_user, displayname, points)
values ((select id from users where email = 'root@dbzwcg.com'), 'Administrator', 1000);

create table source_cards (
	id bigint,
	saga text not null,
	number text not null,
	name text not null,
	description text not null,
	rarity text not null,
	decklimit integer,
	collection text not null,
	style text not null,
	unique(saga, number),
	primary key(id)
);

create table source_dragonballs (
	dbcode text not null,
	id_source_card bigint not null,
	primary key(dbcode, id_source_card),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table source_personalities (
	id_source_card bigint not null,
	pur bigint not null,
	personalitylevel bigint not null,
	alignment text,
	primary key(id_source_card),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table personalities_power_stages (
	id_source_card bigint,
	powerstage text,
	foreign key(id_source_card) references source_personalities(id_source_card) ON DELETE CASCADE ON UPDATE CASCADE
);

create table types_source_cards (
	id_source_card bigint,
	type text,
	unique (id_source_card, type),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table effects_source_cards (
	id_source_card bigint,
	effect text,
	unique (id_source_card, effect),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table personalities_source_cards (
	id_source_card bigint,
	personality text,
	unique (id_source_card, personality),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table headshots_source_cards (
	id_source_card bigint,
	personality text,
	unique (id_source_card, personality),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table instance_cards (
	id bigint,
	id_user bigint not null,
	id_source_card bigint not null,
	offer_trade boolean default false,
	texture text not null,
	tradeable boolean not null default true,
	specular_map text not null,
	foil text,
	alt_art boolean default false,
	check((tradeable = false and offer_trade = true) IS FALSE),
	primary key(id),
	foreign key(id_source_card) references source_cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
	foreign key(id_user) references users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table proxy_cards (
	id_instance_card bigint not null,
	foreign key (id_instance_card) references instance_cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key (id_instance_card)
);

create table decks (
	id bigint,
	id_user bigint not null,
	name text not null default 'Untitled Deck',
	alignment text,
	primary key(id),
	foreign key(id_user) references users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table cards_in_deck (
	id_card bigint not null,
	id_deck bigint not null,
	primary key(id_card, id_deck),
	foreign key(id_card) references instance_cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
	foreign key(id_deck) references decks(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table mainpersonalitycards_in_deck (
	id_card bigint not null,
	id_deck bigint not null,
	primary key(id_card, id_deck),
	foreign key(id_card) references instance_cards(id) ON DELETE CASCADE ON UPDATE CASCADE,
	foreign key(id_deck) references decks(id) ON DELETE CASCADE ON UPDATE CASCADE
);

/*insert into source_cards (id, saga, number) values (nextval('seq_source_cards'), 'SAIYAN', '100'),(nextval('seq_source_cards'), 'SAIYAN', '108'),(nextval('seq_source_cards'), 'SAIYAN', '109'),(nextval('seq_source_cards'), 'SAIYAN', '110'),(nextval('seq_source_cards'), 'SAIYAN', '111'),(nextval('seq_source_cards'), 'SAIYAN', '112'),(nextval('seq_source_cards'), 'SAIYAN', '113'),(nextval('seq_source_cards'), 'SAIYAN', '114'),(nextval('seq_source_cards'), 'SAIYAN', '115'),(nextval('seq_source_cards'), 'SAIYAN', '116'),(nextval('seq_source_cards'), 'SAIYAN', '117'),(nextval('seq_source_cards'), 'SAIYAN', '118'),(nextval('seq_source_cards'), 'SAIYAN', '120'),(nextval('seq_source_cards'), 'SAIYAN', '121'),(nextval('seq_source_cards'), 'SAIYAN', '122'),(nextval('seq_source_cards'), 'SAIYAN', '123'),(nextval('seq_source_cards'), 'SAIYAN', '153'),(nextval('seq_source_cards'), 'SAIYAN', '154'),(nextval('seq_source_cards'), 'SAIYAN', '158'),(nextval('seq_source_cards'), 'SAIYAN', '159'),(nextval('seq_source_cards'), 'SAIYAN', '160'),(nextval('seq_source_cards'), 'SAIYAN', '173'),(nextval('seq_source_cards'), 'SAIYAN', '174'),(nextval('seq_source_cards'), 'SAIYAN', '175'),(nextval('seq_source_cards'), 'SAIYAN', '186'),(nextval('seq_source_cards'), 'SAIYAN', '187'),(nextval('seq_source_cards'), 'SAIYAN', '188'),(nextval('seq_source_cards'), 'SAIYAN', '189'),(nextval('seq_source_cards'), 'SAIYAN', '190'),(nextval('seq_source_cards'), 'SAIYAN', '192'),(nextval('seq_source_cards'), 'SAIYAN', '193'),(nextval('seq_source_cards'), 'SAIYAN', '199'),(nextval('seq_source_cards'), 'SAIYAN', '200'),(nextval('seq_source_cards'), 'SAIYAN', '201'),(nextval('seq_source_cards'), 'SAIYAN', '203'),(nextval('seq_source_cards'), 'SAIYAN', '204'),(nextval('seq_source_cards'), 'SAIYAN', '205'),(nextval('seq_source_cards'), 'SAIYAN', '206'),(nextval('seq_source_cards'), 'SAIYAN', '209'),(nextval('seq_source_cards'), 'SAIYAN', '210'),(nextval('seq_source_cards'), 'SAIYAN', '212'),(nextval('seq_source_cards'), 'SAIYAN', '216'),(nextval('seq_source_cards'), 'SAIYAN', '219'),(nextval('seq_source_cards'), 'SAIYAN', '220'),(nextval('seq_source_cards'), 'SAIYAN', '226'),(nextval('seq_source_cards'), 'SAIYAN', '240'),(nextval('seq_source_cards'), 'SAIYAN', '247'),(nextval('seq_source_cards'), 'SAIYAN', '248'),(nextval('seq_source_cards'), 'SAIYAN', '249'),(nextval('seq_source_cards'), 'SAIYAN', '250'),(nextval('seq_source_cards'), 'SAIYAN', 'Foil'),(nextval('seq_source_cards'), 'SAIYAN', '001'),(nextval('seq_source_cards'), 'SAIYAN', '002'),(nextval('seq_source_cards'), 'SAIYAN', '003'),(nextval('seq_source_cards'), 'SAIYAN', '004'),(nextval('seq_source_cards'), 'SAIYAN', '005'),(nextval('seq_source_cards'), 'SAIYAN', '006'),(nextval('seq_source_cards'), 'SAIYAN', '007'),(nextval('seq_source_cards'), 'SAIYAN', '008'),(nextval('seq_source_cards'), 'SAIYAN', '009'),(nextval('seq_source_cards'), 'SAIYAN', '010'),(nextval('seq_source_cards'), 'SAIYAN', '011'),(nextval('seq_source_cards'), 'SAIYAN', '012'),(nextval('seq_source_cards'), 'SAIYAN', '013'),(nextval('seq_source_cards'), 'SAIYAN', '014'),(nextval('seq_source_cards'), 'SAIYAN', '015'),(nextval('seq_source_cards'), 'SAIYAN', '016'),(nextval('seq_source_cards'), 'SAIYAN', '017'),(nextval('seq_source_cards'), 'SAIYAN', '018'),(nextval('seq_source_cards'), 'SAIYAN', '019'),(nextval('seq_source_cards'), 'SAIYAN', '020'),(nextval('seq_source_cards'), 'SAIYAN', '021'),(nextval('seq_source_cards'), 'SAIYAN', '022'),(nextval('seq_source_cards'), 'SAIYAN', '023'),(nextval('seq_source_cards'), 'SAIYAN', '024'),(nextval('seq_source_cards'), 'SAIYAN', '025'),(nextval('seq_source_cards'), 'SAIYAN', '026'),(nextval('seq_source_cards'), 'SAIYAN', '027'),(nextval('seq_source_cards'), 'SAIYAN', '028'),(nextval('seq_source_cards'), 'SAIYAN', '029'),(nextval('seq_source_cards'), 'SAIYAN', '030'),(nextval('seq_source_cards'), 'SAIYAN', '031'),(nextval('seq_source_cards'), 'SAIYAN', '033'),(nextval('seq_source_cards'), 'SAIYAN', '034'),(nextval('seq_source_cards'), 'SAIYAN', '035'),(nextval('seq_source_cards'), 'SAIYAN', '036'),(nextval('seq_source_cards'), 'SAIYAN', '037'),(nextval('seq_source_cards'), 'SAIYAN', '038'),(nextval('seq_source_cards'), 'SAIYAN', '039'),(nextval('seq_source_cards'), 'SAIYAN', '040'),(nextval('seq_source_cards'), 'SAIYAN', '041'),(nextval('seq_source_cards'), 'SAIYAN', '042'),(nextval('seq_source_cards'), 'SAIYAN', '043'),(nextval('seq_source_cards'), 'SAIYAN', '044'),(nextval('seq_source_cards'), 'SAIYAN', '045'),(nextval('seq_source_cards'), 'SAIYAN', '046'),(nextval('seq_source_cards'), 'SAIYAN', '047'),(nextval('seq_source_cards'), 'SAIYAN', '048'),(nextval('seq_source_cards'), 'SAIYAN', '049'),(nextval('seq_source_cards'), 'SAIYAN', '050'),(nextval('seq_source_cards'), 'SAIYAN', '051'),(nextval('seq_source_cards'), 'SAIYAN', '052'),(nextval('seq_source_cards'), 'SAIYAN', '053'),(nextval('seq_source_cards'), 'SAIYAN', '054'),(nextval('seq_source_cards'), 'SAIYAN', '055'),(nextval('seq_source_cards'), 'SAIYAN', '056'),(nextval('seq_source_cards'), 'SAIYAN', '057'),(nextval('seq_source_cards'), 'SAIYAN', '058'),(nextval('seq_source_cards'), 'SAIYAN', '059'),(nextval('seq_source_cards'), 'SAIYAN', '060'),(nextval('seq_source_cards'), 'SAIYAN', '061'),(nextval('seq_source_cards'), 'SAIYAN', '062'),(nextval('seq_source_cards'), 'SAIYAN', '063'),(nextval('seq_source_cards'), 'SAIYAN', '064'),(nextval('seq_source_cards'), 'SAIYAN', '065'),(nextval('seq_source_cards'), 'SAIYAN', '066'),(nextval('seq_source_cards'), 'SAIYAN', '067'),(nextval('seq_source_cards'), 'SAIYAN', '068'),(nextval('seq_source_cards'), 'SAIYAN', '069'),(nextval('seq_source_cards'), 'SAIYAN', '070'),(nextval('seq_source_cards'), 'SAIYAN', '071'),(nextval('seq_source_cards'), 'SAIYAN', '072'),(nextval('seq_source_cards'), 'SAIYAN', '073'),(nextval('seq_source_cards'), 'SAIYAN', '074'),(nextval('seq_source_cards'), 'SAIYAN', '075'),(nextval('seq_source_cards'), 'SAIYAN', '076'),(nextval('seq_source_cards'), 'SAIYAN', '077'),(nextval('seq_source_cards'), 'SAIYAN', '078'),(nextval('seq_source_cards'), 'SAIYAN', '079'),(nextval('seq_source_cards'), 'SAIYAN', '080'),(nextval('seq_source_cards'), 'SAIYAN', '089'),(nextval('seq_source_cards'), 'SAIYAN', '090'),(nextval('seq_source_cards'), 'SAIYAN', '091'),(nextval('seq_source_cards'), 'SAIYAN', '092'),(nextval('seq_source_cards'), 'SAIYAN', '093'),(nextval('seq_source_cards'), 'SAIYAN', '094'),(nextval('seq_source_cards'), 'SAIYAN', '095'),(nextval('seq_source_cards'), 'SAIYAN', '096'),(nextval('seq_source_cards'), 'SAIYAN', '097'),(nextval('seq_source_cards'), 'SAIYAN', '098'),(nextval('seq_source_cards'), 'SAIYAN', '099');
*/
insert into user_roles (id_user, id_authority)
values (1, 1);

select * from users;
select * from authorities;
select * from user_roles;

select * from instance_cards;

select * from source_cards;
select * from source_dragonballs;
select * from headshots_source_cards;
select * from personalities_source_cards;
select * from effects_source_cards;

CREATE OR REPLACE FUNCTION second_pack_card_rarity() RETURNS text AS $$
	DECLARE
		rnd FLOAT;
		rarity TEXT;
	BEGIN
		rnd = random();

		IF rnd < 0.6 THEN 
			rarity = 'COMMON';
		ELSEIF rnd < 0.9 THEN
			rarity = 'UNCOMMON';
		ELSE
			rarity = 'RARE';
		END IF;
		
		RETURN rarity;
	 END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION third_pack_card_rarity() RETURNS text AS $$
	DECLARE
		rnd FLOAT;
		rarity TEXT;
	BEGIN
		rnd = random();

		IF rnd < 0.4 THEN 
			rarity = 'UNCOMMON';
		ELSE
			rarity = 'RARE';
		END IF;
		
		RETURN rarity;
	 END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_packs(qtt INTEGER, sga TEXT) RETURNS SETOF RECORD AS $$
	DECLARE
		rnd FLOAT;
	BEGIN
		FOR i in 1..qtt LOOP
			RETURN QUERY 
			(select i as packnumber, source_cards.id as cardid, name, rarity, CAST('f' as boolean) as foil, number
			from source_cards
			WHERE source_cards.saga = sga
			LIMIT 1 OFFSET (select floor(count(1) *  random()) AS randomized from (select 
			row_number() OVER (ORDER BY number ASC) as rnum
			from source_cards
			where rarity = 'COMMON'
			AND source_cards.saga = sga) AS T))
			UNION ALL
			(select i as packnumber, source_cards.id as cardid, name, rarity, CAST('f' as boolean) as foil, number
			from source_cards
			WHERE rarity = second_pack_card_rarity()
			AND source_cards.saga = sga
			LIMIT 1 OFFSET (select floor(count(1) *  random()) AS randomized from (select 
			row_number() OVER (ORDER BY number ASC) as rnum
			from source_cards
			where rarity = second_pack_card_rarity()
			AND source_cards.saga = sga) AS T))
			UNION ALL
			(select i as packnumber, source_cards.id as cardid, name, rarity, CAST('f' as boolean) as foil, number
			from source_cards
			WHERE rarity = third_pack_card_rarity()
			AND source_cards.saga = sga
			LIMIT 1 OFFSET (select floor(count(1) *  random()) AS randomized from (select 
			row_number() OVER (ORDER BY number ASC) as rnum
			from source_cards
			where rarity = third_pack_card_rarity()
			AND source_cards.saga = sga) AS T));

			IF random() < 0.15 THEN
				RETURN QUERY 
					(select i as packnumber, source_cards.id as cardid, name, rarity, true as foil, number
					from source_cards
					WHERE rarity <> 'FIXED'
					AND source_cards.saga = sga 
					LIMIT 1 OFFSET (select floor(count(1) *  random()) AS randomized from (select 
					row_number() OVER (ORDER BY number ASC) as rnum
					from source_cards
					WHERE rarity <> 'FIXED'
					AND source_cards.saga = sga) AS T));
			END IF;
			
		END LOOP;
	 END
$$ LANGUAGE plpgsql;

/*

// tests for generating packs

select * from generate_packs(1, 'CCG_SAIYAN') f(packnumber integer, cardid bigint, cardname text, rarity text, foil boolean, number text);

select * from source_cards where id = 154;

create table packsample as (
select * from generate_packs(1000, 'SAIYAN') f(packnumber integer, cardid bigint, cardname text, rarity text, foil boolean, number text)
);

select cardname, rarity, count(1) from packsample where foil is not null group by cardname, rarity order by rarity, count asc;

// tests for decks

select * from decks;

select * from source_cards where id = 131;

select * from personalities_source_cards where id_source_card = 131;

select * from instance_cards where id = 8;

select * from headshots_source_cards, instance_cards where instance_cards.id_source_card = headshots_source_cards.id_source_card
and instance_cards.id = 8;
*/

select * from players;

/* get active connections */
SELECT sum(numbackends) FROM pg_stat_database;

select * from instance_cards;

select * from personalities_power_stages;

select * from source_cards where name = 'Goku';

select * from decks;

select * from instance_cards;
select * from mainpersonalitycards_in_deck;
select * from cards_in_deck;
select * from proxy_cards;

select count(1) from cards_in_deck;

DELETE FROM instance_cards WHERE id in (SELECT * FROM proxy_cards) AND id 
in (SELECT id_card FROM cards_in_deck WHERE id_deck = 1);

delete from instance_cards;

select * from users;

select * from authorities;

update users set enable = 't';

select * from types_source_cards;
