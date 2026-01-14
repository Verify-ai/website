module.exports = function(eleventyConfig) {
  // passthrough copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site"
    }
  };
};
