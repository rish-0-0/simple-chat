const app = require('express')();
const port = 4203;
const server = app.listen(port, () => {
    console.log(`Waiting for connections on ::${port}`);
});