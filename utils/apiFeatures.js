class ApiFeatures {
  constructor(mongooseQuery, queryStr) {
    this.mongooseQuery = mongooseQuery;
    this.queryStr = queryStr;
  }

  pagination(docsCount) {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 50;
    const skip = (page - 1) * limit; //skip (2-1)*5= 5
    const currentIndex = page * limit; // 2*5 = 10

    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.pagesCount = Math.ceil(docsCount / limit);

    // next Page
    if (currentIndex < docsCount) {
      pagination.next = page + 1;
    }
    //prev Page
    if (skip < 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  filter() {
    const queryStringObj = { ...this.queryStr }; // copy el not obj reference
    const excludedQueryStringObj = [
      "page",
      "limit",
      "sort",
      "fields",
      "keyword",
    ];
    excludedQueryStringObj.forEach((el) => delete queryStringObj[el]);
    // Apply flirting [gte , gt , lte, lt] add $ -> not found in URL
    let queryString = JSON.stringify(queryStringObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const querySort = this.queryStr.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(querySort);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const queryFields = this.queryStr.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(queryFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryStr.keyword) {
      let query = {};
      if (modelName === "product") {
        query = {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        };
      } else {
        query = {
          $or: [{ name: { $regex: this.queryStr.keyword, $options: "i" } }],
        };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

module.exports = ApiFeatures;
