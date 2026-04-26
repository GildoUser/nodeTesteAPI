const dotenv = require('dotenv');
const app = require('./src/App');

dotenv.config();
app.listen(process.env.PORT, ()=>{
  console.log('server iniciado | PORT: ', process.env.PORT)
});