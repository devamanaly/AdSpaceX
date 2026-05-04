import bcrypt from "bcrypt";

const saltRounds = 10;

 export const hashPassword = async (password:string) => {
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
};