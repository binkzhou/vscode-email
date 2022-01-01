import * as fs from "fs";
/**
 * 获取文件数据
 */
const getText = (path: string): string => {
  const text = fs.readFileSync(path, { encoding: "utf-8" });
  return text;
};
export { getText };
