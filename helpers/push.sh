#!/bin/sh

git add .
git commit -m "$(date '+%Y-%m-%d %H:%M')"
git push origin main