
import { NextApiRequest, NextApiResponse } from "next";
import { crime, criminal, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function firReport(
  req: NextApiRequest,
  res: NextApiResponse
){

  const {id} = req.query as {
    id: string
  };

  const fir = await prisma.fir.findUnique({where: {id}});

  if (fir != null) {
    const crime = (await prisma.crime.findMany({where: {fir_id: id}}) as crime[])[0];
    const criminalIds = await prisma.crime_commited.findMany({where: {crn_id: crime.id}});
    // let [];

    const criminalsPro = criminalIds.map(async (val) => 
      await prisma.criminal.findUnique({where: {id: val.criminal_id}}) as criminal
    );
    Promise.all(criminalsPro)
      .then((criminals) => {
        res.status(200);
        res.json(
          {
            fir,
            crime,
            criminals
          }
        );
      });
  }else {
    res.status(405);
    res.json(
      {
        error: "couldn't find the fir with id " + id
      }
    );
  }
}
