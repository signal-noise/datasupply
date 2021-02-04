import fs from "fs";

export default function saveJson(data, path) {
  // if data directory doesn't exist, create one here before trying to save to it.

  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}
