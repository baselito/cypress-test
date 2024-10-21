declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(username: string, password: string): Chainable<void>;
      loginWithSession(username: string, password: string): Chainable<void>;
      fetchRandomUser(): Chainable<RandomUser>;
    }
  }

  interface ProductDetails {
    title: string;
    price: string;
    description: string;
  }

  interface RandomUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
  }
}

export {};
