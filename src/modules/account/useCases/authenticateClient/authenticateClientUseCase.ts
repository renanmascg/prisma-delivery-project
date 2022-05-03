import { prisma } from "../../../../database/prismaClient";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {

    // validar a existencia do usuário
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error("Username or Password invalid!");
    }

    // validar a senha
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or Password invalid!");
    }

    // gerar o token
    const token = sign({ username }, "916b14d13276f1fb5eea8ff292fa28d8", {
      subject: client.id,
      expiresIn: '1d'
    });

    return token;
  }
}