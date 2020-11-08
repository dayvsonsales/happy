import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

import jwt from "jwt-simple";

import UsersView from "../views/users_view";

import * as Yup from "yup";

const validator = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default {
  async index(_: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.status(200).json(UsersView.renderMany(users));
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User);

    await validator.validate(request.body, {
      abortEarly: false,
    });

    const user = userRepository.create({
      name,
      email,
      password,
    });

    try {
      await userRepository.save(user);
    } catch (e) {
      if (e.code === "SQLITE_CONSTRAINT") {
        return response.status(400).json({ message: "User already exists" });
      }

      return response.status(400).json({ message: "Cannot create user" });
    }

    return response.status(200).json(UsersView.render(user));
  },

  async update(request: Request, response: Response) {
    const { token } = request.params;

    const key = process.env.JWT_HASH_KEY || "";

    try {
      const { userId: id, timestamp } = await jwt.decode(token, key);

      /**
       * Comparing token's created time with currents time.
       * If the difference is bigger than 2 hours then token is invalid
       **/
      if ((new Date().getTime() - timestamp) / 60000 > 120) {
        throw new Error();
      }

      const { password } = request.body;

      const userRepository = getRepository(User);

      const passwordValidator = Yup.object().shape({
        password: Yup.string().required(),
      });

      await passwordValidator.validate(request.body, {
        abortEarly: false,
      });

      const newUser = await userRepository.findOne(id);

      if (newUser) {
        newUser.password = password;
        newUser.updatePassword = true;

        const savedUser = await userRepository.save(newUser);

        return response.status(200).json(UsersView.render(savedUser));
      } else {
        return response.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      console.log(e);
      return response
        .status(400)
        .json({ message: "You can't reset password." });
    }
  },
};
