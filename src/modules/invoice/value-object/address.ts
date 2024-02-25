export default class Address {
    _street: string = "";
    _number: string = "";
    _complement: string = "";
    _state: string = "";
    _city: string = "";
    _zipCode: string = "";

    constructor(street: string, number: string, complement: string, state: string, city: string, zip: string) {
      this._street = street;
      this._number = number;
      this._zipCode = zip;
      this._city = city;
      this._state = state;
      this._complement = complement;
    }
  
    get street(): string {
      return this._street;
    }
  
    get number(): string {
      return this._number;
    }
  
    get zipCode(): string {
      return this._zipCode;
    }
  
    get city(): string {
      return this._city;
    }

    get state(): string {
        return this._state;
    }

    get complement(): string {
        return this._complement;
    }
    
  }
  