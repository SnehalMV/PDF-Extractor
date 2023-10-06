import mongoose from "mongoose"

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true} )
  .then(result => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))
}

export default dbConnection 