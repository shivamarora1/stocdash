const { JSDOM } = require('jsdom');

async function getMainlineIpos(sme) {
  let url = 'https://www.chittorgarh.com/ipo/ipo_dashboard.asp';
  if (sme) {
    url = 'https://www.chittorgarh.com/ipo/ipo_dashboard.asp?a=sme';
  }

  const bodyStr = await fetch(url);
  const responseStr = await bodyStr.text();
  const dom = new JSDOM(responseStr);
  const document = dom.window.document;
  const mainLineIpoTable = document.querySelectorAll(
    '#mainlineIpoTable table tbody tr',
  );

  let mainlineIposObj = Array.from(mainLineIpoTable).map((ipo) => {
    const tdS = ipo.querySelectorAll('td');
    return {
      name: tdS[0].textContent,
      url: tdS[0].querySelector('div a').href,
      status: tdS[3].textContent,
    };
  });
  return mainlineIposObj;
}

async function getIpoDetail(url) {
  const response = await fetch(`https://www.chittorgarh.com${url}`);

  const bodyStr = await response.text();
  const dom = new JSDOM(bodyStr);
  const document = dom.window.document;
  const detailTable = document.querySelector(
    '#main > .row:nth-child(6) > div:nth-child(2) > div > table > tbody',
  );
  const rows = detailTable.querySelectorAll('tr');
  return {
    open_date: rows[0].querySelector('td:nth-child(2)').textContent,
    close_date: rows[1].querySelector('td:nth-child(2)').textContent,
    tentative_allotment: rows[2].querySelector('td:nth-child(2)').textContent,
    initiation_of_refunds: rows[3].querySelector('td:nth-child(2)').textContent,
    credit_of_shares_to_demat: rows[4].querySelector('td:nth-child(2)').textContent,
    tentative_listing_date: rows[5].querySelector('td:nth-child(2)').textContent,
  };
}
(async () => {
  const mainstreamIpos = await getMainlineIpos();
  const smeIpos = await getMainlineIpos(true);
  const ipos = mainstreamIpos
    .concat(smeIpos)
    .filter((e) => e.status === 'Current');

  for (ip of ipos) {
    const res = await getIpoDetail(ip.url);
    console.log(res);
  }
})();
