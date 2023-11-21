import ingredients from './ingredientData';
import allergens from './allergens';
import cuisines from './cuisine';
import diets from './diet';
import units from './units';
import users from './users';
import tags from './tags';

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';
 

const prisma = new PrismaClient();

async function main() {
    for(const ingredient of ingredients.ingredients){
        await prisma.ingredient.create({
            data: ingredient
        });
    }

    for(const allergen of allergens){
        await prisma.allergen.create({
            data: allergen
        });
    }

    for( const cuisine of cuisines){
        await prisma.cuisine.create({
            data: cuisine
        });
    }

    for(const diet of diets){
        await prisma.diet.create({
            data: diet
        });
    }

    for(const unit of units){
        await prisma.unit.create({
            data: unit
        });
    }

    for(const user of users){
        const { email, firstName, lastName, password } = user;
        const hash = await hashPassword(password) as string;
        await prisma.auth.create({
            data:   {
                email,
                password:hash
            }
        });
        await prisma.userProfile.create({
            data: {
                emailId: email,
                firstName,
                lastName,
            }
        });
    }

    for(const tag of tags){
        await prisma.tag.create({
            data: tag
        });
    }
}

main().catch(e => {console.log(e);process.exit(1);}).finally(() => prisma.$disconnect());