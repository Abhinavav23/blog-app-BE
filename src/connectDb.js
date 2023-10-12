const {connect} = require('mongoose');

connect(process.env.DB_Connection_URL)
.then(() => {
    console.log('connected to DB successfully');
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
})