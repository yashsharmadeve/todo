const express = require('express');
const cors = require('cors');
const TaskRoutes = require('./routes/task')
const app = express();

app.use(express.json());
app.use(cors());

// app.use('/api/tasks', leadsRoutes)
app.use('/api/tasks', TaskRoutes)

app.listen(9900, () => {
    console.log('backend is running');
})