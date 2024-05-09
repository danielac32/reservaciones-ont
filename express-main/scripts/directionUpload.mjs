

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();
import path from 'path';

const filePath = new URL('./direcciones.txt', import.meta.url).pathname;


fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  const lines = data.split('\n');

  for (const line of lines) {
    try {
      await prisma.direction.create({
        data: {
          address: line,
        },
      });
      console.log(`Línea "${line}" guardada correctamente.`);
    } catch (error) {
      console.error(`Error al guardar la línea "${line}":`, error);
    }
  }

  await prisma.$disconnect();
});