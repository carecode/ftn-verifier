// Copyright © Carecode Oy. All rights reserved.

const hostOrg: { [host: string]: string } = {
  "auth-prod.megical.com": "hightrust.id",
  "identify.nordea.com": "Nordea",
  "kirjaudu.aktia.fi": "Aktia",
  "online.alandsbanken.fi": "\u00C5landsbanken",
  "online.s-pankki.fi": "S-Pankki",
  "saml-idp.op.fi": "OP", // ftn
  "www.op.fi": "OP", // bank
  "shared-logon.danskebank.com": "Danske Bank",
  "tunnistautuminen.suomi.fi": "Suomi.fi", // portal
  "kortti.tunnistautuminen.suomi.fi": "Suomi.fi", // card
  "tunnistus.omasp.fi": "omaSP", // ftn
  "verkkopankki.omasp.fi": "omaSP", // bank
  "tunnistus.poppankki.fi": "POP Pankki", // ftn
  "www4.poppankki.fi": "POP Pankki", // bank
  "tunnistus.saastopankki.fi": "S\u00E4\u00E4st\u00F6pankki - Sparbanken", // ftn
  "verkkopankki.saastopankki.fi": "S\u00E4\u00E4st\u00F6pankki - Sparbanken", // bank
  "tunnistus.telia.fi": "Mobiilivarmenne",
};

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  if (tabs[0] === undefined) {
    return;
  }
  const url = tabs[0].url as string;
  const h = new URL(url).hostname;

  let intervalID: number;
  function close() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      if (tabs[0] === undefined) {
        return;
      }
      const url2 = tabs[0].url;
      if (url !== url2) {
        window.close();
        clearInterval(intervalID);
      }
    });
  }
  intervalID = setInterval(close, 1000);

  const sp = hostOrg[h];
  const report = document.getElementById("report");

  if (report !== undefined && report !== null) {
    if (sp !== undefined) {
      report.innerText = `Aito: ${sp}`;
      report.style.color = "green";
      return;
    }
    report.innerText = `Aitouden tarkastus ep\u00E4onnistui\nhostname: ${h}`;
  }
});
