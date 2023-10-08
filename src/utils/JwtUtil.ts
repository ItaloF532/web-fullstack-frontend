import jwt_decode from "jwt-decode";

class JwtUtil {
  static decode<T>(token: string): T | undefined {
    return jwt_decode(token);
  }
}

export default JwtUtil;
