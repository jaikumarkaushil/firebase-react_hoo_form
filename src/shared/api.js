import axios from 'axios';

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
