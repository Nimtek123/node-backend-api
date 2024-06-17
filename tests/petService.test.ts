///tests/petService.test.ts
import { PetService } from '../src/services/petService';
import { Pet } from '../src/models/pet';
import fs from 'fs';

const filePath = './data/pets.json';
const testJsonPath = './data/test_pets.json';

describe('PetService', () => {
    let petService: PetService;
    let pets = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fs.writeFileSync(testJsonPath, JSON.stringify(pets), { encoding: 'utf8', flag: 'w' });

    beforeEach(() => {
        petService = new PetService();
    });

    test('should get all pets', () => {
        const pets = petService.getAllPets();
        expect(pets).toBeDefined();
        expect(Array.isArray(pets)).toBe(true);
    });

    test('should get a pet by id', () => {
        const pet = petService.getPetById(1);
        expect(pet).toBeDefined();
        expect(pet?.id).toBe(1);
    });

    test('should create a new pet', () => {
        const newPet: Pet = {
            "id": 22,
            "name": "Test",
            "species": "Lion",
            "available": false,
            "birthYear": 2024,
            "dateAdded": "16-06-2024",
            "photoUrl": "https://i.imgur.com/wpfirW7.jpg"
        };
        const createdPet = petService.createPet(newPet);
        expect(createdPet).toEqual(newPet);
    });

    test('should update an existing pet', () => {
        const updatedPet = petService.updatePet(1, { name: 'Buddy' });
        expect(updatedPet).toBeDefined();
        expect(updatedPet?.name).toBe('Buddy');
    });

    test('should delete a pet', () => {
        const success = petService.deletePet(1);
        expect(success).toBe(true);
    });
});
