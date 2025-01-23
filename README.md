TODO:

1. Responsive Design.
2. Use same DTO interface for backend and frontend. Using some sort of common modules.
3. Use prebuild theme for angular frontend.
4. Fetch values in background and save them in storage for later retrieval.

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
