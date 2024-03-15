import { 
    translateLabel,
    getSelectFields,
    translateSelectLabel,
    getSelectFieldsValue
} from "../modules/columnsController";


import { useState, useEffect } from "react";


export default function SelectFields ({ results, columns, updateFilters, cancel }) {
    const [selectFilters, setSelectFilters] = useState({});

    const selectHandler = (event) => {
        if (!event || !event.target) {
            return;
        }

        const {
            name,
            value
        } = event.target;

        setSelectFilters({
            ...selectFilters,
            [name]: value
        });        
    }

    //console.log(selectFilters)

    if (!Array.isArray(results)) {
        results = [];
    }

    if (!Array.isArray(columns)) {
        columns = [];
    }

    var selectFields = [];

    var fieldValues = getSelectFieldsValue(results);

    for (let key in fieldValues) {
        selectFields.push(key);
    }

    //console.log(selectFields)

    console.log(fieldValues)

    return (        
        <div
            className="text-xs font-medium text-[#333333] px-1 pb-5 max-w-[960px]"
        >
            <div className="text-sm pb-1">
                Filtrar os Campos:
            </div>
            <div
                className="flex"
            >
                {
                    selectFields.map((select, index) => {
                        let label = translateLabel(select);

                        if (!label || label == '') {
                            return (<></>);
                        }

                        return (
                            <div
                                className="flex mr-2 mt-1 w-[190px]"
                            >
                                <select 
                                    name={select}
                                    className="block text-sm appearance-none w-[190px] bg-white border border-gray-400 hover:border-gray-500 px-3 py-1 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={selectHandler}
                                >
                                    <option
                                        name={select}
                                        value=''
                                    >
                                        { label }                                    
                                    </option>
                                    {
                                        fieldValues[select].map((value, index) => {
                                            let optionLabel = translateSelectLabel(value) ? translateSelectLabel(value) : value;
                                            //console.log(value)
                                            //let optionLabel = translateSelectLabel(value);
                                            //console.log('aaa', value, optionLabel)
                                            return (
                                                <option
                                                    value={value}
                                                >
                                                    { optionLabel }                                    
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )
                    })
                }                
            </div>
            <button 
                type="submit" 
                className="inline-flex items-center py-1 px-3 mt-3 text-sm font-medium text-white bg-bluePrime rounded-lg border border-bluePrime hover:bg-bluePrime2 focus:outline-none"
                onClick={ () => { console.log(selectFilters); updateFilters(selectFilters); } }
            >
                Aplicar
            </button>
            <button 
                type="submit" 
                className="inline-flex items-center py-1 px-3 mt-3 text-sm font-medium ml-4 text-[#333333] bg-[#DEDEDE] rounded-lg border border-[#DCDCDC] hover:bg-[#CDCDCD] focus:outline-none dark:bg-[#DDDDDD] dark:hover:bg-[#DDDDDD]"
                onClick={ ()=>{ updateFilters({}); cancel(); } }
            >
                Cancelar
            </button>  
        </div>
    )
}