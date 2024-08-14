# React + Vite
Denne skabelon giver en grundlæggende opsætning for at komme i gang med React og Vite, inklusiv Hot Module Replacement (HMR) og nogle grundlæggende ESLint-regler.

## Tilgængelige Plugins
Der er to officielle plugins til React:

@vitejs/plugin-react: Bruger Babel til Fast Refresh.
@vitejs/plugin-react-swc: Bruger SWC til Fast Refresh.


## Kom i gang
*****Forudsætninger*****
Node.js: Først skal du installere Node.js fra nodejs.org. Når installationen er færdig, skal du genstarte din IDE.

*****Opsætning af Projektet*****
Installer Afhængigheder: Kør følgende kommando for at installere de nødvendige afhængigheder: npm install

Start Udviklingsserveren: For at starte udviklingsserveren og se dit projekt lokalt, skal du køre: npm run dev
Dette vil starte Vite-serveren, og du kan se dit projekt på http://localhost:5173 (eller en anden port, hvis angivet).

## Server-Side Opsætning
*****Forudsætninger*****
Hvis du vil bruge en server-side funktion, som f.eks. en tilmeldingsside, skal du gøre følgende: npm install express body-parser cors samt npm install axios


Naviger til Server-mappen via terminal: cd src "også" cd server

Start Serveren: node server.js
Serveren kører nu.

Bemærk: Sørg for, at både klientapplikationen og serveren kører samtidig, så alt fungerer korrekt.

## Bidrag
Hvis du støder på problemer eller har forslag til forbedringer, er du velkommen til at åbne en issue eller sende en pull request.

## Licens
Dette projekt er licenseret under MIT License. Se LICENSE filen for detaljer.
