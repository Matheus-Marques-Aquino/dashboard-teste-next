import { LuArrowUpDown } from "react-icons/lu";
{/*<LuArrowUpDown className="my-auto" />*/}

import { FaArrowDownShortWide } from "react-icons/fa6";
{/* <FaArrowDownShortWide /> */ }

import { FaArrowUpWideShort } from "react-icons/fa6";
{/* <FaArrowUpWideShort /> */ }

import { useState, useEffect } from 'react';

import { translateLabel } from "../modules/columnsController";

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

export default function TableHead ({ columns, sortBy, updateSort }) {
	const [sortColumn, setSortColumn] = useState(null);

	if (!Array.isArray(columns)) {
		columns = [];
	}

	if (columns.indexOf('customer') > -1){
		columns.splice(columns.indexOf('customer'), 1);
	}

	if (columns.indexOf('address') > -1){
		columns.splice(columns.indexOf('address'), 1);
	}

	const updateSorting = (column) => {
		if (sortColumn && sortColumn.column == column) {
			let sortBy = {
				column,
				order: sortColumn.order * -1
			}

			setSortColumn({ ...sortBy });

			updateSort({ ...sortBy })

			return;
		}

		let sortBy = {
			column,
			order: 1
		}

		setSortColumn({ ...sortBy });

		updateSort({ ...sortBy })
	}

	const getLabel = (column, sortBy) => {
		let label = translateLabel(column);

		if (!label || label == '') {
			return (
				<div className="flex mx-auto w-fit">
					<div className="my-auto mr-2"> --- </div>										
				</div>	
			);
		}

		if ( sortBy && sortBy.column && sortBy.column == column && (sortBy.order == 1 || sortBy.order == -1)){
			return (
				<div className="flex mx-auto w-fit">
					<div className="my-auto mr-2">{ label }</div>
					{ ( sortBy.order < 0 ) ? <FaArrowDownShortWide /> : <FaArrowUpWideShort /> }
				</div>
			);
		}

		return (
			<div className="flex mx-auto w-fit">
				<div className="my-auto mr-2">{ label }</div>
				<LuArrowUpDown className="my-auto" />
			</div>
		);
	}

	//console.log('columns', columns);

	return (
		<thead>
			<tr>
				<th
					className={
						"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-blueGray-50 text-blueGray-500 border-blueGray-100"
					}
				>
					<div className="flex mx-auto w-fit pl-2">
						<input
							type="checkbox"
							name="select-all"
							id="select-all"
							className="m-auto"
						/>
					</div>
				</th>
				
				{
					columns.map((column, index) => {
						let key = "head_" + index;

						return (
							<th
								key={key}
								className={
									"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
									"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
								}
								onClick={ () => { updateSorting(column); } }
							>
								{ getLabel(column, sortBy) }									
							</th>
							
						);
					})
				}
				
				<th
					className={
						"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
						"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
					}
				>
					<div className="flex mx-auto w-fit">
						<div className="my-auto mr-2">Ações</div>
					</div>
				</th>
			</tr>
		</thead>
	)
}