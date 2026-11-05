import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL!);
const db = client.db("booknook-app");

// Issuer/audience signed into every JWT by the jwt plugin.
// The backend (booknook-app-server) verifies against the same values:
// issuer = this app's origin, audience = its API origin. Keep them in sync
// with the .env files of BOTH projects (BETTER_AUTH_URL, JWT_AUDIENCE).
const jwtIssuer = new URL(process.env.BETTER_AUTH_URL!).origin;

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders:{
    google:{
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins:[
    jwt({
      jwt: {
        issuer: jwtIssuer,
        audience: process.env.JWT_AUDIENCE ?? jwtIssuer,
      },
    }),
  ],
  session:{
    cookieCache: {
      enabled: true,
      strategy:'jwt',
      maxAge: 7*24*60*60,
    }  
  },
  baseUrl:process.env.BETTER_AUTH_URL,
  secret:process.env.BETTER_AUTH_SECRET,
});