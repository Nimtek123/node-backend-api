
describe('Pet Service API Tests', () => {
  const apiUrl = 'http://localhost:8000/api'; // Replace with your API URL
  const fs = require('fs');

  const filePath = './data/pets.json';
  const filePathTest = './data/test_pets.json';
  const petsCypress = './data/petsCypress.json';
  let petsLen = 0;
 
  it('should rest pets.json', () => {
    cy.readFile(filePath).then((fileContent) => {
      cy.log(' pets.json with:', fileContent);
    });

    // Read the contents of petsCypress.json using cy.fixture()
    cy.fixture(petsCypress).then((pets) => {
      let lastPet = pets[pets.length - 1];
      petsLen = lastPet.id + 1;
      // Ensure pets is an array (if not, adjust as needed)
      if (!Array.isArray(pets)) {
        throw new Error('Expected petsCypress.json to contain an array of pets.');
      }

      // Write pets array to filePath
      cy.writeFile(filePath, JSON.stringify(pets, null, 2)).then(() => {
        // Optional: Verify the contents of the written file
        cy.readFile(filePath).then((fileContent) => {
          cy.log('Updated pets.json with:', fileContent);
        });
      });
    });
  });
  
    //##############################################################################################
  it('should get all pets', () => {
    cy.request(`${apiUrl}/pets`)
      .its('status')
      .should('eq', 200);

    cy.request(`${apiUrl}/pets`)
      .its('body')
      .should('be.an', 'array');
  });

  //##############################################################################################
  it('should get a pet by id', () => {
  
    cy.request(`${apiUrl}/pets/1`)
      .its('status')
      .should('eq', 200);

    cy.request(`${apiUrl}/pets/1`)
      .its('body')
      .should('have.property', 'id', 1);
  });

    //##############################################################################################

  it('should create a new pet', () => {
    const newPet = {
      id: petsLen,
      name: 'Test',
      species: 'Lion',
      available: false,
      birthYear: 2024,
      dateAdded: '16-06-2024',
      photoUrl: 'https://i.imgur.com/wpfirW7.jpg'
    };

    cy.request('POST', `${apiUrl}/pets`, newPet)
      .its('status')
      .should('eq', 201);

    cy.request(`${apiUrl}/pets/${petsLen}`)
      .its('body')
      .should('include', newPet);
  });

    //##############################################################################################

  it('should update an existing pet', () => {
 
    const updatedPet = {
      name: "Buddy",
      species: "Cat",
      available: false,
      birthYear: 2012,
      dateAdded: "19-06-2021",
      photoUrl: "https://i.imgur.com/wpfirW7.jpg"
    };

    cy.request('PUT', `${apiUrl}/pets/3`, updatedPet)
      .its('status')
      .should('eq', 200);

    cy.request(`${apiUrl}/pets/3`)
      .its('body')
      .should('have.property', 'name', 'Buddy');
  });

    //##############################################################################################
    it('should rest pets.json', () => {
      // Read the contents of petsCypress.json using cy.fixture()
      cy.fixture(petsCypress).then((pets) => {
        // Ensure pets is an array (if not, adjust as needed)
        if (!Array.isArray(pets)) {
          throw new Error('Expected petsCypress.json to contain an array of pets.');
        }
  
        // Write pets array to filePath
        cy.writeFile(filePath, JSON.stringify(pets, null, 2)).then(() => {
          // Optional: Verify the contents of the written file
          cy.readFile(filePath).then((fileContent) => {
            cy.log('Updated pets.json with:', fileContent);
          });
        });
      });
    });

  it('should delete a pet', () => {
    cy.request('DELETE', `${apiUrl}/pets/10`)
      .its('status')
      .should('eq', 204);

    cy.request({
      url: `${apiUrl}/pets/10`,
      failOnStatusCode: false
    }).its('status').should('eq', 404);
  });

  it('should rest pets.json', () => {
    // Read the contents of petsCypress.json using cy.fixture()
    cy.fixture(petsCypress).then((pets) => {
      // Ensure pets is an array (if not, adjust as needed)
      if (!Array.isArray(pets)) {
        throw new Error('Expected petsCypress.json to contain an array of pets.');
      }

      // Write pets array to filePath
      cy.writeFile(filePath, JSON.stringify(pets, null, 2)).then(() => {
        // Optional: Verify the contents of the written file
        cy.readFile(filePath).then((fileContent) => {
          cy.log('Updated pets.json with:', fileContent);
        });
      });
    });
  });

});
