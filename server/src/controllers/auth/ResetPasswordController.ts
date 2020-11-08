import { Request, Response } from "express";
import ResetPasswordMail from "../../jobs/ResetPasswordMail";
import Queue from "../../lib/Queue";
import * as Yup from "yup";
import { getRepository } from "typeorm";
import User from "../../models/User";

import jwt from "jwt-simple";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export default {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    await schema.validate(request.body, {
      abortEarly: false,
    });

    const userRepository = getRepository(User);
    const user = await userRepository.find({ email });

    if (user && user.length > 0) {
      const resetData = {
        userId: user[0].id,
        timestamp: new Date().getTime(),
      };

      const key = process.env.JWT_HASH_KEY || "";
      const token = await jwt.encode(resetData, key);

      const resetLink = `${
        process.env.BASE_URL || "http://localhost:3000"
      }/reset-password/${token}`;

      await Queue.add(ResetPasswordMail.key, {
        name: user[0].name,
        email,
        resetLink,
      });
    }

    return response
      .status(200)
      .json({ message: "If the user exists, an e-mail will be sent" });
  },
};
