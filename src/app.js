const express = require('express') 
const path = require('path') 

const app = express() 

const dir = path.join(__dirname, "../public") 
app.use(express.static(dir)) 

app.get('*', (req,res)=>{ 
    res.sendFile(path.join(__dirname, "../public/404.html")) 
}) 

const port = process.env.PORT || 3000 

app.listen(port, () => { 
    console.log('Server is up on port ' + port) 
})