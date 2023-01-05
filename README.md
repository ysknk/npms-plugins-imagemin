# glob-imagemin

## Description

imageminをcli化。globで複数ファイルを圧縮できるようにしたもの。  
引数を渡すことでimageminを実行することができる。  
デフォルトでpng,jpgはwebp化するようになっている。

## Requirement

* Node.js -> check cmd `node -v`

## Install

```sh
npm i -D https://github.com/ysknk/glob-imagemin.git
```

## Usage

### add script in package.json

```json
{
  "scripts": {
    "imagemin": "imagemin"
  },
}
```

```sh
# check arguments help
npm run imagemin -- --help
```

### ex) set options

project root `.imageminrc.js`  
or  
cli `npm run imagemin -- -cwd "./before/" -src "**/[!_]*.{jpg,png}" -dest ./"after/"
`
