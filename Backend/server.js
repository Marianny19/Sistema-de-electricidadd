import express from 'express';
import conexion from './database.js';

const app = express();
const port = 8081;
const router = express.Router();

app.use(express.json());
app.use(router);

router.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
