import fs from "fs";

export default function saveJson(data, fullPath) {
  const splitPath = fullPath.split("/");
  const dataPath = `${splitPath[0]}/${splitPath[1]}`;

  // if data directory doesn't exist, create one here before trying to save to it.
  !fs.existsSync(dataPath) && fs.mkdirSync(dataPath);

  try {
    fs.writeFileSync(fullPath, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}
