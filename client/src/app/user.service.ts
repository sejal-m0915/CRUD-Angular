import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:4356/user';

    async getUsers() { //get data GET
        const response = await axios.get(this.apiUrl);
        return response.data;
    }

    async addUser(user: any) { // add data POST
        const response = await axios.post(this.apiUrl, user);
        return response.data;
    }

    async deleteUser(id: string) { // delete data DELETE
        const response = await axios.delete(`${this.apiUrl}/${id}`);
        return response.data;
    }

    async editUser(id: string, user: any) { //update data PUT
        const response = await axios.put(`${this.apiUrl}/${id}`, user);
        return response.data;
    }
}
