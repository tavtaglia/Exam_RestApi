const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors

const app = express() //implementasi express

// implementasi body-parser
// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())


// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))


// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

app.get("/jkw/:kecepatan/:jarak/:waktu", (req, res) => {
    const kecepatan = Number(req.params.kecepatan);
    const jarak = Number(req.params.jarak);
    const waktu = Number(req.params.waktu);
    const dicari = req.query.dicari; 

    let hasil1 = 0;
    let hasil2 = 0;
    let hasil3 = 0;

    if (dicari === "kecepatan") {
        hasil1 = jarak / waktu;
    } else if (dicari === "jarak") {
        hasil2 = kecepatan * waktu;
    } else if (dicari === "waktu") {
        hasil3 = jarak / kecepatan;
    }

    let response = {
        kecepatan: kecepatan,
        jarak: jarak,
        waktu: waktu,
        hasil_kecepatan: hasil1,
        hasil_jarak: hasil2,
        hasil_waktu: hasil3,
    };

    res.json(response);
});


app.post("/hitung/:satuan/:data", (req, res) => {
    const satuan = req.params.satuan;
    const data = Number(req.body.data); 

    let result;
    const results = {};
    const berat = {
        kg: 1,
        hg: 10,
        dag: 100,
        g: 1000,
        dg: 1000,
        cg: 10000,
        mg: 100000
    };

    if (satuan == "kg") {
        result = data / 1000000;
    } else if (satuan == "hg") {
        result = data / 100000;
    } else if (satuan == "dag") {
        result = data / 10000;
    } else if (satuan == "g") {
        result = data / 1000;
    } else if (satuan == "dg") {
        result = data / 100;
    } else if (satuan == "cg") {
        result = data / 10;
    } else {
        result = data;
    }

    for (const p in berat) {
        results[p] = result * berat[p];
    }

    let response = {
        status: res.statusCode,
        hasil: results
    };

    res.json(response);
});


app.get("/konversipanjang/:satuan/:angka", (req, res) => {
    let satuan = req.params.satuan;
    let angka = Number(req.params.angka);

    let km, hm, dam, m, dm, cm, mm;

    if (satuan === "km") {km = angka * 1;}
    else if (satuan === "hm") {hm = angka * 10;}
    else if (satuan === "dam") {dam = angka * 100;}
    else if (satuan === "m") {m = angka * 1000;}
    else if (satuan === "dm") {dm = angka * 10000;}
    else if (satuan === "cm") {cm = angka * 100000;}
    else if (satuan === "mm") {mm = angka * 1000000;}

    res.json({
        km: km,
        hm: hm,
        dam: dam,
        m: m,
        dm: dm,
        cm: cm,
        mm: mm
    });
});

app.post("/gaya", (req, res) => {
    let gaya = Number(req.body.gaya);
    let massa = Number(req.body.massa);
    let percepatan = Number(req.body.percepatan);
    let dicari = req.body.dicari; 
    let hasil1 = 0;
    let hasil2 = 0;
    let hasil3 = 0;

    if (dicari === "gaya") {hasil1 = massa * percepatan;} 
    else if (dicari === "massa") {hasil2 = gaya / percepatan;} 
    else if (dicari === "percepatan") {hasil3 = gaya / massa;}

    let response = {
        dicari: dicari,
        gaya: hasil1 || gaya,
        massa: hasil2 || massa,
        percepatan: hasil3 || percepatan
    };

    res.json(response);
});

   

app.listen(8080, () => {
    console.log("Server run on port 8080");
})
