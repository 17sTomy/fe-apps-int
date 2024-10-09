export class Customer {
  #id;
  #email;
  #firstname;
  #lastname;
  #streetNumber;
  #streetName;
  #complementaryAddress;
  #kycStatus;
  #isAdmin;

  constructor(customerInfo) {
    this.#id = customerInfo.id;
    this.#email = customerInfo.email;
    this.#firstname = customerInfo.firstname;
    this.#lastname = customerInfo.lastname;
    this.#streetNumber = customerInfo.streetNumber;
    this.#streetName = customerInfo.streetName;
    this.#complementaryAddress = customerInfo.complementaryAddress;
    this.#kycStatus = customerInfo.kycStatus;
    this.#isAdmin = customerInfo.isAdmin;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get firstname() {
    return this.#firstname;
  }

  get lastname() {
    return this.#lastname;
  }

  get streetNumber() {
    return this.#streetNumber;
  }

  get streetName() {
    return this.#streetName;
  }

  get complementaryAddress() {
    return this.#complementaryAddress;
  }

  get kycStatus() {
    return this.#kycStatus;
  }

  get isAdmin() {
    return this.#isAdmin;
  }

  // Additional Improvements
  get fullName() {
    return `${this.#firstname} ${this.#lastname}`;
  }

  get fullAddress() {
    return `${this.#streetNumber} ${this.#streetName}, ${this.#complementaryAddress || ''}`.trim();
  }
}
