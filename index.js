const express = require("express");
const nunjucks = require('nunjucks');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/", async function (req, res) {
    res.status(200).render("formulario.html");
});

app.post("/turnos", async function (req, res) {
    //Tiene que hacer la VTV?
    const anio = parseInt(req.body.year);
    const esteAnio = new Date().getFullYear();

    const km = parseInt(req.body.km);

    const tienequehacerlaVTV = (anio <= (esteAnio - 3)) || (km > 60000);
    
    //dice el ultimo numero asi que por las dudas extraigo solo nuemros de la patente.__dirname
    const numerosPatante = req.body.patente.split("").filter(x=> !isNaN(x)).map(x=> parseInt(x));
    console.log(numerosPatante)

    let mesRevision = "";
    const ultimoNumero = numerosPatante[numerosPatante.length - 1]
    switch(ultimoNumero){
        case 0: mesRevision = getNombreMES(10); break;
        case 1: mesRevision = getNombreMES(11); break;
        default: mesRevision = getNombreMES(ultimoNumero); break;
    }

    console.log(ultimoNumero)
    console.log(mesRevision)
    
    res.status(200).render("turnos.html", { VTV: tienequehacerlaVTV, mesRevision: mesRevision});
});


function getNombreMES(mes){

    switch (mes) {
        case 1: return "Enero";
        case 2: return "Febrero";
        case 3: return "Marzo";
        case 4: return "Abril";
        case 5: return "Mayo";
        case 6: return "Junio";
        case 7: return "Julio";
        case 8: return "Agosto";
        case 9: return "Septiembre";
        case 10: return "Octubre";
        case 11: return "Noviembre";
        case 12: return "Diciembre";
    }
}


app.listen(8080);