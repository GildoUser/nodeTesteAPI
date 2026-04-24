const dotenv = require('dotenv');
//const app = require('./src/App');
const app =1;
function change(a){
    app = a;
}
change(2)
console.log(app)
dotenv.config();
//app.listen(process.env.PORT, ()=>{
  //  console.log('server iniciado | PORT: ', process.env.PORT)
//});