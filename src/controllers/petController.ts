// /controllers/petController.ts
import { Request, Response } from 'express';
import { PetService } from '../services/petService';

const petService = new PetService();

export const getPets = (req: Request, res: Response) => {
    res.json(petService.getAllPets());
};

export const getPetById = (req: Request, res: Response) => {
    const pet = petService.getPetById(Number(req.params.id));
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
};

export const createPet = (req: Request, res: Response) => {
    const newPet = req.body;
    const pet = petService.createPet(newPet);
    res.status(201).json({message: 'Pet created successfully', ...pet});
};

export const updatePet = (req: Request, res: Response) => {
    const updatedPet = petService.updatePet(Number(req.params.id), req.body);
    if (updatedPet) {
        console.log(updatedPet)
        res.json({message: 'Pet update successfully', ...updatedPet});
    } else {
        res.status(404).send('Pet not found');
    }
};

export const deletePet = (req: Request, res: Response) => {
    const success = petService.deletePet(Number(req.params.id));
    if (success) {
        res.status(204).json({status: "success"});
    } else {
        res.status(404).send('Pet not found');
    }
};
