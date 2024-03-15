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
	'created_at': 'Adicionado Em',
    'customer_cpf': 'CPF',
    'customer_email': 'Email',
	'payment_id': 'ID Pagar.me'
};

const valueLabels = {
	'active': 'Assinatura Ativa',
	'paid': 'Assinatura Ativa',
	'monthly': 'Mensal',
	'annual': 'Anual',
	'credit_card': 'Cartão de Crédito',
	'pix': 'Pix'
}

const searchFields = [
	'name',
	'id',
	'guardian',
	'customer_uuid',
	'customer_cpf',
	'customer_email'
];

const serchFieldsFuse = [
	{
		name: 'name',
		weight: 0.6
	},
	{
		name: 'id', 
		weight: 0.6
	},
	{
		name: 'guardian', 
		weight: 0.8
	},
	{
		name: 'customer_uuid', 
		weight: 0.8
	},
	{
		name: 'customer_cpf',
		weight: 0.8
	},
	{
		name: 'customer_email', 
		weight: 0.8
	}
];

const selectFields = [
	'status',
	'plan',
	'city',
	'payment_method',
	'payment_type',
	'payment_status'
];

function translateLabel (input) {
    if (!input || typeof input !== 'string') {
        return '';
    }

    if (!labels[input]) {
        return '';
    }

    return labels[input];
}

function getSearchFields () {
	return searchFields;
}

function getSearchFieldsFuse () {
	return serchFieldsFuse;
}

function getSelectFields () {
	return selectFields;
}

function translateSelectLabel (input) {
	if (!input) {
		return '---';
	}

	if (!valueLabels[input]) {
		return input.toString();
	}

	return valueLabels[input];
}

function getSelectFieldsValue (results) {
	let values = [];

	if (!Array.isArray(results)) {
		return [];
	}

	for (let i in results) {
		let result = results[i];

		if (!result) {
			continue;
		}

		for (let k in selectFields) {
			let field = selectFields[k];			

			let value = result[field];			

			if (!values[field]) {
				values[field] = [];
			}

			if (value == 'paid') {
				value = 'active';
			}

			if (!value || values[field].includes(value)) {
				continue;
			}

			values[field].push(value);
		}
	}

	return values;
}

module.exports = { 
    translateLabel,
	getSearchFields,
	getSelectFields,
	getSearchFieldsFuse,
	translateSelectLabel,
	getSelectFieldsValue
};