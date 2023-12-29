import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tagSchema = new Schema(
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
  {
    timestamps: true
  }
)

export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema)
