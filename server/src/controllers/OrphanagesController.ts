import { Request, Response } from "express";
import { getManager, getRepository, Transaction } from "typeorm";
import * as Yup from "yup";

import orphanagesView from "../views/orphanages_view";
import Orphanage from "../models/Orphanage";
import Image from "../models/Image";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const { pending } = request.query;

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
      where: {
        pending: pending === "true",
      },
    });

    return response.json(orphanagesView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    try {
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ["images"],
      });

      return response.json(orphanagesView.render(orphanage));
    } catch (_) {
      return response.status(404).json({ message: "Not found" });
    }
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
      pending: true,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      )
        .required()
        .min(1),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanagesView.render(orphanage));
  },

  async update(request: Request, response: Response) {
    await getManager().transaction(async (transactionalEntityManager) => {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = request.body;

      const { id } = request.params;

      const orphanagesRepository = getRepository(Orphanage);

      const existsOrphanage = await orphanagesRepository.findOne(id, {
        relations: ["images"],
      });

      if (!existsOrphanage) {
        return response.status(404).json({ message: "Not found" });
      }

      let requestImages;
      let images;

      if (request.files) {
        requestImages = request.files as Express.Multer.File[];

        if (requestImages.length > 0) {
          await transactionalEntityManager.remove(existsOrphanage.images);

          images = requestImages.map((image) => {
            return {
              path: image.filename,
            };
          });
        }
      }

      const data = {
        id: Number(id),
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends: open_on_weekends === "true",
        images,
        pending: false,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        opening_hours: Yup.string().required(),
        open_on_weekends: Yup.boolean().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const orphanage = orphanagesRepository.create(data);

      await transactionalEntityManager.save(orphanage);

      if (!orphanage.images) {
        orphanage.images = existsOrphanage.images.map((image: Image) => {
          return {
            path: image.path,
          };
        }) as Image[];
      }

      return response.status(201).json(orphanagesView.render(orphanage));
    });
  },
};
