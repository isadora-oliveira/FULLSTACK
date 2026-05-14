import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { Usuario } from "../entity/usuario";

export class UsuarioService {
  private repository: Repository<Usuario>;

  constructor(repository: Repository<Usuario>) {
    this.repository = repository;
  }

  async inserir(usuario: Usuario): Promise<Usuario> {
    if (!usuario || !usuario.email || !usuario.senha) {
      throw { id: 400, msg: "Email e senha sao obrigatorios." };
    }

    const usuarioExistente = await this.repository.findOne({
      where: { email: usuario.email },
    });

    if (usuarioExistente) {
      throw { id: 409, msg: "Ja existe usuario com esse email." };
    }

    // Hash simples da senha para nao salvar texto puro no banco.
    usuario.senha = await bcrypt.hash(usuario.senha, 8);
    return await this.repository.save(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return await this.repository.find({
      select: ["id", "email"],
    });
  }
}
