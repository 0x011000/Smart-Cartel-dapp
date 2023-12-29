import mongoose from 'mongoose'
const Schema = mongoose.Schema

const mafiaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  wallets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet' // Reference to the 'Wallet' model
    }
  ]
})

export const Mafia = mongoose.models.Mafia || mongoose.model('Mafia', mafiaSchema)
