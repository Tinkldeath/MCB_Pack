const app = require('./app');
const port = 4000;

app.listen(port,() => {
    console.log(`Server works on port ${port}`);
});