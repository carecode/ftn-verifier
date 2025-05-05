// Copyright © Carecode Oy. All rights reserved.

const hostOrg: { [host: string]: { name: string; type: string } } = {
  "auth-prod.megical.com": { name: "hightrust.id", type: "ftn" },
  "identify.nordea.com": { name: "Nordea", type: "ftn" },
  "kirjaudu.aktia.fi": { name: "Aktia", type: "ftn" },
  "online.alandsbanken.fi": { name: "\u00C5landsbanken", type: "ftn" },
  "online.s-pankki.fi": { name: "S-Pankki", type: "ftn" },
  "saml-idp.op.fi": { name: "OP", type: "ftn" },
  "www.op.fi": { name: "OP", type: "bank" },
  "shared-logon.danskebank.com": { name: "Danske Bank", type: "ftn" },
  "tunnistautuminen.suomi.fi": { name: "Suomi.fi", type: "ftn" }, // portal
  "kortti.tunnistautuminen.suomi.fi": { name: "Suomi.fi", type: "ftn" }, // card
  "tunnistus.omasp.fi": { name: "omaSP", type: "ftn" },
  "verkkopankki.omasp.fi": { name: "omaSP", type: "bank" },
  "tunnistus.poppankki.fi": { name: "POP Pankki", type: "ftn" },
  "www4.poppankki.fi": { name: "POP Pankki", type: "bank" },
  "tunnistus.saastopankki.fi": {
    name: "S\u00E4\u00E4st\u00F6pankki - Sparbanken",
    type: "ftn",
  },
  "verkkopankki.saastopankki.fi": {
    name: "S\u00E4\u00E4st\u00F6pankki - Sparbanken",
    type: "bank",
  },
  "tunnistus.telia.fi": { name: "Mobiilivarmenne", type: "ftn" },
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
      report.innerText = `Aito ${sp.type === "ftn" ? "tunnistuspalvelu" : "pankki"}: ${sp.name}`;
      report.style.color = "green";
      return;
    }
    report.innerText = `Sivusto ei ole luottamusverkoston tunnistuspalvelu\nhostname: ${h}`;
  }
});
