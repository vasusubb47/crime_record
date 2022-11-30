
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function addCriminal(
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
    body.address.length == 0 ||
    body.phoneNo.length == 0
  ) {
    res.status(405).send({ message: 'the body is not proper' })
    return;
  }

  const crd = await prisma.criminal.findMany({
    where: {
      name: body.name
    }
  });

  if (crd.length > 0) {
    res.status(405).send({ message: `The criminal ${crd[0].name} allready exist with id ${crd[0].id} ` });
    return;
  }

  const newCr = await prisma.criminal.create({
    data: {
      id: "c00" + ((await prisma.criminal.findMany()).length + 1),
      name: body.name,
      address: body.address,
      phone_number: body.phoneNo 
    }
  });

  res.status(200);
  res.json(
    newCr
  );
}
