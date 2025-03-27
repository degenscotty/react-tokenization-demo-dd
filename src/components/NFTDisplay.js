import React from "react"
import PopSkullyImage from "../image/PopSkully_Tag_PP.jpg"

// NFT Image and Details component
const NFTDisplay = ({ nftData, loading, colors }) => (
    <div
        style={{
            backgroundColor: colors.cardBg,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: colors.shadow,
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        className="flex flex-col md:flex-row rounded-lg hover:shadow-xl hover:transform hover:-translate-y-1"
    >
        <div className="md:w-2/5 relative overflow-hidden bg-black">
            {loading ? (
                <div className="aspect-square bg-gray-800 animate-pulse flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600 animate-spin" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            ) : (
                <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-10"></div>
                    <img
                        src={nftData.image || PopSkullyImage}
                        alt={nftData.name}
                        className="w-full h-full object-cover md:h-full"
                        style={{
                            filter: "contrast(1.05)",
                        }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <div
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                                backgroundColor: colors.accent,
                                color: "white",
                            }}
                        >
                            Tokenized NFT
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="p-6 md:w-3/5 flex flex-col justify-between">
            <div className="space-y-4">
                <div className="mb-4">
                    <h2
                        style={{
                            color: colors.accent,
                        }}
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
                            className="text-sm font-medium mb-2"
                        >
                            Description
                        </h3>
                        <p
                            style={{
                                color: colors.text,
                                backgroundColor: colors.cardHighlight,
                                borderLeft: `3px solid ${colors.accent}`,
                            }}
                            className="text-base p-3 rounded-md"
                        >
                            {nftData.description}
                        </p>
                    </div>

                    <div>
                        <h3
                            style={{ color: colors.textSecondary }}
                            className="text-sm font-medium mb-2"
                        >
                            Location
                        </h3>
                        <div className="flex items-center p-2">
                            <svg
                                className="w-5 h-5 mr-2"
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
                            <p style={{ color: colors.text }} className="text-base font-medium">
                                {nftData.location}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                <div className="flex items-center justify-between text-sm">
                    <span style={{ color: colors.textSecondary }}>Tokenized Asset</span>
                    <span
                        style={{
                            color: colors.accent,
                        }}
                        className="font-semibold"
                    >
                        Fractional Ownership
                    </span>
                </div>
            </div>
        </div>
    </div>
)

export default NFTDisplay
