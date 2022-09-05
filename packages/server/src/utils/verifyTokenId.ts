import { OAuth2Client, TokenPayload } from "google-auth-library";

export const verifyIdToken = async (tokenId: string): Promise<TokenPayload | undefined> => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return payload;
  } catch (error: any) {
    return error;
  }
};
