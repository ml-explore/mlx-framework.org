const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addGlobalData("now", new Date());
    eleventyConfig.addFilter("date", (date, format) => {
        return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(format);
    });

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("LICENSE");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site",
        },
    };
};
