import app from './app.js';
import 'dotenv/config'; 

app.listen(process.env.PORT_APP, () => {
  console.log(`Servidor rodando na porta 
              http://${process.env.URL_APP}:${process.env.PORT_APP}`);
});
