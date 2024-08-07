const mongoose = require('mongoose')

const conn = {
    isConnectd: false
  }
  const DATABASE_SECRET_MVP = process.env.DATABASE_SECRET_MVP
  console.log("Esta es la contraseña que está logeandose",DATABASE_SECRET_MVP)
  
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
  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'))
  
  db.once('open', () => {
    console.log('Conexión exitosa a MongoDB')
  })
  