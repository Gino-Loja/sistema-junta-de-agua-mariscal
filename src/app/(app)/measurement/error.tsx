'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            <div role="alert" className='drop-shadow-2xl backdrop-blur-xl bg-white/30'>
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{error.message}</p>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={reset}
                    >
                        Por favor intente de nuevo
                    </button>
                </div>
            </div>
        </div>
    )
}