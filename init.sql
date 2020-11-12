create extension if not exists "uuid-ossp";

create table users (
  id             serial primary key,
  name           varchar(30) not null unique,
  password       text not null,
  last_login_at  timestamp
);

create table items (
  id          uuid not null primary key default uuid_generate_v4(),
  user_id     integer not null references users(id) on delete cascade,
  name        varchar(100) not null unique,
  description varchar(150),
  content     text not null
);
