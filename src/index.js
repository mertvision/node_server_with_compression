/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Modules (Libs)
const express = require("express");
const compression = require("compression");

// Server PORT variable declaration and value assigment
const PORT = 8080;

// Server variable declaration and value assigment
const server = express();

// Server middleware
server.use(compression({
    level: 6, // Level of compression algorithm
    threshold: 100*1000, // compression application threshold (kb)
    // Filter function
    filter: (req,res) => { 
        if(req.headers['x-no-compression']){
            return false
        }
        return compression.filter(req,res)
    },
}));

// Server route declaration
server.get('/', async (req, res)=> {
    const response = "Compression Algorithm";
    res.end(response.repeat(100000));
});

// Server initialization function
const init = async () => {
    try{
        server.listen(PORT, ()=> {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    };
};

// Invoke init() function to run server
init();
