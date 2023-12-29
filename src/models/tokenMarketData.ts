import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tokenMarketDataSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    contractAddress: {
      type: String,
      required: true
    },
    marketCap: {
      type: Number
    },
    liquidity: {
      type: Number
    },
    liquidity_pools: [
      {
        dexVolume24h: Number,
        contractAddress: String
      }
    ],
    globalDexVolume24h: {
      type: Number
    },
    walletHolders: {
      type: Number
    },
    entityHolders: {
      type: Number
    },
    totalBuyVolume24h: {
      type: Number
    },
    totalSellVolume24h: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

export const TokenMarketData =
  mongoose.models.Token_Market_Data || mongoose.model('Token_Market_Data', tokenMarketDataSchema)
