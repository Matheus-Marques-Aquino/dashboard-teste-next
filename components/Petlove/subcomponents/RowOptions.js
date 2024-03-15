import React, { useEffect, useState } from 'react';

export default function RowOptions({ index, options, display, actionCallback }) {

    if (!display) {
        return (<></>);
    }

    return (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <div 
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#F3F4F6] cursor-pointer"
                    onClick={ ()=>{ actionCallback(index, 'more-details'); } }
                >
                    Mais Detalhes
                </div>
                <div 
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[#F3F4F6] cursor-pointer"
                    onClick={ ()=>{ actionCallback(index, 'cancel'); } }
                >
                    Cancelar
                </div>
            </div>            
        </div>
    );

}