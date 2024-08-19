import { FastifyRequest } from "fastify";

type JwtClaim = {
  id: string;
  email: string;
}

export function claimToken(request: FastifyRequest) {
  const claims = request.user as JwtClaim;
  return claims;
}
