import React from "react"
import { ModalProvider } from "./context/ModalContext"
import { useTheme } from "./context/ThemeContext"
import Navbar from "./components/Navbar"
import MainContent from "./components/MainContent"
import Modal from "./components/Modal"
import { useModal } from "./context/ModalContext"

// Wrapper component that uses the modal context
const AppContent = () => {
    const { isModalOpen, closeModal, formData, handleInputChange, handleSubmit, isSubmitting } =
        useModal()
    const { colors } = useTheme()

    return (
        <div
            className="App min-h-screen transition-colors duration-300 flex flex-col"
            style={{ backgroundColor: colors.background }}
        >
            <div className="flex-1">
                <Navbar />
                <div className="container mx-auto px-4">
                    <MainContent />
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onSubmit={handleSubmit}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </div>
    )
}

function App() {
    return (
        <ModalProvider>
            <AppContent />
        </ModalProvider>
    )
}

export default App
