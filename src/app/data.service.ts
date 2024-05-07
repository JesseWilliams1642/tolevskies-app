import { Injectable } from '@angular/core';

@Injectable({

    providedIn: 'root'

})

export class DataService {

    private data : any;

    constructor() {

        this.data = [];

    }

    setData(id : number, data : any) {

        this.data[id] = data;

    }

    getData(id : any) {

        return this.data[id];

    }

}

