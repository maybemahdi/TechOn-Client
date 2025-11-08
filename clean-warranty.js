import fs from "fs";
import * as cheerio from "cheerio";

const products = JSON.parse(
  fs.readFileSync("./henrikbutzs.Product.json", "utf-8")
);

const cleanedProducts = products.map((product) => {
  const html = product.specs || "";
  const $ = cheerio.load(html);

  // Find the <p><strong>Warranty</strong></p> section
  $("p strong").each((_, el) => {
    const text = $(el).text().trim();
    if (/^warranty$/i.test(text)) {
      // Get the <p> parent (the title)
      const pTag = $(el).closest("p");

      // Remove the following <ul> (the list under warranty)
      const nextUl = pTag.next("ul");
      if (nextUl.length) {
        nextUl.remove();
      }

      // Remove the <p><strong>Warranty</strong></p> itself
      pTag.remove();
    }
  });

  return {
    ...product,
    specs: $.html().trim(),
  };
});

fs.writeFileSync(
  "./products_cleaned.json",
  JSON.stringify(cleanedProducts, null, 2),
  "utf-8"
);

console.log(
  "✅ Warranty sections removed successfully without breaking other specs!"
);
