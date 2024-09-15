import { RECORD } from "../model/record.model";

const resolver = {
  Mutation: {
    createRecord: async (
      _: any,
      {
        name,
        position,
        level,
      }: {
        name: string;
        position: string;
        level: string;
      }
    ) => {
      try {
        const response = await RECORD.create({
          name,
          position,
          level,
        });
        return response;
      } catch (error) {}
    },
  },
  Query: {
    records: async () => {
      const response = await RECORD.find();
      return response;
    },
  },
};

export default resolver;
