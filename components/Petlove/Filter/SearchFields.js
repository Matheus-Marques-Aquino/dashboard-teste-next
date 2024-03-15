import { 
    translateLabel,
    getSearchFields,
    getSearchFieldsFuse
} from "../modules/columnsController";

import { IoSearch } from "react-icons/io5";

const fields = getSearchFields();

const fuseSettings = getSearchFields();

import { useEffect, useState } from "react";

export default function SearchFields ({ columns, properties, updateSearchFields, cancel, doSearch }) {
    const [searchFields, setSearchFields] = useState([]);

    if (!Array.isArray(columns)) {
        columns = [];
    }

    if (!Array.isArray(properties)) {
        properties = [];
    }

    const checkHandler = (event) => {
        if (!event || !event.target) {
            return;
        }

        const {
            name,
            checked
        } = event.target;

        console.log(name, checked);

        let fieldName = name.replace('check-field-', '');

        if (checked && !searchFields.includes(fieldName)) {
            let fields = [ ...searchFields ];

            console.log('Fields A', fields);

            updateSearchFields([ ...fields, fieldName ])
            
            setSearchFields([ ...fields, fieldName ]);

            return;
        }

        if (!checked && searchFields.includes(fieldName)) {          

            let fields = [ ...searchFields ];

            let index = fields.indexOf(fieldName);

            if (index > -1) {
                fields.splice(index, 1);
            }

            console.log('Fields B', fields);

            setSearchFields([ ...fields ]);

            updateSearchFields([ ...fields ]);            

            return;
        }
    }

    //console.log('Search Fields A', searchFields);
    
    useEffect(()=>{
        setSearchFields([ ...fields ]);
    }, []);

    /*
    useEffect(()=>{
        updateSearchFields(searchFields);
    }, [searchFields]);
    */
    return (        
        <div
            className="text-xs font-medium text-[#333333] pb-3 max-w-[960px]"
        >
            <div className="text-sm pb-1">
                [Busca Avançada] Pesquisar nos Campos:
            </div>
            <div
                className="mt-1 flex flex-wrap items-left"
            >
                {
                    fields.map((field, index) => {
                        let label = translateLabel(field);

                        if (!label || label == '' || !columns.includes(field) || field == 'customer' || field == 'address' || field == 'from') {
                            return (<></>)
                        }

                        let check = searchFields.includes(field);
                        let key = 'search-field-' + index;

                        return (
                            <div
                                className="flex mr-2 px-2 py-2 w-[140px] shadow-lg rounded bg-white border border-gray-200"
                                key={key}
                            >
                                <input
                                    type="checkbox"
                                    name={"check-field-" + field}
                                    id={"check-field-" + field}
                                    className="my-auto w-[14px] h-[14px]"
                                    checked={check}
                                    onChange={checkHandler}
                                />
                                <div 
                                    className="ml-2 my-auto leading-[14px]"
                                >
                                    { label }
                                </div>
                            </div>
                        )
                    })
                }                
            </div> 
            <div
                className="flex mt-3 text-sm font-medium"
            >
                <button 
                    type="submit" 
                    className="inline-flex items-center h-full px-3 py-1 mr-5 text-white bg-bluePrime rounded-lg border border-bluePrime hover:bg-bluePrime2 focus:outline-none"
                    onClick={ doSearch }
                >
                    <IoSearch className="w-4 h-4 mr-1" />
                    Buscar
                </button>
                <button 
                    type="submit" 
                    className="inline-flex items-center h-full px-3 py-1 text-[#333333] bg-[#DEDEDE] rounded-lg border border-[#DCDCDC] hover:bg-[#CDCDCD] focus:outline-none dark:bg-[#DDDDDD] dark:hover:bg-[#DDDDDD]"
                    onClick={ cancel }
                >
                    Cancelar
                </button>                
            </div>
            

            
        </div>
    )
}