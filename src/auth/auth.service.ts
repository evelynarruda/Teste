import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  getActiveUser: any;
  validate(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
    constructor(private usuarioService: UsuarioService,
     
    private jwtService: JwtService) {}


    async validarUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.findOne(email);
        if (usuario && bcrypt.compareSync(senha, usuario.password)) {
          const { password, ...result } = usuario;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.email, sub: user.id};
        
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
