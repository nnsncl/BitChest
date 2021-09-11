## Bit**Chest**

BitCest is a Cryptocurrency market simulator built with Laravel and React, using CoinGecko API to fetch market and cryptocurrencies status.

**Project requirements:**

- MAMP/XAMP/LAMP
- Node
- NPM
- Composer
- PHP 7.4.12+





## Run the project locally

First, your will need to lauch Apache with **MAMP, XAMP, or LAMP depending on your OS**.

Then, go into the `server`directory and copy the .env.example in the `server`directory by running the following command:

```bash
cd server && cp .env.example .env
```

Then, in the `.env` file created in the `server` directory, update the following values :

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

**After updating the .env file, you'll need to create a local database, in our case, using mySQL, you'll need to go to phpMyAdmin to create your local database**.

then in your terminal, run`cd server`  , then paste the following commands:

```shell
composer install
php artisan migrate --seed
php artisan serve
php artisan key:generate
```

It will install dependencies, create the migrations and lauch the server.

## 

**frontend:** to access the frontend part, first, run`cd app`  , then paste the following commands:

```shell
npm install && npm start
```





## Login to BitChest

Your can access the application with one of the following users:

**User**

```markdown
email: user@user.com
password: user
```

**Admin**

```markdown
email: admin@admin.com
password: admin
```