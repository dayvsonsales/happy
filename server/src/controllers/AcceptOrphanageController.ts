import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

import orphanagesView from "../views/orphanages_view";

export default {
  async create(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ["images"],
    });

    if (!orphanage) {
      return response.status(404).json({ message: "Not Found" });
    }

    orphanage.pending = false;

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanagesView.render(orphanage));
  },
};
