- Only show current opened IPO and not listed IPO.
- Mark the IPO as favourite/ unfavourite , So that you can track status of IPO.
<hr>

 #### Columns to show in IPO List:

| IPO | Price    | Lot Price    | Suggestion | Review    | GMP    | % Subscribed    | Opening On | Closing On |
| :-----: | :---: | :---: | :-----: | :---: | :---: | :---: | :---: | :---: |

Refer diagram for more info.

Tasks:

- [ ] Scrape the data from the web site, scrape all required params.
```
CREATE TABLE ipo(
    name varchar,
    symbol varchar PRIMARY KEY,
    price float,
    lot_Size float,
    open_Date timestamp,
    close_Date timestamp,
    lot_Price float,
    minimum_Investment float,
    face_Value float,    
    gmp float,
    suggestion varchar,
    review varchar,
    listing_Date timestamp,
    basis_Of_Allotment timestamp
)
```
- [X] Set up the PostGres.
- [X] Set up some ORM and migration script to store data to PostGres.
- [X] Schedule job to fetch and store data in postgres.
- [X] Backend to fetch stored data from database.
- [ ] Fetch GMP, Suggestion, Review and save it to database.
- [ ] Frontend to display data along with mark as favorite button.



----
#### Work done:
- Added Cron to fetch information about active ipos and save them in database.
- Cron will run in every 12 hours.
- Cron will upsert the current ipos information.