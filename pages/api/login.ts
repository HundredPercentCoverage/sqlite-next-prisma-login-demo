import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { sessionOptions } from '../../lib/session';
import { db } from '../../utils/db';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        throw new Error ('Missing username or password');
      }
  
      const user = await db.user.findUnique({
        where: { username }
      });
  
      if (!user) {
        throw new Error('No such user');
      }

      const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isCorrectPassword) {
        throw new Error('Incorrect password');
      }

      req.session.user = user;

      await req.session.save();
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ message: (e as Error).message });
    }
  } else {
    res.status(400).json({ message: `Cannot ${req.method} /login` });
  }
}