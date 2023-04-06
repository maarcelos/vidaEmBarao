// imports
import express from 'express';
import helloRouter from './routes/hello.js';
import menuRouter from './routes/menu.js';
import https from 'https';
import fs from 'fs';
import cors from 'cors';




/*
<Stack.Navigator
screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}>
<Stack.Screen name="Carlo" component={Home} />
<Stack.Screen name="Roberto" component={Menu} />

</Stack.Navigator>
*/


// definitions
const app = express()
const port = 3000

app.use(cors())

// routes
app.use('/', helloRouter)
app.use('/menu', menuRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

https.createServer({
  cert: fs.readFileSync('./certificates/SSL/server.cert'),
  key: fs.readFileSync('./certificates/SSL/server.key')

}, app).listen(port+1, ()=>"Rodando https")