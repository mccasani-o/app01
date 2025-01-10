export interface Token {
    jwt: string;
    idUsuario: number;
    mfa: boolean;
  }
  
  export interface AuthResponse {
    fecha: string;
    statusCode: number;
    status: string;
    mensaje: string;
    data: {
      token: Token;
    };
  }
  