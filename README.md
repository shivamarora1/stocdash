TODO:

1. Responsive Design.
2. Use same DTO interface for backend and frontend. Using some sort of common modules.
3. Use prebuild theme for angular frontend.
4. Fetch values in background and save them in storage for later retrieval.
Featured Planned:
1. IPO List<br>
&nbsp;    1.1. Columns to show in IPO List:

| IPO | Price    | Lot Price    | Suggestion | Review    | GMP    | % Subscribed    | Opening On | Closing On |
| :-----: | :---: | :---: | :-----: | :---: | :---: | :---: | :---: | :---: |

- Only show current opened IPO and not listed IPO.
- Mark the IPO as favourite/ unfavourite , So that you can track status of IPO.

2. Tech News
3. Market News
4. Sector wise companies table with their price.

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
3. Commit and Push to `gh-pages` branch.

Frontend URL: https://shivamarora1.github.io/stocdash/<br>
Backend URL : https://stocdash-production.up.railway.app/


------
Running Postgres Locally
```
docker run --name some-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

Username: postgres
Password: password
```