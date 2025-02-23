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
    id serial,		
    name string,
    price float,
    gmp float,
    lot_price float,
    lot_size flat,
    suggestion string,
    review string,
    open_date datetime,
    close_date datetime,
    listing_date datetime,
    basis_of_allotment datetime,
    minimum_investment float,
    face_value float,
    total_share_offered float,
    offered_to_public float,
    sector string,
    sub_sector string,
    issue_type string,
    symbol string
)
```
- [ ] Set up the PostGres.
- [ ] Set up some ORM and migration script to store data to PostGres.
- [ ] Schedule job to fetch and store data in postgres.
- [ ] Backend to fetch stored data from database.
- [ ] Frontend to display data along with mark as favourite button.