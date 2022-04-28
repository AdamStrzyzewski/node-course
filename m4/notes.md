URL - lokalizację i sposób dostania się do zasobu
<scheme>://[<login>[:<password>]@]<host>[:<port>]][/<path>][?<query>][#<fragment>]
https://google.com

scheme - protokół sieciowy
http - 
https - 

login - nieobowiązkowy
password - nieobowiązkowy

host -> ip (zamiana host mnemonika odbywa się przez serwer DNS)
port -> https 443 , http 80

path -> localhost:3000[/contact] -> contact
query wszystkie parametry po znaku ?, łączone ze sobą &
req.query

fragment # kotwicę/anchor

URI - identyfikator naszego zasobu (metafora książki po ISBN)


żądamy
GET
POST - wiele razy - utworzycie wiele zasobów // tworzymy usera
PUT - zastąpimy zasób, body które wysłaliśmy // aktualizujemy wszystkie dane danego usera
PATCH - modifikujemy zasób częściowo // tylko imię
DELETE - usuwania zasobu 

otrzymać odpowiedź
kody odpowiedzi http
5 grup - 
1xx - informacyjne
2xx - sukcesy
 200 - ok - GET
 201 - created - POST
 202 - accepted - POST
 204 - no content - DELETE
3xx - przekierowania
 301 - moved permanetly
 307 - temporary redirect
4xx - błędy klienta - błędy żądania
 400 - bad request
 422 - request is okay, but unprocessable
 403 - forbidden
 404 - not found
 418 - easter egg
5xx - błędy serwera
 500 - internal server error
 501 - not implemented
 502 - bad gateway
 503 - service unavaible 
 504 - gateway timeout


`/api/users/13/remove` - bad practice
`DELETE /api/users/13` - good practice

`/api/getusers` - bad practice
`GET api/users` - good practice

`/api/users?offset=0&limit=25` - chcemy 25 user-ów, pomijając po drodze 0 - chcemy pierwszych 25 userów

// sortowanie
`/api/users?sortBy=firstName&sortOrder=asc` 
`/api/users?sort=lastName|firstName|birthday`
{ sort: 'lastName|firstName|birthday' } // .split('|')
`/api/users?sort=lastName&sort=firstName&sort=birthday`
{ sort: ['lastName', 'firstName', 'birthday']}

// filtrowanie
`/api/users?filter="name::sam|city::denver"`
// split('|')
// split('::')
{
  ['name', 'sam'],
  ['city', 'denver']
}

`api/users?name=sam&city=denver`
{
    name: 'same',
    city: 'denver'
}

npx express-generator --view=ejs simple-express