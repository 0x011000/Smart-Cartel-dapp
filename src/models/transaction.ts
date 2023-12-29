import mongoose from 'mongoose'
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    hash: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    metadata: {
      type: Object
    },
    timestamp: {
      type: Date,
      required: true
    },
    wallets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet' // Reference to the 'Wallet' model
      }
    ]
  },
  { timestamps: true }
)

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)
