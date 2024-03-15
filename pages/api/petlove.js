import dotenv from 'dotenv';
import axios from 'axios';

import MongoConnection from '../../controllers/mongodb';

import {
	headersPetlove
} from '../../controllers/customHeaders';

import {
	waitBetweenRequest
} from '../../controllers/tools'; 

dotenv.config();

const environment = process.env.AMBIENTE.toUpperCase();

const baseURL = process.env['BACKEND_PUBLICA_' + environment];

const mongo = new MongoConnection();

export default async function handler (req, res) {
	var error = false;

	var response = {
		ok: false,
		petData: [],
		petProperty: []
	};

	try {
		var userId = mongo.generateUserId();

		var client = mongo.getClient(userId);

		if (!client){
			await mongo.connect(userId);
    	}

		const PlansCollection = await mongo.getCollection(userId, 'Plans', 'Petlove');
		const OrdersCollection = await mongo.getCollection(userId, 'Orders', 'Petlove');
	
		var plans = await PlansCollection.find({}).toArray();
		var orders = await OrdersCollection.find({}).toArray();
	
		await mongo.disconnect(userId);

		var customers_uuid = [];

		for (let i in plans) {
			let data = plans[i];
	  
			if (!data || !data.customer_uuid) {
				continue;
			}
	  
			if (!customers_uuid.includes(data.customer_uuid)) {
				customers_uuid.push(data.customer_uuid);
				continue;
			}
		}

		var objCollection = {
			pets: [],
		};

		for (let i in orders) {
			let order = orders[i];

			let {
				customer,
				address,
				payment,
				petlove,
				created_at
			} = order;

			let {
				method,
				type,
				status
			} = payment;

			let {
				region,
				plans,
			} = petlove;

			let objPet = {};

			for (let k in plans) {
				let plan = plans[k];

				delete address.id;

				objPet = {
					...plan,
					...region,
					name: plan.pet,
					customer: { ...customer },
					address: { ...address },				
					payment_method: method || '',
					payment_type: type || '',
					payment_status: status || '',
					customer_email: customer.email,
					customer_cpf: customer.cpf,
					created_at: created_at,
				};

				if ( payment && payment.order ) {
					objPet.payment_id = payment.order.id;
				}

				if ( payment && payment.subscription ) {
					objPet.payment_id = payment.subscription.id;
				}

				delete objPet.pet;

				objCollection.pets[objPet.id] = objPet;
			}
		}
	  
		var objResponse = {
			data: [],
			customer: [],
			pets: []
		};

		var objMerge = {
			pets: [],
			property: [],
		};

		var headers = headersPetlove();

		const customerDataLoop = async () => {
			if (customers_uuid.length == 0) {
				return;
			}

			const url = baseURL + '/petlove/dashboard/customer/' + customers_uuid[0];			

			customers_uuid.shift();

			await axios.get(url, headers)
				.then(async (response) => {
					let result = response.data;

					if (result && result.data && result.data.data) {
						result = result.data.data;

						objResponse.data.push(result);

						if (Array.isArray(result.pets)) {
							for (let i in result.pets) {
								let pet = result.pets[i];

								objResponse.pets.push({
									...pet,
									customer_uuid: result.id
								});

								let merge = {};

								if (objCollection.pets[pet.id]) {
									merge = {
										...objCollection.pets[pet.id],
										...pet,
										from: { db: true, api: true },
										signed: false
									};

									objMerge.pets.push(merge);
								} else {
									merge = {
										...pet,
										from: { db: false, api: true },
										signed: false
									};

									objMerge.pets.push(merge);
								}

								for (let key in merge) {
									if (!objMerge.property.includes(key)) {
										objMerge.property.push(key);
									}
								}
							}
						}

						delete result.pets;

						objResponse.customer.push(result);
					}
				})
				.catch(async (e) => {
					error = e;

					if (error && error.response) {
						error = error.response;
					}
	  
					if (error && error.data) {
						error = error.data;
					}
	  
					console.error('error-customer-request:', error);
			  });			
	  
			if (customers_uuid.length == 0) {
			  return;
			}
	  
			await waitBetweenRequest(600);
	  
			await customerDataLoop();
		}
	  
		await customerDataLoop();

		//let signedPets = [];

		//await axios.get(baseURL + '/petlove/dashboard/customer/pets', headers)
		//	.then(async (response) => {
		//		let petloveCustomers = response.data;

		//		if (petloveCustomers && petloveCustomers.data && petloveCustomers.data.data) {
		//			customers = [ ...petloveCustomers.data.data  ];

		//			for (let i in customers) {
		//				let customer = customers[i];

		//				if (customer && customer.pets && Array.isArray(customer.pets)) {
		//					for (let k in customer.pets) {
		//						let pet = customer.pets[k];

		//						if (pet && pet.id) {
		//							signedPets.push(pet.id);
		//						}
		//					}
		//				}
		//			}
		//		}
		//	})
		//	.catch(async (e) => {

		//	});
		
		console.log(objMerge.pets.length, objResponse.pets.length, objMerge.property);

		response = {
			ok: true,
			//customers,
			petData: [...objMerge.pets],
			petProperty: [...objMerge.property]
		};

	} catch(e) {
		console.error('Request Error:', e);
	}

	res.status(200).json(response);
}
