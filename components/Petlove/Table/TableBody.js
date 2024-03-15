import { BsThreeDotsVertical } from "react-icons/bs";

import { translateSelectLabel } from "../modules/columnsController";

import RowOptions from "../subcomponents/RowOptions";
import { useRef, useState } from "react";

function formatDate(date) {
    const twoDigits = (n) => n.toString().padStart(2, '0');

    const day = twoDigits(date.getDate());
    const month = twoDigits(date.getMonth() + 1); // +1 porque getMonth() retorna 0-11
    const year = date.getFullYear();
    const hours = twoDigits(date.getHours());
    const minutes = twoDigits(date.getMinutes());
    const seconds = twoDigits(date.getSeconds());

    return (
        <>
            {`${day}/${month}/${year}`} 
            <br/> 
            {`${hours}:${minutes}:${seconds}`}
        </>
    );
}

const TableCell = ({ result, column, key }) => {
    let maxWidth = null;
    let width = null;

    let customClass = "border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center ";

    let value = result[column];

    value = translateSelectLabel(value);

    if (!value){
        value = '---';
    }    

    if (column == 'name' || column == 'guardian') {
        customClass += "min-w-[140px] max-w-[160px]";
    }

    if (column == 'id' || column == 'customer_uuid') {
        customClass += "min-w-[140px] max-w-[140px] text-[10px]";
    }

    if (column == 'customer_email') {
        customClass += "max-w-[180px] text-[11px] truncate";
    }

    if (column == 'race') {
        customClass += "max-w-[120px] text-[11px]";
    }

    if (column == 'name' || column == 'guardian') {
        customClass += "min-w-[140px] max-w-[160px]";
    }

    if (column == 'city') {
        customClass += "min-w-[110px] max-w-[140px]";
    }

    if (column == 'payment_method') {
        customClass += "min-w-[120px] max-w-[140px]";
    }

    if (column == 'created_at' && value != '---') {
        value = new Date(value);

        if (!value) {
            value = '---';
        }else{
            value = formatDate(value);
        }        
    }

    if (column == 'customer_cpf') {
        if (/^[0-9]{11}$/.test(value)){
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }

        customClass += "min-w-[105px]";
    }

    return (           
        <td
            key={key}
            className={customClass}
            title={value}
        > 
            { value }
        </td>
    );   

    if (maxWidth){
        return (           
            <td
                key={key}
                className={"border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center " + "max-w-[210px]" }
                
            > 
                { value }
            </td>
        );    
    }

    if (width){
        return (           
            <td
                key={key}
                className={"border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center " + "min-w-[" + width + "px]" }
                
            > 
                { value }
            </td>
        );    
    }
    
    //if (maxWidth) {
    //    return (
    //        <div className={`max-w-[${maxWidth}px]`}>
    //            { value }
    //        </div>            
    //    );    
    //}
    
    return (           
        <td
            key={key}
            className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center"
        > 
            { value } 
        </td>
    );

};

const TableRow = ({ result, columns, index, optionsIndex, optionsCallback, menuCallback }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);

    const actionCallback = (index, action) => {
        if (action == 'cancel'){
            optionsCallback(false);
            return;
        }

        if (action == 'more-details') {
            menuCallback(index, action);
            return;
        }
        
    };

    return (
        <tr>
            <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
                <div className="flex w-full h-full pl-2">
                    <input
                        type="checkbox"
                        name={`select-${index}`}
                        id={`select-${index}`}
                        className="m-auto"
                    />										
                </div>
            </td>
            {
                columns.map((column, i) => {
                    let key = "row" + i;

                    return (
                        <TableCell result={result} column={column} key={key} />
                    );                
                })
            }
            <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2">
                <div 
                    className={`fixed top-0 left-0 w-full h-full ${(index === optionsIndex) ? '' : 'hidden'}`}
                    onClick={ () => { optionsCallback(false); } }
                ></div>
                <div className="relative inline-block flex">
                    <BsThreeDotsVertical
                        className="m-auto cursor-pointer text-xl" 
                        onClick={ () => { optionsCallback(index); } }
                    />
                    <RowOptions 
                        index={index} 
                        display={(index === optionsIndex)} 
                        actionCallback={actionCallback}
                    />
                </div>

            </td>
        </tr>
    )
};

export default function TableBody ({ results, columns, sortBy, menuCallback }) {
    const [optionsIndex, setOptionsIndex] = useState(false);    

    const optionsHandler = (index) => {  
        setOptionsIndex( index );
    };

    const menuHandler = (index, action) => {
        setOptionsIndex(false);

        if (index === false || !action) {
            menuCallback(false);
            return;
        }

        if (action == 'more-details') {
            let result = { ...results[index] };

            menuCallback(result);
            return;
        }
    }

    //console.log('results', results);
    return (
        <tbody>        
            {
                results.map((result, index) => {
                    let key = "row" + index;

                    return (
                        <TableRow
                            key={key}
                            result={result}
                            columns={columns}
                            index={index}
                            optionsIndex={optionsIndex}
                            optionsCallback={optionsHandler}
                            menuCallback={menuHandler}
                        />
                    );
                })
            }            
        </tbody>
    );
}