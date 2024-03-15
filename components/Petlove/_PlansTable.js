import React from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "../Dropdowns/TableDropdown";

import { LuArrowUpDown } from "react-icons/lu";
{/*<LuArrowUpDown className="my-auto" />*/}

import { FaArrowDownShortWide } from "react-icons/fa6";
{/* <FaArrowDownShortWide /> */ }

import { FaArrowUpWideShort } from "react-icons/fa6";
{/* <FaArrowUpWideShort /> */ }

import { BsThreeDotsVertical } from "react-icons/bs";

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

const defaultColumns = [
	'id',
	'name',
	'plan',
	'status',
	'customer_uuid',
	'guardian',
	'created_at'
];

export default function PlansTable({ results, columns, sortBy }) {

	return (
		<>
			<div
				className={
					"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
					"bg-white"
				}
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
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
						432 Selecionados
					</div>
					<div className="ml-auto pb-2 pr-3">
						432 Resultados
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					<table className="items-center w-full bg-transparent border-collapse">
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
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">ID do Pet</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">Nome do Pet</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">Plano</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">Status Petlove</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">ID do Responsável</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">Responsável</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
								<th
									className={
										"px-2 align-middle border border-solid py-3 text-[11px] uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center cursor-pointer " +
										"bg-blueGray-50 text-blueGray-500 border-blueGray-100"
									}
								>
									<div className="flex mx-auto w-fit">
										<div className="my-auto mr-2">Cadastrado Em</div>
										<LuArrowUpDown className="my-auto" />
									</div>
								</th>
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
						<tbody>
							<tr>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="flex w-full h-full pl-2">
										<input
											type="checkbox"
											name="select-0"
											id="select-0"
											className="m-auto"
										/>										
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="max-w-[130px]">
										d990510c-53f6-48f5-a326-d3f8f34e2fae
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="max-w-[160px]">
										Pandora
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									Petlove Tranquilo
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									Ativo
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="max-w-[130px]">
										c2fc0269-9366-4f96-b8ca-eb019d256a68
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="max-w-[160px]">
										Matheus Marques de Aquino
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<div className="max-w-[160px]">
										11/12/2023<br/>16:39:00
									</div>
								</td>
								<td className="border-t-0 align-middle border-l-0 border-r-0 text-xs p-4 px-2 text-center">
									<BsThreeDotsVertical
										className="m-auto cursor-pointer text-xl" 
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

PlansTable.defaultProps = {
	color: "light",
};

PlansTable.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
};
