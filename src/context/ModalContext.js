import React, { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
    })

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Here you would handle the NFT creation logic
        closeModal()
        // Reset form data
        setFormData({
            name: "",
            description: "",
            location: "",
            imageUrl: "",
        })
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
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
