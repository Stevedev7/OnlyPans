/**
 * @openapi
 *  components:
 *      schemas:
 *          LoginInput:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      example: johndoe@gmail.com
 *                  password:
 *                      type: string
 *                      example: password
 *              required:
 *                  - email
 *                  - password
 *          AuthResponse:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImVtYWlsSWQiOiJqb2huZG9lQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJtaWRkbGVOYW1lIjoiSGFycnkiLCJsYXN0TmFtZSI6IkRvZSIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNjg4OTEyMDg5fQ.mGUHlK07SjlEukqsdkqktcgnsdQ4RqoRilnG70OIfKg
 */

export default interface Auth {
    email: string;
    password: string;
};