import { translateLabel } from "../modules/columnsController";

import React, { useEffect, useState } from 'react';

const labels = {
	'name': 'Nome do Pet',
	'microchip': 'Microchip',
	'status': 'Status Petlove',
	'sex': 'Sexo',
	'race': 'Raça',
	'plan': 'Plano',
	'avatar': 'Foto',
	'id': 'ID do Pet',
	'from': 'Dados...',
	'guardian': 'Responsável',
	'customer_uuid': 'ID Responsável',
	'city': 'Cidade',
	'ibge': 'Código IBGE',
	'customer': 'Comprador...',
	'address': 'Endereço...',
	'payment_method': 'Pagamento',
	'payment_type': 'Recorrência',
	'payment_status': 'Status Pagar.me',
	'created_at': 'Adicionado Em'
};

export default function ColumnsControl ({ columns, properties, updateColumnsData }) {
    const [ columnsData, setColumnsData ] = useState([]);

    const checkHandler = (event) => {
        if (!event || !event.target) {
            return;
        }

        const {
            name,
            checked
        } = event.target;

        console.log(name, checked);

        let columnName = name.replace('select-column-', '');

        if (checked && !columns.includes(columnName)) {

            let columns = [ ...columnsData ];

            console.log('Columns A', columns);

            updateColumnsData([ ...columnsData, columnName ])
            
            setColumnsData([ ...columnsData, columnName ]);

            return;
        }

        if (!checked && columns.includes(columnName)) {          

            let columns = [ ...columnsData ];

            let index = columns.indexOf(columnName);

            if (index > -1) {
                columns.splice(index, 1);
            }

            updateColumnsData([ ...columns ])

            setColumnsData([ ...columns ]);

            return;
        }
    }

    if (!Array.isArray(columns)) {
        columns = [];
    }

    if (!Array.isArray(properties)) {
        properties = [];
    }

    useEffect(() => {
        setColumnsData([ ...columns ]);
    }, [ columns ]);

    return (        
        <div
            className="text-xs font-medium text-[#333333] px-1 pt-1 pb-3 max-w-[1000px]"
        >
            <div className="text-sm pb-1">
                Exibir Campos:
            </div>
            <div
                className="flex flex-wrap items-left"
            >
                {
                    properties.map((property, index) => {
                        let label = translateLabel(property);

                        let key = 'column_control_' + property;

                        if (!label || label == '' || property == 'customer' || property == 'address' || property == 'from') {
                            return (<></>)
                        }

                        let check = columnsData.includes(property);

                        return (
                            <div
                                key={key}
                                className="flex px-2 py-1 w-[130px]"
                            >
                                <input
                                    type="checkbox"
                                    name={"select-column-" + property}
                                    id={"select-column-" + property}
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
        </div>
    )
}