
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function crime(
  req: NextApiRequest,
  res: NextApiResponse
){
  res.status(200);
  res.json(
    await prisma.crime.findMany()
  );
}
