# ftn-verifier

How to test Chrome extension

1. Open Chromium -> Extensions -> Manage Extensions.
2. Toggle Developer mode (upper right corner.
3. Select "Load unpacked".
4. Open directory with assets build with make.
5. Select "Pack extension".
6. DO NOT expose private key (*.pem). E.g. do not commit.


# Store description

FTN Verifierin avulla pystyt helposti tarkistamaan sen, onko kyseessä aito luottamusverkostoon kuuluvan tunnistuspalvelun kirjautumissivu. FTN Verifier tarkistaa ohjelmallisesti, että hostname vastaa luottamusverkostoon kuuluvan tunnistuspalvelun hostnamea. Kyse on teknisestä ratkaisusta ohjeeseen, että sinua kehotetaan tarkistamaan verkkosivun osoitteen oikeellisuus.

Luottamusverkostosta Traficomin sivuilla:
https://www.kyberturvallisuuskeskus.fi/fi/toimintamme/saantely-ja-valvonta/sahkoinen-tunnistaminen

Suosittelemme ensisijaisesti käyttämään salasananhallintaohjelmaa. FTN Verifier saattaa kuitenkin olla monelle helpompi käyttää. Lisäksi pankkisi on saattanut estää salasananhallintaohjelman käytön.

* FTN Verifier ei suojaa manipulaatiolta. Jos hyökkääjä esimerkiksi huijaa sinut tekemään toimia oikeassa asiointipalvelussa, niin tunnistuspalvelu saattaa hyvinkin olla aito. *


FTN Verifierin lähdekoodi löytyy GitHubista: https://github.com/carecode/ftn-verifier

Pyrimme pitämään koodin lyhyenä ja ymmärrettävänä. Halutessasi voit varmistua FTN Verifierin aitoudesta buildaamalla sen itse ja diffaammalla assetteja Chrome Web Storesta löytyvään versioon. Pyydämme ilmoittamaan kehitysehdotukset ja bugit GitHubin kautta. Parasta on, jos teet suoraan PRn, mutta myös issuet ovat tervetulleita.


FTN Verifier on Carecode Oyn kehittämä ja ylläpitämä. Laajennus ei lähetä tietoja selaimen ulkopuolelle, emmekä siten käsittele henkilötietojasi. Carecode Oy ei ole vastuussa, jos FTN Verifier aiheuttaa välittömiä tai välillisiä vahinkoja tai menetyksiä käyttäjälle.
