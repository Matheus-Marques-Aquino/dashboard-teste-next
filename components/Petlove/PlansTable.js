import React from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "../Dropdowns/TableDropdown";

import TableHead from "./Table/TableHead";

import TableBody from "./Table/TableBody";

import ModalPetloveDetails from "./subcomponents/ModalPetoveDetails";

import { LuArrowUpDown } from "react-icons/lu";
{/*<LuArrowUpDown className="my-auto" />*/}

import { FaArrowDownShortWide } from "react-icons/fa6";
{/* <FaArrowDownShortWide /> */ }

import { FaArrowUpWideShort } from "react-icons/fa6";
{/* <FaArrowUpWideShort /> */ }

import { BsThreeDotsVertical } from "react-icons/bs";

import { useState } from "react";

import PlansSearch from "./Filter/PlansSearch";

import Fuse from 'fuse.js';

import { getSelectFieldsValue } from "./modules/columnsController";

const defaultColumns = [
	'id',
	'name',
	'plan',
	'status',
	'customer_uuid',
	'guardian',
	'customer_cpf',
	'customer_email',
	'created_at',
];

const mainSelects = [
	'plan',
	'status',
	'city',
	'payment_method',
	'payment_status',
	'payment_type',
	'signed',
];

const objectLength = (obj) => {
	if (!obj || typeof obj !== 'object') {
		return 0;
	}

	return Object.keys(obj).length;
}

export default function PlansTable({ results, columns, sortBy, properties, loading }) {
	const [sortColumn, setSortColumn] = useState({
		column: 'created_at', 
		order: -1
	});

	const [searchString, setSearchString] = useState('');

	const [searchKeys, setSearchKeys] = useState([]);

	const [selectFilters, setSelectFilters] = useState({});

	const [menuData, setMenuData] = useState(false);

	const [tableColumns, setTableColumns] = useState([
	//	'id',
		'name',
		'plan',
		'status',
	//	'customer_uuid',
		'guardian',
		'customer_cpf',
		'customer_email',
		'created_at',
	]);

	const menuHandler = (data) => {
		setMenuData(data);
	};	

	if (!results || !Array.isArray(results)) {
		results = [];
	}

	console.log('Search Keys', searchKeys);

	const fuseOptions = {
		includeScore: true,
		minMatchCharLength: 2,
		threshold: 0.6,
		keys: [ ...searchKeys ]
	};

	const fuse = new Fuse(results, fuseOptions);

	var searchResults = [];

	if (searchString.length > 0){
		searchResults = fuse.search(searchString);

		for(let i in searchResults) {
			searchResults[i] = searchResults[i].item;
		}
	}else{
		searchResults = [ ...results ];
	}

	//Filter Select
	for(let i in searchResults){
		let row = searchResults[i];

		for(let j in row){
			let column = row[j];
		}
	}

	console.log('Search Results 1', searchResults);

	const updateSearch = (search) => {
		setSearchString(search);
	}

	const updateSorting = (data) => {
		if (!data || !data.column || (data.order != 1 && data.order != -1)) {
			return;
		}

		setSortColumn({ ...data });

		console.log('updateSorting', data);
	}

	if (objectLength(selectFilters) > 0) {
		console.log('Select Filters', selectFilters);

		searchResults = searchResults.filter((row)=>{
			let include = true;

			console.log(row, selectFilters);

			for (let key in selectFilters) {
				if (!selectFilters || !selectFilters[key] || selectFilters == '') {
					continue;
				}

				if (!row[key] || row[key] != selectFilters[key]) {
					include = false;
				}
			}
			//for(let key in selectFilters){
			//	if (!row[key] || row[key] != selectFilters[key]){
			//		include = false;
			//	}
			//}

			if (include){
				return true;
			}

			return false;
		});		
	}

	if (sortColumn && sortColumn.column && ( sortColumn.order == 1 || sortColumn.order == -1 )) {
		var {
			order,
			column
		} = sortColumn;

		searchResults.sort((a, b)=>{
			if (!a || !b){ 
				return 0;
			}			

			let valueA = a[column] || '';
			let valueB = b[column] || '';

			if (valueA == '' && valueB == ''){
				return 0;
			} else if (valueA == '') {
				return 1;
			} else if (valueB == '') {
				return -1;
			}

			if (column == 'created_at'){
				valueA = new Date(valueA);
				valueB = new Date(valueB);

				if ( !valueA ){
					valueA = 0;
				}else{
					valueA = valueA.getTime();
				}

				if ( !valueB ){
					valueB = 0;
				}else{
					valueB = valueB.getTime();
				}

				return (valueA - valueB) * order;
			}

			//if (valueA && valueB) {
				return valueA.localeCompare(
					valueB, 
					undefined, 
					{ sensitivity: 'base' }
				) * order;
			//}

			if (valueA > valueB) {
				return 1 * order;
			}

			if (valueA < valueB) {
				return -1 * order;
			}

			return 0;
		});

		//console.log('results sort', results);
	}

	console.log('Selects:', getSelectFieldsValue(results));

	console.log('Search Results', searchResults);
	
	return (
		<>
			<PlansSearch 
				updateSearch={updateSearch} 
				updateSelectFilters={setSelectFilters}
				properties={properties} 
				columns={tableColumns} 
				results={results} 
				updateCheckFilters={setSearchKeys}
				updateColumns={setTableColumns}
			/>
			<div
				className={
					"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
					"bg-white"
				}
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full max-w-full flex-grow flex-1">
							<h3
								className={
									"font-semibold text-lg " +
									"text-blueGray-700"
								}
							>
								Lista de Planos Petlove
							</h3>
						</div>
					</div>
				</div>					
				<div className="flex w-full text-xs">
					<div className="mr-auto pb-2 pl-4">
						0 Selecionados
					</div>
					<div className="ml-auto pb-2 pr-3">
						{ searchResults.length.toString() } Resultados
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					<div className={'mx-auto mt-3 w-fit' + (loading) ? 'hidden' : ''}> Carregando... </div>
					<table className="items-center w-full bg-transparent border-collapse">
						<TableHead columns={tableColumns} sortBy={sortColumn} updateSort={updateSorting} />							
						<TableBody columns={tableColumns} results={searchResults} sortBy={sortColumn} menuCallback={menuHandler} />
					</table>
				</div>
			</div>
			<ModalPetloveDetails data={menuData} />
		</>
	);
}

PlansTable.defaultProps = {
	color: "light",
};

PlansTable.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
};
