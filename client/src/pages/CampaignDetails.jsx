import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { CustomButton } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'

const CampaignDetails = () => {
  return (
    <div>CampaignDetails</div>
  )
}

export default CampaignDetails