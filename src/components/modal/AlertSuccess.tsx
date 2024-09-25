'use client'








export default function AlertSuccess({ title, message, close }: { title: string, message: string, close: () => void }) {


    return (
        // <div className="fixed bottom-4 right-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        //     <div className="flex">
        //         <div onClick={close} className="py-1">
        //             <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        //                 <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        //             </svg>
        //         </div>
        //         <div>
        //             <p className="font-bold">{title}</p>
        //             <p className="text-sm">{message}</p>
        //         </div>
        //         <button onClick={close} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 " data-dismiss-target="#alert-2" aria-label="Close">
        //             <span className="sr-only">Close</span>
        //             <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        //             </svg>
        //         </button>
        //     </div>
        // </div>




        <div className={`fixed top-4 z-40 right-4 border-l-4 p-4 bg-green-100 border-green-400 text-green-700`} role="alert">
            <div className="flex items-center">

                <div className="flex-grow">
                    <div className="flex-shrink-0 mr-3">
                        {title}
                    </div>
                    {/* <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p> */}
                    <p className="text-sm">{message }</p>
                </div>
                <button
                    onClick={() => close()}
                    className="cursor-pointer absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                    aria-label="Cerrar alerta"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                 </svg>
                </button>
            </div>
        </div>



    );
}

