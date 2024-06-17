///routes/petRoutes.ts
import { Router } from 'express';
import { getPets, getPetById, createPet, updatePet, deletePet } from '../controllers/petController';
import { validateCreatePet, validateUpdatePet, validateExisting } from '../utils/validation';


const router = Router();

router.get('/pets', getPets);

router.post('/pets', validateCreatePet, validateExisting, createPet, (req, res) => {
  
});

router.get('/pets/:id', getPetById);

router.put('/pets/:id', validateUpdatePet, updatePet, (req, res) => {
    
});

router.delete('/pets/:id', deletePet);

export default router;
