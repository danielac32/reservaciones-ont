import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const encrypt = (text: string): string => {
    return bcrypt.hashSync(text, salt) 
};

const decrypt = (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash);
};


const prisma = new PrismaClient();

async function main() {
  await prisma.userEntity.create({
    data:
      {
        name: 'daniel quintero',
        email: 'danielquinteroac32@gmail.com',
        password: encrypt('123456'),
        rol:'ADMIN',
        direction: {
          create: {
            address: 'DGTIC'
          }
        }
      }
  });

  /*await prisma.salon.create({
    data:
      { name: 'Simon bolivar' }
  });*/

 /*
    const valoresAdicionales = [
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 1', requerimiento: 'Requerimiento adicional 1' },
        { descripcion: 'Descripción adicional 2', requerimiento: 'Requerimiento adicional 2' },
        { descripcion: 'Descripción adicional 3', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 4', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 5', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 6', requerimiento: 'Requerimiento adicional 3' },
        { descripcion: 'Descripción adicional 7', requerimiento: 'Requerimiento adicional 3' },
    ];
    let count=0;


    for (const valor of valoresAdicionales) {
        await prisma.reservation.create({
            data: {
                startDate: new Date(),
                endDate: new Date(),
                requerimiento: valor.requerimiento,
                cantidad_persona: 5,
                descripcion: valor.descripcion,
                state: 'PENDING',
                userId: 3, // ID del usuario asociado
                salonId: 1 // ID del salón asociado
            }
        });
        count = count +1
    }
*/
console.log("usuario creado")
}

main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});