TODO:
1. Fetch values in background and save them in storage for later retrieval.

Featured Planned:
1. Tech News
2. Market News
3. Sector wise companies table with their price.

---

Running Backend Server:

```
cd backend
npm start
```

Running Frontend:

```
cd frontend
npm start
```

Backend will be auto deployed when push to main branch
Frontend deployment:

1. Checkout to `gh-pages` branch.
2. Pull from `main` branch.
3. `npm run build-ghp`
4. Commit and Push to `gh-pages` branch.


Frontend URL: https://shivamarora1.github.io/stocdash/<br>
Backend URL : https://stocdash-production.up.railway.app/


------
Running Postgres Locally
```
docker run --name stocdash-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

Username: postgres
Password: password
```

Run migration
```
npm run typeorm
```

Create new migration
```
npx typeorm migration:create ./migrations/CreateIpoSchema
```

-----
UI responsiveness tested in these Devices:
```
iPhone 14 Pro Max = 360-480px width
iPad Air = 768-992px width
MacBook Pro 14 = 992-1200px width	
Full HD Monitor = 1200-1400px+ width
```