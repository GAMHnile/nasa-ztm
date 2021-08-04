const DEFAULT_PAGE_LIMIT = 0; // mongo returns all documents if 0 is set as the  limit
const DEFAULT_PAGE_NUMBER = 1;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
