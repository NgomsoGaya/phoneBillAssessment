CREATE TABLE plans (
    id serial not null primary key,
    plan_name text not null,
    sms_price VARCHAR(5),
    call_price VARCHAR(5)
);

CREATE TABLE usersWithPlan (
    id serial not null primary key,
    username VARCHAR(50),
    pricePlanKey serial not null,
    foreign key (pricePlanKey) references plans(id)
);