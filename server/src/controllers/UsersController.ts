import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";

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

    await userRepository.save(user);

    return response.status(200).json(UsersView.render(user));
  },
};
