import { baseUrl } from '../shared/baseUrl';

export const fetchCustomerData = async () => {
    try {
        let response = await fetch(baseUrl + 'users');
        let customers = await response.json();
        
        return customers;

    } catch(error) {
        throw error;
    }
}

export const fetchTransactionData = async () => {
    try {
        let response = await fetch(baseUrl + 'transactions');
        let transactions = await response.json();
        
        return transactions;

    } catch(error) {
        throw error;
    }
}
