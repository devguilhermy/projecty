const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('ok')
})

require('./app/controllers/')(app)
// app.use("/", require("./controllers/projectController"));
// app.use("/auth", require("./controllers/authController"));

app.listen(1234)
