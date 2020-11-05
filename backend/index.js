const express = require ('express');
const app = express();

app.use(express.json());

const parque = require ('./src/routes/parque.js');
const perfil = require ('./src/routes/perfil.js');
const tipo_usuario = require ('./src/routes/tipo_usuario.js');
const visita = require ('./src/routes/visita.js');
const usuario = require ('./src/routes/usuario.js');

app.use('/api',parque);
app.use('/api',perfil);
app.use('/api',tipo_usuario);
app.use('/api',visita);
app.use('/api',usuario);
app.use(express.urlencoded({extended: false}));

app.listen(3000,()=>{
  console.log('server started')
});