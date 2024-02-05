// app.js
import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./routes.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
