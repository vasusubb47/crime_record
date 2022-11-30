
import { NextApiRequest, NextApiResponse } from "next";
import { crime, criminal, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function linkCrime(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }
  console.log("recived the post request")
  const body = req.body as {
    crimeId: string,
    criminalIds: string[]
  };
  console.log(body);

  if (
    body.crimeId.length == 0 ||
    body.criminalIds.length == 0 ||
    body.criminalIds
      .map((val) => val.length == 0)
      .includes(true)
  ) {
    res.status(405).send({ message: 'the body is not proper' })
    return;
  }

  const cr = (await prisma.$queryRaw`
    SELECT * FROM crime
    WHERE id = ${body.crimeId}
  `) as crime[];

  if (cr.length == 0) {
    res.status(405).send({ message: `the crime ${body.crimeId} dosent exist` })
    return;
  }

  console.log(cr);

  let crms: criminal[] = [];
  let err: string[] = []

  for (let i = 0; i < body.criminalIds.length; i++) {
    const cri = ((await prisma.$queryRaw`
      SELECT * FROM criminal
      WHERE id = ${body.criminalIds[i]}
    `) as criminal[]);
    if (cri.length == 0) {
      err.push(body.criminalIds[i])
    }else {
      crms.push(cri[0]);
    }
  }
  
  crms.forEach(async (crmi, i) => {
    await prisma.crime_commited.create({
      data: {
        crn_id: cr[0].id,
        criminal_id: crmi.id
      }
    });
  });

  res.status(200).send({
    crime: cr,
    criminals: crms,
    error: err
  });

};