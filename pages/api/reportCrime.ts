
import { NextApiRequest, NextApiResponse } from "next";
import { police_station, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function reportCrime(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }
  console.log("recived the post request")
  const body = req.body as {
    witness_name: "",
    witness_pho: "",
    area_code: "",
    summary: "",
    location: "",
    typeOfCrime: ""
  };
  console.log(body);

  if (
    body.witness_name.trim().length == 0 ||
    body.witness_pho.trim().length == 0 ||
    body.area_code.trim().length == 0 ||
    body.summary.trim().length == 0 ||
    body.location.trim().length == 0 ||
    body.typeOfCrime.trim().length == 0
  ) {
    res.status(405).send({ message: 'the body is not proper' })
    return;
  }

  const pst = (await prisma.$queryRaw`
    SELECT *
    FROM police_station
    where id = ${body.area_code}
  `) as police_station[];

  if (pst.length == 0) {
    res.status(405).send({ message: `the police station with id '${body.area_code}' dosent exist`});
    return;
  }

  let {count} = ((await prisma.$queryRaw`
    SELECT count(*) as count
    from fir
  `) as {count: number}[])[0];

  console.log(count);

  const newFir = (await prisma.fir.create({
    data: {
      id: "f00" + (count + 1),
      witness_name: body.witness_name.toLowerCase(),
      witness_pho: body.witness_pho,
      summary: body.summary.toLowerCase(),
      area_code: body.area_code
    }
  }));

  count = ((await prisma.$queryRaw`
    SELECT count(*) as count
    from crime
  `) as {count: number}[])[0].count;

  const newCr = (await prisma.crime.create({
    data: {
      id : "cr00" + (count + 1),
      location: body.location,
      type_of_crime: body.typeOfCrime,
      fir_id: newFir.id
    }
  }));

  res.status(200).send({
    crime: newCr,
    fir: newFir
  });
}
