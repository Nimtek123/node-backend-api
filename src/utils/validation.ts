import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import fs from 'fs';


const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
// Define the schema
const createPetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  species: Joi.string().required(),
  available: Joi.boolean().required(),
  birthYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  dateAdded: Joi.string().pattern(dateRegex).required(),
  photoUrl: Joi.string().uri().required()
}).unknown(true); // Allow extra fields

// Schema for updating an existing pet
const updatePetSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  available: Joi.boolean().required(),
  birthYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  dateAdded: Joi.string().pattern(dateRegex).required(),
  photoUrl: Joi.string().uri().required()
}).unknown(true); // Allow extra fields

// Middleware to validate the request body
export const validateCreatePet = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createPetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check for duplicate ID
  const petsFilePath = './data/pets.json';
  const petsData = JSON.parse(fs.readFileSync(petsFilePath, { encoding: 'utf8', flag: 'r' }));

  //if all data is valid then proceed to save
  next();
};

// Middleware to validate the request body for updating an existing pet
export const validateUpdatePet = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updatePetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// Middleware to validate if duplicate ID
export const validateExisting = (req: Request, res: Response, next: NextFunction) => {
  // Check for duplicate ID
  const petsFilePath = './data/pets.json';
  const petsData = JSON.parse(fs.readFileSync(petsFilePath, { encoding: 'utf8', flag: 'r' }));
  
  const existingPet = petsData.find((pet: any) => pet.id === req.body.id);
  if (existingPet) {
    return res.status(400).json({ error: 'A pet with the given ID already exists.' });
  }
  //if all data is valid then proceed to save
  next();
};
