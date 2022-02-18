import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { db } from "../../utils/db";
import { User } from "@prisma/client";

type Data = {
  message: string,
} | {
  user: User
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      if (!req.body.password || !req.body.username) {
        throw new Error('Missing email or password');
      }
  
      const passwordHash = await bcrypt.hash(req.body.password, 10);
  
      const result = await db.user.create({
        data: {
          username: req.body.username,
          passwordHash
        }
      });
  
      res.status(200).json({ user: result });
    } catch (e) {
      res.status(500).send({ message: (e as Error).message });
    }
  } else {
    res.status(404).send({ message: `Cannot ${req.method} /register`})
  }
}