const express = require('express'); 
const http = require('http'); 
const moment = require('moment-timezone'); 

const app = express(); 
const port = process.env.PORT || 8000; // Określanie numeru portu
const author = 'Vladyslav Zaporozhskyi'; // Zdefiniowanie autora serwera

app.use(express.static('public')); 

app.get('/', function(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Pobranie adresu IP 
  const currentTime = moment().tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss'); // Pobranie bieżącego czasu 

  res.send(`
    <div>
      <p>Adres IP klienta: ${clientIp}</p>
      <p>Bieżący czas w strefie czasowej klienta: ${currentTime}</p>
    </div>
  `); // Wysłanie odpowiedzi zawierającej informacje o adresie IP i bieżącym czasie
});

const server = http.createServer(app); // Utworzenie serwera HTTP na podstawie aplikacji Express

server.listen(port, () => {
  const currentDate = new Date().toLocaleString(); // Pobranie bieżącej daty i czasu
  console.log(`Serwer został uruchomiony ${currentDate} przez ${author}. Nasłuchuje na porcie ${port}`); // Wyświetlenie informacji o uruchomieniu serwera w konsoli
});
