# API Dokumentation

## Endpoints

### **GET /getUser/:username**
Henter brugeroplysninger baseret p� brugernavn.

- **URL Params:** `:username` (brugernavn)
- **Response:**
  - **200 OK:** Returnerer brugeroplysninger (JSON).
  - **404 Not Found:** Bruger ikke fundet.
  - **500 Server Error:** Problemer med at l�se brugerdata.

---

### **POST /signup**
Registrerer en ny bruger og opretter tilh�rende statistikker.

- **Request Body:**
  - `newUser` (brugerdata)
  - `newMapStats` (kort-statistikker)
  - `newUserStats` (brugerstatistikker)
- **Response:**
  - **200 OK:** Succesfuld tilmelding.
  - **500 Server Error:** Problemer med at gemme brugerdata.

---

### **POST /updateProfile**
Opdaterer en brugers profiloplysninger.

- **Request Body:** Opdateret brugerdata (JSON).
- **Response:**
  - **200 OK:** Profil opdateret succesfuldt.
  - **404 Not Found:** Bruger ikke fundet.
  - **500 Server Error:** Problemer med at gemme brugerdata.

---

### **POST /createTeam**
Opretter et nyt hold og opdaterer brugerens nuv�rende hold.

- **Request Body:** Nyt hold data (JSON).
- **Response:**
  - **200 OK:** Hold oprettet succesfuldt.
  - **400 Bad Request:** Holdnavn findes allerede.
  - **500 Server Error:** Problemer med at gemme holddata.

---

### **POST /joinTeam**
Tilf�jer en bruger til et hold baseret p� holdkode.

- **Request Body:**
  - `teamCode` (kode til hold)
  - `user` (brugerdata)
- **Response:**
  - **200 OK:** Bruger er tilf�jet til holdet.
  - **400 Bad Request:** Bruger er allerede medlem.
  - **404 Not Found:** Hold ikke fundet.
  - **500 Server Error:** Problemer med at gemme data.

---

### **POST /leaveTeam**
Brugeren forlader det nuv�rende hold.

- **Request Body:** `username` (brugernavn)
- **Response:**
  - **200 OK:** Bruger har forladt holdet.
  - **400 Bad Request:** Bruger er ikke p� noget hold.
  - **404 Not Found:** Hold eller bruger ikke fundet.
  - **500 Server Error:** Problemer med at opdatere data.

---

### **GET /getTeamInfo**
Henter oplysninger om et specifikt hold.

- **Query Params:** `team` (holdnavn)
- **Response:**
  - **200 OK:** Returnerer holdoplysninger (JSON).
  - **404 Not Found:** Hold ikke fundet.
  - **500 Server Error:** Problemer med at l�se holddata.

---

### **POST /updateFirstLogin**
Opdaterer en brugers "firstLogin" status.

- **Request Body:** `username` (brugernavn)
- **Response:**
  - **200 OK:** Status opdateret succesfuldt.
  - **404 Not Found:** Bruger ikke fundet.
  - **500 Server Error:** Problemer med at opdatere data.

---

### **GET /playerStats/:username**
Henter en spillers statistik baseret p� brugernavn.

- **URL Params:** `:username` (brugernavn)
- **Response:**
  - **200 OK:** Returnerer spillerstatistik (JSON).
  - **404 Not Found:** Spiller ikke fundet.
  - **500 Server Error:** Problemer med at l�se data.

---

### **GET /playerMapStats/:username**
Henter en spillers kortstatistik baseret p� brugernavn.

- **URL Params:** `:username` (brugernavn)
- **Response:**
  - **200 OK:** Returnerer kortstatistik (JSON).
  - **404 Not Found:** Spiller ikke fundet.
  - **500 Server Error:** Problemer med at l�se data.
