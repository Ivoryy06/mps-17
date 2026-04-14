#!/bin/bash

# Image optimization script for MPS project
# Requires imagemagick: sudo apt install imagemagick

set -e

QUALITY=85
MAX_WIDTH=1920
THUMB_WIDTH=400

echo "🖼️  Optimizing images..."

# Create optimized directories
mkdir -p pictures/optimized/{thumbs,full}

# Function to optimize image
optimize_image() {
    local input="$1"
    local output="$2"
    local width="$3"
    
    if [[ -f "$input" && ! -f "$output" ]]; then
        echo "Processing: $(basename "$input")"
        magick "$input" \
            -resize "${width}x${width}>" \
            -quality $QUALITY \
            -strip \
            "$output"
    fi
}

# Optimize portfolio images
for img in pictures/porto/member*/*.jpg; do
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        member=$(basename "$(dirname "$img")")
        
        mkdir -p "pictures/optimized/full/$member"
        mkdir -p "pictures/optimized/thumbs/$member"
        
        # Full size (max 1920px)
        optimize_image "$img" "pictures/optimized/full/$member/$filename" $MAX_WIDTH
        
        # Thumbnail (400px)
        optimize_image "$img" "pictures/optimized/thumbs/$member/$filename" $THUMB_WIDTH
    fi
done

# Optimize member photos
for img in pictures/member*/*.jpg; do
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        member=$(basename "$(dirname "$img")")
        
        mkdir -p "pictures/optimized/full/$member"
        mkdir -p "pictures/optimized/thumbs/$member"
        
        optimize_image "$img" "pictures/optimized/full/$member/$filename" $MAX_WIDTH
        optimize_image "$img" "pictures/optimized/thumbs/$member/$filename" $THUMB_WIDTH
    fi
done

# Optimize background images
for img in pictures/*.jpg; do
    if [[ -f "$img" ]]; then
        filename=$(basename "$img")
        optimize_image "$img" "pictures/optimized/full/$filename" $MAX_WIDTH
    fi
done

echo "✅ Image optimization complete!"
echo "📊 Size comparison:"
du -sh pictures/porto/ pictures/optimized/ 2>/dev/null || true
