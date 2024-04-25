const express = require('express')
//FMW code
const { log } = require("console");
const fs = require("fs");
const axios = require('axios');
const onFonMobileSAAPI = "http://10.102.217.183:8001/services/OnFonMobileSA/v1";
const bodyParser = require('body-parser');

const users = require("./MOCK_DATA.json")

const onFONMobileSAController = require("./src/controller/onFONMobileSAController");

const app = express();

const port = 1000;

//Middleware - plugging
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());



//-----Routes ---------
//1. Get the all users details
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// Get the particular user based on id
// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id == id);
//     return res.json(user);
// });

//---Use router to capture all API operation.
app
    .route("/api/users/:id").get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id == id);
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit the use based on the id
        return res.json({ status: "Pending" })
    })
    .delete((req, res) => {
        // Delete the user based on id
        return res.json({ status: "Pending" })
    })


// -------------First way call FMW API to get the details---------------

// app.get("/api/onFonMobileSA", (req, res) => {
//     //const details = req.body;
//     const jsonData = {
//         details: req.body
//     };
//     // Set up the configuration object for the POST request
//     const config = {
//         headers: {
//             'Content-Type': 'application/json' // Specify JSON content type
//         }
//     };

//     axios.post(onFonMobileSAAPI, jsonData, config)
//         .then(response => {
//             // Handle success
//             console.log('Response:', response.data);
//         })
//         .catch(error => {
//             // Handle error
//             console.error('Error:', error);
//         });
// });

// -------------Second way call FMW API to get the details---------------

app.post("/api/onFonMobileSA", async (req, res) => {
    try {

        const jsonData = req.body;
        console.log("Request data::", jsonData);
        console.log("FMW API:::", onFonMobileSAAPI);
        const response = await axios.post(onFonMobileSAAPI, jsonData);

        const responseData = response.data;
        res.json(responseData);
    } catch (error) {
        // Handle errors
        console.error('Error while calling the FMW API:::', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// -------------Third way call FMW API to get the details---------------

app.post("/api/onFonMobileSA", async (req, res) => {
    try {

        const jsonData = req.body;
        console.log("Request data::", jsonData);
        console.log("FMW API:::", onFonMobileSAAPI);

        const response =onFONMobileSAController.onFONMobileSADetialsController(req, res);
        //const response = await axios.post(onFonMobileSAAPI, jsonData);

        const responseData = response.data;
        res.json(responseData);
    } catch (error) {
        // Handle errors
        console.error('Error while calling the FMW API:::', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post API
app.post("/api/users", (req, res) => {
    // TODO create the new user

    const Body = req.body;
    users.push({ ...Body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Sucess", id: users.length + 1 });
    });

});

// Patch API
app.patch("/api/users/:id", (req, res) => {
    //TODO Edit the user based on id

    return res.json({ status: "Pending" });
});

// Delete API
app.delete("/api/users/:id", (req, res) => {
    return res.json({ status: "Pending" })
})

// End of FMW code

app.get('/', (req, res) => {
    res.json({
        "hey":"new microservice"
    })
})

app.listen(port, () => {
    log('Example app listening on port ${port}')
})
