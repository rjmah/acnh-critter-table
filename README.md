This is the repo for https://rjmah.github.io/acnh-critter-table/, which is built with `create-react-app` and `gh-pages`. The app allows players to check off critters that they've caught and provides availability information and other useful stats.

## Contribution

Feel free to send a PR or create an issue on this repo if you see something wrong!

You can fork this repo and preview locally using

```
npm install
npm start
```

## TODOs

- Feature List
- Time zone select
- Undo toast: If you accidently check "caught" too many times. Maybe undo the last batch that occured in the last 2 seconds.
- Code style: BEM
- Code style: stronger variable conventions

## Remove background with imagemagick

I created transparent backgrounds for the critter pictures with imagemagick and this command:
`convert *.png -alpha set -channel RGBA -fuzz 30% -fill none -floodfill +0+0 white -set filename:fname '%t' +adjoin '%[filename:fname].png'`

Might be useful in the future
