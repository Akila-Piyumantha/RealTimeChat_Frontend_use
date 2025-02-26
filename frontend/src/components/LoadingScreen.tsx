import React from "react";

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-primary">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
                <p className="text-white mt-4 text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;