import fs from 'fs-extra';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { pngQuantize } from '@napi-rs/image';

await imagemin(['*.png'], {
  destination: 'compressed/imagemin',
  plugins: [imageminPngquant()]
});

for (const img of ['large.png', 'tiny.png']) {
  const content = await fs.readFile(img)
  const compressed = await pngQuantize(content);
  await fs.outputFile(`compressed/napi-rs-image/${img}`, compressed);
}
