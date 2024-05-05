# Elektronik news import to Strapi script

### 1. Import the .sql dump file to the mysql databse.

### 2. Set up the `.env` file

```env
HOST=localhost
PORT=3306
USER=root
PASSWORD=
DATABASE=zseis

API_TOKEN=<strapi_api_token>

INTERVAL=100 # interval indicates time between each put request. If too low strapi could block some requests. The default value is 100 if unset.
```

### 3. Run the script

```bash
bun index
```

or

```bash
bun .
```

### 4. And wait...

```bash
...
99% Done - 1514/1521
99% Done - 1515/1521
99% Done - 1516/1521
99% Done - 1517/1521
99% Done - 1518/1521
99% Done - 1519/1521
99% Done - 1520/1521
100% Done - 1521/1521
```
