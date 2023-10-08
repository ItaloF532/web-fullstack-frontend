import jwt_decode from "jwt-decode";

export type UserDTO = {
  user: {
    id: string;
    username: string;
  };
};

class JwtUtil {
  static decode(token: string): UserDTO | undefined {
    return jwt_decode(token);
  }
}

export default JwtUtil;
