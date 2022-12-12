create schema sales;

create table sales.user(
    id_user serial4 not null primary key,
    username text not null,
    password text not null,
    email text null
);
ALTER TABLE sales.sales ALTER COLUMN nu_value TYPE numeric USING nu_value::numeric;

create table sales.sales(
    id_sales serial4 not null primary key,
    nu_value numeric NOT null default 0.00,
    dt_sale timestamp default now(),
    nu_portion integer null,
    id_user integer not null,
    bo_paid boolean default false,
    constraint fk_salest_user FOREIGN KEY (id_user) references sales.user(id_user)
);

create table sales.installment(
    id_installment serial4 not null primary key,
    nu_value NUMBER(6, 4) NOT null default 0.00,
    dt_due_date date not null,
    id_sales integer not null,
    bo_paid boolean default false,
    constraint fk_installment_sales FOREIGN KEY (id_sales) references sales.sales(id_sales)
);

create schema client;

create table client.client(
    id_client serial not null primary key,
    no_client text not null,
    dt_birth date null,
    tp_sex bpchar(1) not null,
    nu_document text null,
    nu_contact text null,
    id_schooling integer null,
    email text null,
    id_marital_status integer null,
    address text not null
);

create table client.reference_client(
    id_reference_client serial not null primary key,
    no_reference text not null,
    nu_document text not null,
    nu_contact text null,
    id_client integer not null,
    constraint fk_reference_client FOREIGN KEY (id_client) references client.client(id_client)
);

create table client.client_sales(
    id_client_sales serial not null primary key,
    id_sales integer not null,
    id_client integer not null,
    constraint fk_client_sales_client FOREIGN KEY (id_client) references client.client(id_client),
    constraint fk_client_sales_sales FOREIGN KEY (id_sales) references sales.sales(id_sales)
)