alter table source_personalities
add column pur2 text;

update source_personalities 
set pur2 = cast(pur as text);

alter table source_personalities
drop column pur;

alter table source_personalities
rename column pur2 to pur;