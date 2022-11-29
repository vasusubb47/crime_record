
import { NextApiRequest, NextApiResponse } from "next";
import { police_station, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AddPoliceSt(
  req: NextApiRequest,
  res: NextApiResponse
){
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  }
  console.log("recived the post request")
  const body = req.body;
  console.log(body);

  if (
    body.name.length == 0 ||
    body.address.length == 0
  ) {
    res.status(405).send({ message: 'the body is not proper' })
    return;
  }

  const pst = (await prisma.$queryRaw`
    SELECT * 
    FROM police_station 
    WHERE name = ${body.name}
  `) as police_station[];

  console.log(pst);

  if (pst.length > 0) {
    res.status(405).send({
      message: `The police station named '${pst[0].name}' allready available with id ${pst[0].id}`
    });
    return;
  }

  const {count} = ((await prisma.$queryRaw`
    SELECT count(*) as count
    from police_station
  `) as {count: number}[])[0];

  console.log(count);

  const newPst = (await prisma.police_station.create({
    data: {
      id: "p00" + (count + 1),
      name: body.name.toLowerCase(),
      address: body.address.toLowerCase()
    }
  }));

  res.status(200);
  res.json(newPst);
}
