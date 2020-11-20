const sort = require("semver/functions/rsort");
const valid = require("semver/functions/valid");

module.exports = {
  computeLatest: (tags) => {
    const validTags = tags.all.filter((tag) => valid(tag) !== null);
    return tags.latest || sort(validTags)[0] || "v0.0.0";
  },
};
