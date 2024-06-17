///services/petService.ts
import fs from 'fs';
import { Pet } from '../models/pet';

const filePath = './data/pets.json';
const testJsonPath = './data/test_pets.json';

export class PetService {
    private pets: Pet[];

    constructor() {
        this.pets = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        //lets use test file for testing
        if(process.env.NODE_ENV === 'testing'){
            this.pets = JSON.parse(fs.readFileSync(testJsonPath, 'utf8'));
        }
    }

    getAllPets(): Pet[] {
        return this.pets;
    }

    getPetById(id: number): Pet | undefined {
        return this.pets.find(pet => pet.id === id);
    }

    createPet(pet: Pet): Pet {
        this.pets.push(pet);
        this.saveToFile();
        return pet;
    }

    updatePet(id: number, petData: Partial<Pet>): Pet | undefined {
        const pet = this.getPetById(id);
        if (pet) {
            Object.assign(pet, petData);
            this.saveToFile();
        }
        return pet;
    }

    deletePet(id: number): boolean {
        this.pets = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(this.pets)

        const index = this.pets.findIndex(pet => pet.id === id);
        if (index !== -1) {
            this.pets.splice(index, 1);
            this.saveToFile();
            return true;
        }
        return false;
    }

    private saveToFile() {
        if(process.env.NODE_ENV === 'testing'){
            fs.writeFileSync(testJsonPath, JSON.stringify(this.pets, null, 2));
        }else{
            fs.writeFileSync(filePath, JSON.stringify(this.pets, null, 2));
        }
    }
}
