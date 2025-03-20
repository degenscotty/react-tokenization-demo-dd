import React from "react"
import PopSkullyImage from "../image/PopSkully_Tag_PP.jpg"

// NFT Image and Details component
const NFTDisplay = ({ nftData, loading, colors }) => (
    <div
        style={{
            backgroundColor: colors.backgroundLight,
            borderLeft: `4px solid ${colors.accent}`,
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
        }}
        className="flex flex-col md:flex-row rounded-lg overflow-hidden hover:shadow-xl hover:transform hover:scale-[1.01]"
    >
        <div className="md:w-2/5 relative overflow-hidden bg-black">
            {loading ? (
                <div className="aspect-square bg-gray-800 animate-pulse"></div>
            ) : (
                <div className="relative">
                    <img
                        src={nftData.image || PopSkullyImage}
                        alt={nftData.name}
                        className="w-full h-full object-cover"
                        style={{
                            filter: "contrast(1.05)",
                        }}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                    ></div>
                </div>
            )}
        </div>

        <div className="p-6 md:w-3/5">
            <div className="mb-4">
                <h2
                    style={{ color: colors.accent }}
                    className="text-sm uppercase tracking-wider font-semibold"
                >
                    NFT Asset
                </h2>
                <h1 style={{ color: colors.text }} className="text-2xl font-bold mt-1">
                    {nftData.name}
                </h1>
            </div>

            <div className="space-y-4">
                <div>
                    <h3
                        style={{ color: colors.textSecondary }}
                        className="text-sm font-medium mb-1"
                    >
                        Description
                    </h3>
                    <p style={{ color: colors.text }} className="text-base">
                        {nftData.description}
                    </p>
                </div>

                <div>
                    <h3
                        style={{ color: colors.textSecondary }}
                        className="text-sm font-medium mb-1"
                    >
                        Location
                    </h3>
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ color: colors.accent }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <p style={{ color: colors.text }} className="text-base">
                            {nftData.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default NFTDisplay
