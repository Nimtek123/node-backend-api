///models/pet.ts
export interface Pet {
    id: number;
    name: string;
    species: string;
    available: boolean;
    birthYear: number;
    dateAdded: string;
    photoUrl: string;
}
