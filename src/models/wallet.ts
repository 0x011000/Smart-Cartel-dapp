import mongoose from 'mongoose'
const Schema = mongoose.Schema

const walletSchema = new Schema(
  {
    address: {
      type: String,
      required: true
    },
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entity', // Reference to the 'Entity' model
      required: true
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction' // Reference to the 'Transaction' model
      }
    ]
  },

  { timestamps: true }
)

export const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema)
