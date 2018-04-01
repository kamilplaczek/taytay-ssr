import {Transform} from 'stream';

export const createCacheStream = (key, cache) => {
  const bufferedChunks = [];
  return new Transform({
    transform(data, enc, cb) {
      bufferedChunks.push(data);
      cb(null, data);
    },
    flush(cb) {
      cache.put(key, Buffer.concat(bufferedChunks).toString());
      cb();
    },
  });
};
