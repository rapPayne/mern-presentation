const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, "OK", {
    'Content-Type': 'text/html'
  });
  res.write("Got request");
  res.write("<table><tbody>");
  for (let prop in req) {
    try {
      res.write(`<tr><td style='border:1px solid black;padding:5px;'>${prop}</td><td>${res[prop]}</td></tr>`);
    }
    catch {
      console.error(`Problem printing prop ${prop}!`)
      res.write(`<tr><td>${prop}</td></tr>`);
    }
  }
  res.write("</tbody></table>");
  res.end();
})

server.on("information", info => {
  console.log("HTTP INFO request received:", info);
});

server.on("request", (req, res) => {
  if (req.url === "/shutdown")
    server.close(err => {
      err && console.error("Error seen:", err);
      console.log("Shutting down cleanly");
    });
});

server.listen(3002);