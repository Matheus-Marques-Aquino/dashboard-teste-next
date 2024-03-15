import { FaRegEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

import { getSearchFields } from "../modules/columnsController";

import React, { useState, useEffect } from 'react';

import { IoMdCloseCircle } from "react-icons/io";

import ColumnsControl from "./ColumnsControl";

import SelectFields from "./SelectFilters";

import SearchFields from "./SearchFields";

const allSearchFields = [
    'id',
    'name',
    'guardian',
    'customer_uuid',
    'customer_cpf',
    'customer_email',        
];

export default function PlansSearch({ updateSearch, properties, results, columns, updateSelectFilters, updateCheckFilters, updateColumns }) {
    const [advancedSearch, setAdvancedSearch] = useState(false);

    const [useFilters, setUseFilters] = useState(false);

    const [searchFields, setSearchFields] = useState([
        'id',
        'name',
        'guardian',
        'customer_uuid',
        'customer_cpf',
        'customer_email',        
    ]);
    
    const [filterData, setFilterData] = useState({
        searchString: ''
    });

    //const [searchFilters, setSearchFilters] = useState({});    

    const inputHandler = (event) => {
        if (!event || !event.target) {
            return;
        }

        const { 
            name, 
            value 
        } = event.target;

        setFilterData({
            ...filterData,
            [name]: value
        });
    };

    useEffect(() => {
        updateCheckFilters([ ...searchFields ]);
    },[ searchFields ]);

    return (
        <div>
            <div className="flex items-left mb-2 pt-6">
                <div className="flex items-center">
                    <div className="relative w-full h-full">
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] pl-4 p-[5px]"
                            placeholder="Buscar..."
                            name="searchString"
                            value={filterData.searchString}
                            onChange={inputHandler}
                        />
                        <IoMdCloseCircle 
                            className={`absolute right-2 top-0 bottom-0 my-auto w-5 h-5 cursor-pointer opacity-50 ${filterData.searchString ? '' : 'hidden'}`}
                            onClick={()=>{ setFilterData({ ...filterData, searchString: ''}); updateSearch(''); }}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={ "inline-flex items-center h-full px-3 ml-2 text-sm font-medium text-white bg-bluePrime rounded-lg border border-bluePrime hover:bg-bluePrime2 focus:outline-none " + (advancedSearch ? ' hidden' : '') }
                        onClick={ () => { updateSearch(filterData.searchString); } }
                    >
                        <IoSearch className="w-4 h-4 mr-1" />
                    </button>
                    <button 
                        type="submit" 
                        className={"inline-flex items-center h-full px-3 ml-4 text-sm font-medium text-[#333333] bg-[#DEDEDE] rounded-lg border border-[#DCDCDC] hover:bg-[#CDCDCD] focus:outline-none dark:bg-[#DDDDDD] dark:hover:bg-[#DDDDDD] " + (useFilters ? 'hidden' : '')}
                        onClick={ () => { setUseFilters(true); } }
                    >
                        <CiFilter className="mr-1 -ml-1 w-5 h-4 font-bold" />
                        Filtros
                    </button>
                </div>
            </div>
            <div className={ "ml-1 mb-5 " }>
                <div
                    className={"flex text-xs text-[#03a8db] font-bold cursor-pointer " + (advancedSearch ? 'hidden' : '') }
                    onClick={() => { setAdvancedSearch(!advancedSearch); }}
                >
                    <FaRegEdit className="text-sm mr-1" />
                    <div className="">Busca avançada</div>
                </div>
                <div
                    className={ " " + (!advancedSearch ? 'hidden' : '') }
                >
                    <SearchFields 
                        updateSearchFields={ (fields)=>{ setSearchFields([ ...fields ]) }}
                        columns={columns} 
                        properties={properties} 
                        cancel={ ()=>{ setSearchFields(allSearchFields); setAdvancedSearch(false); } }
                        doSearch={ () => { updateSearch(filterData.searchString); } }
                    />
                </div>
            </div>

            <div 
                className={" " + (useFilters ? '' : 'hidden')}
            >
                <SelectFields 
                    updateFilters={ updateSelectFilters }
                    columns={columns} 
                    results={results} 
                    cancel={()=>{ setUseFilters(false); }}
                />            
            </div>
            <ColumnsControl 
                properties={properties} 
                columns={columns} 
                updateColumnsData={ updateColumns }
            />
        </div>
    );
}