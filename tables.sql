CREATE TABLE orders
(
    id serial NOT NULL,
    "clientId" integer NOT NULL,
    "cakeId" integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL,
    "totalPrice" numeric NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (id)
);


    CREATE TABLE cakes
(
    id serial NOT NULL,
    name varchar(255) NOT NULL,
    price numeric NOT NULL,
    image varchar(255) NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (id)
);

    CREATE TABLE clients
(
    id serial NOT NULL,
    name varchar(255) NOT NULL,
    image varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

