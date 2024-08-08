const mongoose = require('mongoose')

const conn = {
    isConnectd: false
  }
  //const DATABASE_SECRET_MVP = process.env.DATABASE_SECRET_MVP
  const DATABASE_SECRET_MVP = 'mongodb+srv://beastdevmoney:I02iYsNKuxQZjNQc@cluster0.olrayk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  
  export async function connectDB_MVP () {
    if (conn.isConnectd) return
  
    await mongoose.connect(
      DATABASE_SECRET_MVP
    )
    conn.isConnectd = true
  }
  const db = mongoose.connection.setMaxListeners(20)
  db.on('connected', () => {
    console.log('Mongoose is conected')
  })
  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:', ))
  
  db.once('open', () => {
    console.log('Conexión exitosa a MongoDB')
  })
  