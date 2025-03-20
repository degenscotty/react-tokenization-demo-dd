import React from "react"
import PopSkullyImage from "../image/PopSkully_Tag_PP.jpg"

// NFT Image and Details component
const NFTDisplay = ({ nftData, loading, colors }) => (
    <div
        style={{ backgroundColor: colors.backgroundLight }}
        className="flex-2 w-2/3 p-4 rounded-md shadow flex items-center"
    >
        {loading ? (
            <div className="w-1/3 h-64 bg-gray-200 animate-pulse rounded-md mr-4"></div>
        ) : (
            <img
                src={nftData.image || PopSkullyImage}
                style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                alt={nftData.name}
                className="w-1/3 h-auto mr-4"
            />
        )}
        <div>
            <h2 style={{ color: colors.text }} className="text-lg font-bold">
                Name
            </h2>
            <p style={{ color: colors.text }} className="text-gray-600">
                {nftData.name}
            </p>
            <h2 style={{ color: colors.text }} className="text-lg font-bold">
                Description
            </h2>
            <p style={{ color: colors.text }} className="text-gray-600">
                {nftData.description}
            </p>
            <h2 style={{ color: colors.text }} className="text-lg font-bold">
                Location
            </h2>
            <p style={{ color: colors.text }} className="text-gray-600">
                {nftData.location}
            </p>
        </div>
    </div>
)

export default NFTDisplay
