#!/usr/bin/env bash

set -euo pipefail

TAGS=(
    "-gps:all="
    "-xmp:geotag="
    "-xmp:geotime="
    "-xmp:gpslatitude="
    "-xmp:gpslongitude="
    "-xmp:gpsposition="
    "-xmp:gpsdatetime="
    "-xmp:DigitalSourceType="
    "-xmp:Credit="
    "-iptc:Credit="
    "-xmp:gpsimgdirection="
    "-xmp:gpsdestbearing="

)

find . -maxdepth 1 -type f \( \
    -iname "*.jpg" -o \
    -iname "*.jpeg" -o \
    -iname "*.png" -o \
    -iname "*.tif" -o \
    -iname "*.tiff" -o \
    -iname "*.webp" \
\) -print0 | while IFS= read -r -d '' file; do

    echo "Processing: $file"

    exiftool -overwrite_original \
        "${TAGS[@]}" \
        "$file"
done

echo "Done."
