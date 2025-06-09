// Local plugins
// ...

// Config
import configFilters from "./config/filters.js";

// Official plugins
import pluginFeed from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import { IdAttributePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// Community plugins
import pluginReadingTime from "eleventy-plugin-reading-time";
import pluginFuturePost from "eleventy-plugin-future-post";
import pluginInlineLinkFavicon from "eleventy-plugin-inline-link-favicon";

export default function (eleventyConfig) {
  // Filters
  eleventyConfig.addPlugin(configFilters);

  // Copies files in a given directory to output directory without performing
  // any processing on them.
  eleventyConfig.addPassthroughCopy({
    "src/@public": "/",
  });

  // Local plugins
  // ... nothing but crickets

  // Official plugins
  eleventyConfig.addPlugin(IdAttributePlugin, {
    filter: function ({ page }) {
      if (page.inputPath.endsWith("index.njk")) {
        return false; // skip
      }

      return true;
    },
  });
  eleventyConfig.addPlugin(pluginFeed, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Joey Lent",
      subtitle: "Something about coding",
      base: "https://joeylent.dev/",
      author: {
        name: "Joey Lent",
      },
    },
  });
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  // eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
  //   extensions: "html",
  //   formats: ["webp", "jpeg"],
  //   defaultAttributes: {
  //     loading: "lazy",
  //     decoding: "async",
  //   },
  // });

  // Community plugins
  eleventyConfig.addPlugin(pluginInlineLinkFavicon);
  eleventyConfig.addPlugin(pluginReadingTime);
  eleventyConfig.addPlugin(pluginFuturePost);
}

export const config = {
  // When a passthrough file is modified, rebuild the pages:
  passthroughFileCopy: true,

  // Define where directories are located
  dir: {
    input: "src/",
    includes: "@includes",
    data: "@data",
    output: "_site",
  },
};
