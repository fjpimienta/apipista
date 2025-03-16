import CutX, { ICutX } from '../../models/CutX.js';
import CutY, { ICutY } from '../../models/CutY.js';

export const cutsResolvers = {
  Query: {
    cutsX: async () => {
      const cutsX = await CutX.find();
      return cutsX;
    },
    cutX: async (_parent: any, args: { id: string }) => {
      return await CutX.findById(args.id);
    },
    cutsY: async () => {
      const cutsY = await CutY.find().populate('cutsX');
      return cutsY;
    },
    cutY: async (_parent: any, args: { id: string }) => {
      return await CutY.findById(args.id).populate('cutsX');
    },
  },
  Mutation: {
    createCutX: async (_parent: any, args: ICutX) => {
      const cutX = new CutX(args);
      return await cutX.save();
    },
    updateCutX: async (_parent: any, args: { id: string } & Partial<ICutX>) => {
      return await CutX.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteCutX: async (_parent: any, args: { id: string }) => {
      await CutX.findByIdAndDelete(args.id);
      return true;
    },
    activateCutX: async (_parent: any, args: { id: string }) => {
      return await CutX.findByIdAndUpdate(args.id, { active: true }, { new: true });
    },
    deactivateCutX: async (_parent: any, args: { id: string }) => {
      return await CutX.findByIdAndUpdate(args.id, { active: false }, { new: true });
    },

    createCutY: async (_parent: any, args: ICutY) => {
      const cutY = new CutY(args);
      return await cutY.save();
    },
    updateCutY: async (_parent: any, args: { id: string } & Partial<ICutY>) => {
      return await CutY.findByIdAndUpdate(args.id, args, { new: true }).populate('cutsX');
    },
    deleteCutY: async (_parent: any, args: { id: string }) => {
      await CutY.findByIdAndDelete(args.id);
      return true;
    },
    activateCutY: async (_parent: any, args: { id: string }) => {
      return await CutY.findByIdAndUpdate(args.id, { active: true }, { new: true }).populate('cutsX');
    },
    deactivateCutY: async (_parent: any, args: { id: string }) => {
      return await CutY.findByIdAndUpdate(args.id, { active: false }, { new: true }).populate('cutsX');
    },
  },
};
