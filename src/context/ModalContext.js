import React, { createContext, useContext, useState } from "react"
import { useMarketNft } from "../hooks/useMarketNft"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
        fractions: "100", // Default value for fractions
    })

    const { mintNft, isPending } = useMarketNft()

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)

        setIsSubmitting(true)

        try {
            // Call the mintNft function
            await mintNft(
                formData.name,
                formData.description,
                formData.location,
                formData.imageUrl,
                Number(formData.fractions),
            )

            // Close modal immediately, the transaction is in progress
            closeModal()

            // Reset form data
            setFormData({
                name: "",
                description: "",
                location: "",
                imageUrl: "",
                fractions: "100",
            })
        } catch (error) {
            console.error("Error minting NFT:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                openModal,
                closeModal,
                formData,
                handleInputChange,
                handleSubmit,
                isSubmitting,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
