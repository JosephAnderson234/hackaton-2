export const LoadingDots = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex space-x-1">
                <div
                    className="w-3 h-3 rounded-full animate-bounce"
                    style={{
                        backgroundColor: "#00c951",
                        animationDelay: "0ms",
                        animationDuration: "1000ms",
                    }}
                />
                <div
                    className="w-3 h-3 rounded-full animate-bounce"
                    style={{
                        backgroundColor: "#00c951",
                        animationDelay: "150ms",
                        animationDuration: "1000ms",
                    }}
                />
                <div
                    className="w-3 h-3 rounded-full animate-bounce"
                    style={{
                        backgroundColor: "#00c951",
                        animationDelay: "300ms",
                        animationDuration: "1000ms",
                    }}
                />
            </div>
        </div>
    )
}

//se plantea crear futuras animaciones de carga para mejorar la experiencia del usuario