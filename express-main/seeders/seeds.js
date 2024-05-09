"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const salt = bcryptjs_1.default.genSaltSync(10);
const encrypt = (text) => {
    return bcryptjs_1.default.hashSync(text, salt);
};
const decrypt = (text, hash) => {
    return bcryptjs_1.default.compareSync(text, hash);
};
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.userEntity.create({
            data: {
                name: 'daniel quintero',
                email: 'danielquinteroac32@gmail.com',
                password: encrypt('123456'),
                rol: 'ADMIN',
                direction: {
                    create: {
                        address: 'DGTIC'
                    }
                }
            }
        });
        yield prisma.salon.create({
            data: { name: 'Simon bolivar' }
        });
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
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
