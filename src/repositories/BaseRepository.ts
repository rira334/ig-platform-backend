import { Model } from 'mongoose';

export default class BaseRepository {
  protected model: Model<any, any, any>
  protected filteredItems: Array<string>;

  constructor(model: any, filteredItems?: Array<string>) {
    this.model = model;
    this.filteredItems = filteredItems || [];
  }

  getModel(): Model<any, any, any> {
    return this.model;
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (err) {
      return [];
    }
  };

  async getById(id: string) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      return {};
    }
  }

  async getOne(data: object) {
    try {
      return await this.model.findOne(data);
    } catch (err) {
      return {};
    }
  }

  async delete(data: object) {
    try {
      return await this.model.deleteOne(data);
    } catch (err) {
      return {};
    }
  }

  async update(filter: object, data: object) {
    try {
      return await this.model.updateOne(filter, data);
    } catch (err) {
      return {};
    }
  }

  getFilteredData(data: any) {
    if (Array.isArray(data)) {
      const filtered = data.map((d) => {
        const f: any = {};
        this.filteredItems.forEach((i) => {
          if (typeof d[i] !== 'undefined') {
            f[i] = d[i];
          }
        });
        return f;
      });
      return filtered;
    }

    const filtered: any = {};

    this.filteredItems.forEach((i) => {
      if (data[i]) {
        filtered[i] = data[i];
      }
    });

    return filtered;
  }

  async createOne(data: any) {
    try {
      const item = new this.model(data);
      return item.save();
    } catch (err) {
      console.log(err);
      return { error: true };
    }
  }

  async getWithAggregation(pipeline: Array<any>) {
    try {
      return await this.model.aggregate(pipeline);
    } catch (err) {
      return null;
    }
  }

  checkBody(values: string[], body: any) {
    for (let i = 0; i < values.length; i++) {
      if (!body[values[i]]) {
        return `${values[i]} is required`;
      }
    }
    return null;
  }

  async validateData(schema: any, body: any) {
    try {
      const res = await schema.validate(body);
      return { err: false, value: res };
    } catch (err) {
      return { err: true, msg: err.message };
    }
  }
}