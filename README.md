## remove background with imagemagick

`convert *.png -alpha set -channel RGBA -fuzz 30% -fill none -floodfill +0+0 white -set filename:fname '%t' +adjoin '%[filename:fname].png'`

## TODO

- TODO
- BEM
- variable conventions
- 12/24hr Toggle
- Hemisphere Toggle
- Search
- Sort
- Count
- Mobile Responsive (Collapse columns, flex columns)
- Mobile (control panel modal)
- Mobile (preview modal)
- Mobile (preview modal, swipe/ left right buttons to move through list)
- undo/redo caught checks
