import api from "@/lib/utils/api";
import db from "@/services/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // const user = await api
        //   .post("/auth/login", {
        //     email: credentials.email,
        //     password: credentials.password,
        //   })
        //   .then((response) => response.data)
        //   .catch((error) => error.response.data);

        // if (user && user.accessToken && user.user) {
        //   return user;
        // }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user?.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, username: user.username };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}${url}`;
    },
    // async redirect({ url, baseUrl }) {
    //   // Jika URL adalah URL relatif, tambahkan baseUrl
    //   if (url.startsWith("/")) {
    //     return `${baseUrl}${url}`;
    //   }
    //   // Jika URL adalah URL absolut yang dimulai dengan baseUrl, gunakan itu
    //   else if (url.startsWith(baseUrl)) {
    //     return url;
    //   }
    //   // Dalam kasus lain, kembalikan ke baseUrl
    //   return baseUrl;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.token = token as JWT;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
});

export { handler as GET, handler as POST };
