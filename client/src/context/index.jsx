import { useContext, createContext } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x54B855b6D33dDdFdB2e1A38C7D1727795E14933E')
    const { mutateAsync } = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async (form) => {
        try {
            const data = await mutateAsync({ args: [
                address, 
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(), 
                form.image
            ]})
        
            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCompaigns')

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))

        return parsedCampaigns
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns()
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address)

        return filteredCampaigns
    }

    return (
        <StateContext.Provider
            value={{ 
                address, 
                contract,
                connect,
                createCampaign: publishCampaign, 
                getCampaigns,
                getUserCampaigns
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)