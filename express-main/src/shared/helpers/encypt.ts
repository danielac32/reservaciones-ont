import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export const encrypt = (text: string): string => {
    return bcrypt.hashSync(text, salt) 
};

export const decrypt = (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash);
};