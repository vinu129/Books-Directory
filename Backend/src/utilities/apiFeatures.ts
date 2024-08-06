import { title } from "process";

class APIFeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;

    //page=2&limit=10 => 1-10 page1, 11-20 page2 ...
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  filter() {
    // Filter by status
    if (this.queryString.status) {
      this.query = this.query.find({ status: this.queryString.status });
    }
    // Filter by author
    if (this.queryString.authors) {
      const authorsArray = this.queryString.authors.split(",");
      this.query = this.query.find({ authors: { $in: authorsArray } });
    }
    // Filter by categories
    if (this.queryString.categories) {
      const categoriesArray = this.queryString.categories.split(",");
      this.query = this.query.find({ categories: { $in: categoriesArray } });
    }
    // Filter all Favorite Books
    if (this.queryString.isFavorite) {
      this.query = this.query.find({ isFavorite: this.queryString.isFavorite });
    }
    return this;
  }

  search() {
    const searchText = this.queryString.search.trim().replace(/\s+/g, " ");
    const regex = new RegExp(searchText, "i"); // 'i' makes the search case-insensitive

    this.query = this.query.find({ title: { $regex: regex } });

    return this;
  }

  sort() {
    // Sort by title in ascending order
    this.query = this.query.sort("title");
    return this;
  }

  async countDocuments() {
    return await this.query.model.countDocuments(this.query.getQuery());
  }
}

export default APIFeatures;
