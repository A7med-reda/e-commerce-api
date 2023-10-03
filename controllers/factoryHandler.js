const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError(`No Document for this is id ${id}`, 400));
    }
    res.status(204).send(); //204 deleted successfully
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return doc after update
    );
    if (!doc) {
      return next(
        new ApiError(`No Document for this is id ${req.body.id}`, 400)
      );
    }
    res.status(200).json({ data: doc });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc }); // req created
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(
        new ApiError(`No document for this is id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = " ") =>
  asyncHandler(async (req, res, next) => {
    // build Query
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const docsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .pagination(docsCounts)
      .filter()
      .limitFields()
      .sort()
      .search(modelName);

    //Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const allDocs = await mongooseQuery;
    res
      .status(200)
      .json({ results: allDocs.length, paginationResult, data: allDocs });
  });
