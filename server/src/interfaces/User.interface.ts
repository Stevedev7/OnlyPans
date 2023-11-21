import Auth from "./Auth.interface";

/**
 * @openapi
 *  components:
 *      schemas:
 *          RegistrationInput:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: johndoe@gmail.com
 *                  password:
 *                      type: string
 *                      example: password
 *                  firstName:
 *                      type: string
 *                      example: John
 *                  lastName:
 *                      type: string
 *                      example: Doe
 *              required:
 *                  - email
 *                  - password
 *                  - firstName
 *                  - middleName
 *                  - lastName
 *          RegistrationResponse:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      example: johndoe@gmail.com registered successfully.
 *          ProfileResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  emailId:
 *                      type: string
 *                      example: johndoe@gmail.com 
 *                  firstName:
 *                      type: string
 *                      example: John
 *                  lastName:
 *                      type: string
 *                      example: Doe
 */

export default interface User {
    id: number
    email: Auth['email'];
    password: Auth['password'];
    firstName: string;
    lastName: string;
    verified: boolean;
}