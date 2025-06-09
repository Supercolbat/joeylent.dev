function sortCollection() {
  console.log(collection);
  return collection;
}

function prettyDate(date) {
  if (!date) {
    return "";
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

function htmlDateString(dateObj) {
  if (!dateObj) {
    return "";
  }

  // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function tagsString(tags) {
  const filteredTags = tags.filter((t) => t !== "post");
  return filteredTags.join(", ");
}

function groupByMonth(pages) {
  const groups = {};

  for (const page of pages) {
    const [month, _, year] = prettyDate(page.date).split(" ");
    const key = `${month}, ${year}`;

    // Javascript objects retain key order
    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(page);
  }

  return groups;
}

export default function (eleventyConfig) {
  eleventyConfig.addFilter("sortCollection", sortCollection);

  eleventyConfig.addFilter("prettyDate", prettyDate);

  // For use in <time datetime="...">
  eleventyConfig.addFilter("htmlDateString", htmlDateString);

  eleventyConfig.addFilter("tagsString", tagsString);

  eleventyConfig.addFilter("groupByMonth", groupByMonth);
}
