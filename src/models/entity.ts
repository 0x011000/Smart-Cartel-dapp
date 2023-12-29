import mongoose from 'mongoose'
const Schema = mongoose.Schema

const entitySchema = new Schema(
  {
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
  },
  { timestamps: true }
)

export const Entity = mongoose.models.Entity || mongoose.model('Entity', entitySchema)
