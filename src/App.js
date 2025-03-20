import React from "react"
import { ModalProvider } from "./context/ModalContext"
import Navbar from "./components/Navbar"
import MainContent from "./components/MainContent"
import Modal from "./components/Modal"
import { useModal } from "./context/ModalContext"

// Wrapper component that uses the modal context
const AppContent = () => {
    const { isModalOpen, closeModal, formData, handleInputChange, handleSubmit } = useModal()

    return (
        <div className="App">
            <Navbar />
            <MainContent />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
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
