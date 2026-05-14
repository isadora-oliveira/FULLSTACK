import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { Usuario } from "../entity/usuario";

const CHAVE_JWT = "chave-super-secreta-da-api-musicas";

export class LoginService {
  private repository: Repository<Usuario>;

  constructor(repository: Repository<Usuario>) {
    this.repository = repository;
  }

  async realizarLogin(email: string, senha: string): Promise<string> {
    // Validacao minima para evitar consulta desnecessaria no banco.
    if (!email || !senha) {
      throw { id: 400, msg: "Email e senha sao obrigatorios." };
    }

    const usuario = await this.repository.findOne({ where: { email } });

    if (!usuario || !usuario.senha) {
      throw { id: 401, msg: "Credenciais invalidas." };
    }

    // Compara senha digitada com hash salvo no banco.
    const senhaOk = await bcrypt.compare(senha, usuario.senha);

    if (!senhaOk) {
      throw { id: 401, msg: "Credenciais invalidas." };
    }

    // Gera token contendo dados basicos no payload.
    // subject recebe o id do usuario para identificar quem fez login.
    const token = jwt.sign(
      {
        email: usuario.email,
      },
      CHAVE_JWT,
      {
        subject: String(usuario.id),
        expiresIn: "1d",
      },
    );

    return token;
  }

  async validarToken(token: string): Promise<void> {
    let tokenLimpo = token;

    if (token.startsWith("Bearer ")) {
      tokenLimpo = token.replace("Bearer ", "");
    }

    try {
      // Se o token estiver invalido/expirado, jwt.verify ja lanca excecao.
      jwt.verify(tokenLimpo, CHAVE_JWT);
    } catch {
      throw { id: 401, msg: "Token invalido ou expirado." };
    }
  }
}
