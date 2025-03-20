import React from "react"
import { useTheme } from "../context/ThemeContext"

const Modal = ({ isOpen, onClose, onSubmit, formData, handleInputChange, isSubmitting }) => {
    const { colors } = useTheme()

    if (!isOpen) return null

    return (
        <div
            className="modal"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(5px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: colors.backgroundLight,
                    padding: "20px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "500px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                }}
            >
                <h2
                    style={{ color: colors.text, marginBottom: "15px" }}
                    className="text-xl font-bold"
                >
                    Create NFT
                </h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: colors.background,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: colors.background,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: colors.background,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: colors.background,
                                color: colors.text,
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="fractions"
                            placeholder="Number of Fractions"
                            value={formData.fractions}
                            onChange={handleInputChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: `1px solid ${colors.accent}`,
                                backgroundColor: colors.background,
                                color: colors.text,
                            }}
                            required
                            min="1"
                        />
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <button
                            type="submit"
                            style={{
                                backgroundColor: colors.green,
                                color: "white",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                transition: "transform 0.15s",
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                            className="hover:scale-105"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create NFT"}
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            style={{
                                backgroundColor: colors.red,
                                color: "white",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                transition: "transform 0.15s",
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                            className="hover:scale-105"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
