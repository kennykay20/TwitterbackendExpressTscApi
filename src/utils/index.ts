const EMAIL_TOKEN_EXPIRATION_MINUTE = 10;
const EMAIL_TOKEN_EXPIRATION_HOUR = 24;
export enum tokenType {
  "EMAIL" = "EMAIL",
  "API_TOKEN" = "API_TOKEN"
}

export const expirationMinute = () => {
  return new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTE * 60 * 1000
  );
};

export const expirationHour = () => {
  return new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_HOUR * 60 * 60 * 1000
  );
};

export interface userDetails {
  email: string;
  fullName: string;
  username: string;
  imageUrl: string;
}
