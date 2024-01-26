import data34572 from './videos/34572';
import data40748 from './videos/40748';
import data52299 from './videos/52299';
import data1535 from './videos/1535';
import data38000 from './videos/38000';
import data9253 from './videos/9253';
import data44511 from './videos/44511';
import data36946 from './videos/36946';
import data40456 from './videos/40456';
import data48561 from './videos/48561';
import data32281 from './videos/32281';
import data50594 from './videos/50594';
import data48903 from './videos/48903';

export default function handler(req, res) {
  const { id, index } = req.query;

  const data = {
    34572: data34572,
    40748: data40748,
    52299: data52299,
    1535: data1535,
    38000: data38000,
    9253: data9253,
    44511: data44511,
    36946: data36946,
    40456: data40456,
    48561: data48561,
    32281: data32281,
    50594: data50594,
    48903: data48903,
  };

  const videoObject = data[id];

  if (!videoObject) {
    return res.status(404).json({ error: 'Object not found' });
  }

  if (index !== undefined) {
    const urlIndex = parseInt(index, 10);

    if (
      isNaN(urlIndex) ||
      urlIndex < 0 ||
      urlIndex >= videoObject.urls.length
    ) {
      return res.status(400).json({ error: 'Invalid URL index' });
    }

    const requestedUrl = videoObject.urls[urlIndex];
    const status = requestedUrl.status || true; // Pode ajustar o valor padrão conforme necessário

    // Retornando URLs e Status separados
    return res.status(200).json({
      url: requestedUrl.url,
      legenda: requestedUrl.legenda,
      status: status,
      ending: requestedUrl.ending,
      opening: requestedUrl.opening,
      openingEnds: requestedUrl.openingEnds,
    });
  }

  // Retornando URLs e Status separados para a lista completa
  const urlsWithStatus = videoObject.urls.map((urlObject) => ({
    url: urlObject.url,
    legenda: urlObject.legenda,
    status: urlObject.status || true,
    ending: urlObject.ending,
    opening: urlObject.opening,
    openingEnds: urlObject.openingEnds,
  }));

  res.status(200).json({
    urls: urlsWithStatus,
  });
}
