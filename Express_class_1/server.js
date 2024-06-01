
const express=require('express');

const cors=require('cors');
const PORT=config.appPort;
const app=express();


app.use(cors(corsConfig));

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.listen(PORT,()=>{
    console.log(`PORT${PORT}`);
});