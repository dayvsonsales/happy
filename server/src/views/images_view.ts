import Image from "../models/Image";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export default {
  render(image: Image) {
    return `${BASE_URL}/images/${image.path}`;
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
