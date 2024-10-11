'use client'

import { motion } from "framer-motion";

export default function AlertSuccess({ title, message, close }: { title: string, message: string, close: () => void }) {
    return (
        <motion.div
            className={`fixed top-4 z-40 right-4 border-l-4 p-4 bg-green-100 border-green-400 text-green-700`}
            role="alert"
            initial={{ x: 100, opacity: 0 }}  // Comienza fuera de la pantalla a la derecha con opacidad 0
            animate={{ x: 0, opacity: 1 }}   // Se mueve hacia su posición original y aparece
            exit={{ x: 100, opacity: 0 }}     // Si decides desmontarlo, se moverá hacia la derecha y desaparecerá
            transition={{ type: "tween", duration: 0.3 }}  // Configuración de la transición (puedes ajustar la duración)
        >
            <div className="flex items-center">
                <div className="flex-grow">
                    <div className="flex-shrink-0 mr-3">
                        {title}
                    </div>
                    <p className="text-sm">{message}</p>
                </div>
                <button
                    onClick={close}
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    aria-label="Cerrar alerta"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
}
