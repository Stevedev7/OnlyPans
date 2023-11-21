import db from '../utils/db';
export const createReview = async (data: any, recipeId: any, userId: number) => {
    return await db.review.create({
        data: {
            ...data,
            recipe: {
                connect: {
                    id: recipeId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
};

export const findReviewByUserAndRecipe = async (recipe: any, user: number) => {

    return await db.review.findFirst({
        where: {
            recipe: {
                id: recipe
            },
            user: {
                id: user
            }
        }
    });

};

export const deleteReviewById = async(id: number) => {

    return await db.review.delete({
        where: {
            id
        }
    });

};

export const findReviewById = async (id: number) => {

    return await db.review.findUnique({
        where:{
            id
        }
    });

};

export const findReviewsByRecipeId = async(id: number, limit: number, skip: number) => {

    const count = await db.review.count({
        where: {
            recipe: {
                id
            }
        }
    });
    return db.review.findMany({
        where: {
            recipe: {
                id
            }
        },
        include: {
            user: {
                select: {
                    emailId: true,
                    firstName :true,
                    lastName: true
                }
            }
        },
        orderBy:[
            { createdAt: 'desc' }
        ],
        skip,
        take :limit
    }).then(result => ({ result, count }));
};
export default {
    createReview,
    findReviewByUserAndRecipe,
    findReviewById
};