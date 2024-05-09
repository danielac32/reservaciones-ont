import jwt from 'jsonwebtoken';


export const generateJwt = ( email: string ) => {

    return new Promise( (resolve, reject) => {
        const payload = { email };
        jwt.sign( payload, process.env.JWT_KEY!, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        });
    });
}

