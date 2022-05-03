import { prisma } from "../../../../database/prismaClient";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {

    // validar a existencia do usuário
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliveryman) {
      throw new Error("Username or Password invalid!");
    }

    // validar a senha
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or Password invalid!");
    }

    // gerar o token
    const token = sign({ username }, "916b14d13276f1fb5ffa8ff292fa28d8", {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return token;
  }
}