import mongoose from 'mongoose'
const Schema = mongoose.Schema

// token Schema

const portfolioSchema = new Schema(
  {
    totalAmountInUSD: {
      type: Number
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet' // Reference to the 'Wallet' model
    },
    // assets
    positions: [
      {
        name: String,
        symbol: String,
        contractAddress: String,
        amountInUSD: Number,
        amountInTokens: Number
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema)
