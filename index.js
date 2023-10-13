const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(express.json())

const cars = [
    { id: 1, name: "BMW", since: 1916 },
    { id: 2, name: "Mercedes-Benz", since: 1926 },
    { id: 3, name: "Audi", since: 1909 },
    { id: 4, name: "Volkswagen", since: 1937 },
    { id: 5, name: "Toyota", since: 1937 },
    { id: 6, name: "Honda", since: 1946 },
    { id: 7, name: "Dodge", since: 1900 },
    { id: 8, name: "Ford", since: 1903 },
    { id: 9, name: "Mazda", since: 1920 },
    { id: 10, name: "Koenigsegg", since: 1994 },
    { id: 11, name: "Bugatti", since: 1909 },
    { id: 12, name: "Daewoo", since: 1967 },
    { id: 13, name: "Citroen", since: 1919 },
    { id: 14, name: "Volvo", since: 1927 },
    { id: 15, name: "Seat", since: 1950 },
    { id: 16, name: "Suzuki", since: 1909 },
    { id: 17, name: "Mitsubishi", since: 1870 },
    { id: 18, name: "Opel", since: 1862 },
    { id: 19, name: "Renault", since: 1899 },
    { id: 20, name: "Porsche", since: 1931 },
    { id: 21, name: "Lexus", since: 1989 },
    { id: 22, name: "Bentley", since: 1919 },
    { id: 23, name: "Rolls-Royce", since: 1904 },
    { id: 24, name: "Cadillac", since: 1902 },
    { id: 25, name: "Chevrolet", since: 1911 },
    { id: 26, name: "GMC", since: 1912 },
    { id: 27, name: "Fiat", since: 1899 },
    { id: 28, name: "Buick", since: 1903 },
    { id: 29, name: "Subaru", since: 1954 },
    { id: 30, name: "Ferrari", since: 1939 },
    { id: 31, name: "Maserati", since: 1914 },
    { id: 32, name: "Jaguar", since: 1922 },
    { id: 33, name: "Mini-Cooper", since: 1961 },
    { id: 34, name: "Range Rover", since: 1970 },
    { id: 35, name: "Land Rover", since: 1948 },
    { id: 36, name: "Vauxhall", since: 1857 },
    { id: 37, name: "Acura", since: 1986 },
    { id: 38, name: "Hummer", since: 1992 },
    { id: 39, name: "Karma", since: 2008 },
    { id: 40, name: "Peugeot", since: 1810 },
    { id: 41, name: "Fiat", since: 1899 },
    { id: 42, name: "Hyundai", since: 1967 },
    { id: 43, name: "Lamborghini", since: 1963 },
    { id: 44, name: "Alfa Romeo", since: 1910 },
    { id: 45, name: "Kia", since: 1944 },
    { id: 46, name: "Aston Martin", since: 1913 },
    { id: 47, name: "McLaren", since: 1985 },
    { id: 48, name: "Saab", since: 1945 },
    { id: 49, name: "Pontiac", since: 1926 },
    { id: 50, name: "Lotus", since: 1952 },
    { id: 51, name: "Fiat", since: 1899 },
    { id: 52, name: "Maybach", since: 1909 },
    { id: 53, name: "Skoda", since: 1895 },
    { id: 54, name: "Pagani", since: 1992 },
    { id: 55, name: "Abarth", since: 1949 },
    { id: 56, name: "Dacia", since: 1966 },
    { id: 57, name: "Alpina", since: 1965 },
    { id: 58, name: "MAN", since: 1758 },
    { id: 59, name: "Mansory", since: 1989 },
    { id: 60, name: "GAZ", since: 1932 },
    { id: 61, name: "VAZ", since: 1966 },
    { id: 62, name: "UAZ", since: 1941 },
    { id: 63, name: "Pininfarina", since: 1930 },
    { id: 64, name: "HiPhi", since: 2019 },
    { id: 65, name: "Zeekr", since: 2021 },
    { id: 66, name: "Tesla", since: 2003 }
];


app.get('/cars', (req, res)=>{
    res.send(cars)
})

app.get('/cars/:id', (req, res)=>{
    if (typeof cars[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Car not found"})
    }

    res.send(cars[req.params.id - 1])
})

app.post('/cars', (req, res) => {
    if(!req.body.name || !req.body.since){
        return res.status(400).send({error: 'One or all params are missing'})
    }
    let car = {
        id: cars.length + 1,
        since: req.body.since,
        name: req.body.name
    }

    cars.push(car)

    res.status(201)
        .location(`${getBaseUrl(req)}/cars/${cats.length}`)
        .send(car)
})

app.delete('/cars/:id', (req, res) => {
    if (typeof cars[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Car not found" });
    }
    games.splice(req.params.id - 1, 1);
    res.status(204).send({ error: "No content" });
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`Api up at: http://localhost:${port}`)
})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.header.host}`
}