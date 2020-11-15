import { Request, Response } from "express";

import jwt from "jwt-simple";
import { getRepository } from "typeorm";

import * as Yup from "yup";
import User from "../../models/User";

import bcrypt from "bcryptjs";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default {
  async create(request: Request, response: Response) {
    await schema.validate(request.body, {
      abortEarly: false,
    });

    const { email, password } = request.body;

    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail({
        email,
      });

      const isPassword = await bcrypt.compare(password, user.password);

      if (isPassword) {
        const key = process.env.JWT_HASH_KEY || "loginUser";
        const token = await jwt.encode(
          { id: user.id, name: user.name, email: user.email },
          key
        );

        return response
          .status(200)
          .json({ token, email, name: user.name, id: user.id });
      } else {
        throw new Error();
      }
    } catch (e) {
      return response
        .status(401)
        .json({ message: "Email or password invalid" });
    }
  },
};
