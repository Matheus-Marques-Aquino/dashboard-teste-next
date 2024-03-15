import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdOpen } from "react-icons/io";

const CustomDisplayCell = ({ label, text, style }) => {
    let styleCss = { ...style };

    let {
        container: containerClass,
        label: labelClass,
        text: textClass,
        span: spanClass
    } = styleCss;
    
    containerClass = !containerClass ? "w-full h-fit" : containerClass;
    labelClass = !labelClass ? "font-bold text-[12px] text-left text-[#000]" : labelClass;
    textClass = !textClass ? "text-left text-[#000] h-[22px] text-[14px] flex" : textClass;
    spanClass = !spanClass ? "mt-auto h-min" : spanClass;    

    return (
        <div className={containerClass}>
            <div className={labelClass} > { label } </div>
            <div className={textClass} >
                <span className={spanClass}> { text } </span>
            </div>         
        </div>
    );
}

const CustomStatusBadge = ({ status }) => {
    let badgeColor = "";
    let badgeText = "";

    switch (status) {
        case "active":
            badgeColor = "text-[#4F7F40] bg-[#E4F7C8]";
            badgeText = "Ativo";
            break;
        case "suspend":
            badgeColor = "text-[#805B36] bg-[#FFD8B2]";
            badgeText = "Suspenso";
            break;
        case "paid":
            badgeColor = "text-[#4F7F40] bg-[#E4F7C8]";
            badgeText = "Pago";
            break;
        case "canceled":
            badgeColor = "text-[#C63737] bg-[#FFCDD2]";
            badgeText = "Cancelado";
            break;
        default:
            badgeColor = "text-[#805B36] bg-[#FFD8B2]";
            badgeText = "Indefinido";
            break;
    }

    return (
        <div className={"text-[10px] leading-[10px] py-[6px] px-[8px] rounded-lg ml-auto my-auto font-semibold" + badgeColor}>
            { badgeText }
        </div>
    )
};

const CustomPetCard = ({order_id, pet, plan, status}) => {
    return (
        <div className="w-fit h-min px-3 py-1 rounded-md bg-[#f9f9f9] shadow-sm border border-[#000000]/[0.04] cursor-pointer">
            <div className={`flex ${order_id ? 'w-[220px]' : 'w-[180px]'}`}>
                <div className="w-fit">
                    <div className={`text-[11px] ${order_id ? '' : 'hidden'}`}>{ order_id ? order_id : '' }</div>
                    <div className="">{ pet }</div>
                    <div className="text-[12px] font-normal">{ plan }</div>
                </div>                                            
                <CustomStatusBadge status={status} />                          
            </div>            
        </div>
    );
}

export default function ModalPetloveDetails({ data }) {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 m-auto w-full h-full bg-[#000000]/[.3] flex z-20" >
            <div className="absolute pb-[15px] top-0 left-0 bottom-0 right-0 w-[850px] h-fit m-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex w-full h-fit text-[15px] py-[8px] px-[15px] font-semibold text-left text-[#000] border-0 border-b-[1px]" >
                    <div className="">
                        Nome do Pet
                    </div>
                    <div className="h-[20px] w-[20px] my-auto ml-auto cursor-pointer" >
                        <IoClose className="w-full h-full" />
                    </div>
                </div>
                <div className="px-[10px] w-full max-h-[450px] overflow-y-scroll" >
                    <div className="px-[15px] pb-[10px] pt-[5px] bg-[#000000]/[.03] mt-3 rounded-[10px] shadow-sm border border-[1px] border-[#00000009]">
                        <div className="font-semibold text-[16px]">
                            Plano Petlove
                        </div>
                        
                        <div className="flex flex-row h-fit mt-[10px]" >
                            <div className="w-1/3">
                                <CustomDisplayCell label="Nome do Pet" text="Pet Teste"  />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Microchip" text="999999999975567" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="ID do Pet" text="7b87d669-9874-4135-ac2e-31ff6d3d3ff7" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-4" >
                            <div className="w-1/3">
                                <CustomDisplayCell label="Plano" text="Petlove Tranquilo" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Status" text="Ativo" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Valor do Plano" text="R$49,99" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-3" >
                            <div className="w-1/3">
                                <CustomDisplayCell label="Forma de Pagamento" text="Pagar.me - Assinatura Mensal" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Data de Contratação" text="18:43 - 27/12/2023" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Data de Cancelamento" text="01/02/2024" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5" >
                            <div className="w-1/3">
                                <CustomDisplayCell label="Nome do Responsável" text="Matheus Marques de Aquino" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="CPF do Responsável" text="461.716.198-84" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="ID do Responsável" text="c2fc0269-9366-4f96-b8ca-eb019d256a68" />
                            </div>
                        </div>                                             
                        <div className="flex flex-row w-full mt-5" >
                            <div className="w-full px-[8px] pt-[5px] pb-[10px] bg-white rounded-[5px] shadow-sm border border-[1px] border-[#00000010]">
                                <div className="h-fit leading-[16px] font-bold text-[12px] text-left text-[#000]" >
                                    Pets Associados ao Responsável
                                </div>
                                <div className="w-full text-[12px] mt-[10px] text-left flex flex-wrap justify-between  gap-x-2 gap-y-2 font-semibold " >
                                    <CustomPetCard order_id="ord_k4m8aRGu8uXKxRD9" pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />
                                    <CustomPetCard order_id="ord_k4m8aRGu8uXKxRD9" pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />
                                    <CustomPetCard order_id="ord_k4m8aRGu8uXKxRD9" pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />
                                    <CustomPetCard order_id="ord_k4m8aRGu8uXKxRD9" pet="Pet Teste" plan="Petlove Tranquilo" status="active" />                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-[15px] pb-[10px] pt-[5px] bg-[#000000]/[.03] mt-3 rounded-[10px] shadow-sm border border-[1px] border-[#00000009]">                        
                        <div className="font-semibold text-[16px]">
                            Assinatura Pagar.me
                        </div>
                        
                        <div className="flex flex-row w-full mt-3" >
                            <div className="w-1/3">
                                <CustomDisplayCell label="ID da Assinatura" text="sub_k4m8aRGu8uXKxRD9" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Data de Inicio" text="27/12/2023" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Próxima Fatura" text="27/02/2024" />
                            </div>
                        </div>
                        <div
                            className="flex flex-row w-full mt-3"
                        >
                            <div className="w-1/3">
                                <CustomDisplayCell label="Valor da Mensalidade" text="R$49,99" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Status da Assinatura" text="Ativa" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Recorrência" text="2 de 12 meses" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-3">
                            <div className="w-1/3">
                                <CustomDisplayCell label="Última Cobrança" text="27/01/2024" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Próxima Cobrança" text="27/02/2024" />
                            </div>
                            <div className="w-1/3">
                                <CustomDisplayCell label="Data de Cancelamento" text="01/02/2024" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5 border-b-[1px] pb-[10px] border-b-[#00000020]" >
                            <div className="w-full px-[8px] pt-[5px] pb-[10px] bg-white rounded-[5px] shadow-sm border border-[1px] border-[#00000010]">
                                <div className="h-fit leading-[16px] font-bold text-[12px] text-left text-[#000]" >
                                    Pets Associados à Assinatura
                                </div>
                                <div className="w-full text-[12px] mt-[10px] text-left flex flex-wrap gap-x-2 gap-y-2 font-semibold " >
                                    <CustomPetCard pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />
                                    <CustomPetCard pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />
                                    <CustomPetCard pet="Pet Teste" plan="Petlove Tranquilo" status="suspend" />                                 
                                </div>
                            </div>
                        </div>
                        <div className="font-semibold text-[14px] mt-[10px]">
                            Endereço de Cobraça
                        </div>
                        <div className="flex flex-row w-full mt-[5px]" >
                            <div className="w-1/4">
                                <CustomDisplayCell label="Logradouro" text="Rua Coronel Camisão" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Número" text="91" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Complemento" text="Casa" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Bairro" text="Oswaldo Cruz" />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-3 border-b-[1px] pb-[10px] border-b-[#00000020]" >
                            <div className="w-1/4">
                                <CustomDisplayCell label="Cidade" text="São Caetano do Sul" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Estado" text="São Paulo" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="CEP" text="09571-020" />
                            </div>
                        </div>
                        <div className="font-semibold text-[14px] mt-[10px]">
                            Forma de Pagamento
                        </div>
                        <div className="flex flex-row w-full mt-[5px]">
                            <div className="w-1/4">
                                <CustomDisplayCell label="Nome Impresso" text="Matheus M Aquino" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Número do Cartão" text="4000 00** **00 0010" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Validade do Cartão" text="02/2024" />
                            </div>
                            <div className="w-1/4">
                                <CustomDisplayCell label="Bandeira" text="Mastercard" />
                            </div>
                        </div>                        
                    </div>
                </div>

            </div>
        </div>     
    );

}