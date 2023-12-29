import mongoose from 'mongoose'
const Schema = mongoose.Schema

// do we really need to store data in this collection? we can compute all values of this collection from `portfolio` collection
const globalPortfolioSchema = new Schema(
  {
    totalAmountInUSD: {
      type: Number
    },
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

export const GlobalPortfolio =
  mongoose.models.Global_Portfolio || mongoose.model('Global_Portfolio', globalPortfolioSchema)

// const GlobalPortfolio = mongoose.model('global_portfolio', globalPortfolioSchema)
