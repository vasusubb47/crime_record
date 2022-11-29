
import { NextApiRequest, NextApiResponse } from "next";
import { crime, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function addCrime(
  req: NextApiRequest,
  res: NextApiResponse
){
  res.status(405).send({
    message: 'This rout is closed'
  });
  return;
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }
  console.log("recived the post request")
  const body = req.body;
  console.log(body);

  if (
    body.location.length == 0 ||
    body.type_of_crime.length == 0 ||
    body.date_of_crime.length == 0 ||
    body.fir_id.length  == 0
  ) {
    res.status(405).send({ message: 'the body is not proper' })
    return;
  }

  const fir = await prisma.fir.findUnique({
    where: {
      id: body.fir_id
    }
  });

  if (fir) {
    const cr = (await prisma.$queryRaw`
      SELECT * FROM crime WHERE fir_id = ${body.fir_id}
    `) as crime[];

    if (cr.length > 0) {
      res.status(405).send({ message: 'the fir id is allready in use, create a new fir' });
      return;
    }

    const newCr = await  prisma.crime.create({
      data: {
        id: "",
        location: body.location,
        type_of_crime: body.type_of_crime,
        date_of_crime: body.date_of_crime,
        fir_id: body.fir_id
      }
    })

    console.log(cr);

    console.log(fir);
    res.status(200).json({
      hello: "world"
    });
    return;
  }else {
    res.status(405).send({ message: 'the fir id is not avaliable' });
    return;
  }
}
