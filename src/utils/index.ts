const EMAIL_TOKEN_EXPIRATION_MINUTE = 10;
export enum tokenType {
  "EMAIL" = "EMAIL",
  "API_TOKEN" = "API_TOKEN"
}

export const expirationTime = () => {
  return new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTE * 60 * 1000
  );
};

export interface userDetails {
  email: string,
  fullName: string,
  username: string,
  imageUrl: string,
}
