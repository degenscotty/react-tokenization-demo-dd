import React, { createContext, useContext, useState, useEffect } from "react"
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

    const { mintNft, isPending, isConfirmed } = useMarketNft()

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Close modal and reset form when transaction is confirmed
    useEffect(() => {
        if (isConfirmed && isSubmitting) {
            // Reset form data
            setFormData({
                name: "",
                description: "",
                location: "",
                imageUrl: "",
                fractions: "100",
            })
            setIsSubmitting(false)
            closeModal()
        }
    }, [isConfirmed])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)

        setIsSubmitting(true)

        try {
            // Call the mintNft function - the modal stays open while transaction is processing
            await mintNft(
                formData.name,
                formData.description,
                formData.location,
                formData.imageUrl,
                Number(formData.fractions),
            )

            // Don't close modal here - it will be closed by the useEffect when isConfirmed becomes true
        } catch (error) {
            console.error("Error minting NFT:", error)
            setIsSubmitting(false)
            // Keep modal open on error so user can try again
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
