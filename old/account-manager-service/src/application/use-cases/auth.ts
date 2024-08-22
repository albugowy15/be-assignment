import { Session } from "@supabase/supabase-js";
import {
  AuthLoginReq,
  AuthRegisterReq,
  RegisterRes,
} from "../../presentation/schemas/auth";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { AppError } from "../../utils/error";

class AuthUseCase {
  private authClient: SupabaseAuthClient;
  constructor(authClient: SupabaseAuthClient) {
    this.authClient = authClient;
  }

  public async login(req: AuthLoginReq): Promise<Session> {
    const { data, error } = await this.authClient.signInWithPassword({
      email: req.email,
      password: req.password,
    });
    if (error) {
      throw new AppError(403, error.message);
    }
    return data.session;
  }

  public async registerUser(req: AuthRegisterReq): Promise<RegisterRes> {
    const { data, error } = await this.authClient.signUp({
      email: req.email,
      password: req.password,
    });
    if (error) {
      throw new AppError(403, error.message);
    }
    return {
      id: data.user?.id ?? "",
      email: data.user?.email ?? "",
    };
  }

  public async getUser(jwt?: string) {
    const { data, error } = await this.authClient.getUser(jwt);
    if (error) {
      throw new AppError(403, error.message);
    }
    return data.user;
  }

  public async getUid() {
    const session = await this.authClient.getSession();
    if (session.error) {
      throw new AppError(403, session.error.message);
    }
    const uid = session.data.session?.user.id;
    if (uid === null || uid === undefined) {
      throw new AppError(403, "user id not found");
    }
    return uid;
  }
}

export default AuthUseCase;
