import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    req.session.destroy();
    res.json({ ok: true });
  } else {
    res.status(400).json({ message: `Cannot ${req.method} /logout` });
  }
}