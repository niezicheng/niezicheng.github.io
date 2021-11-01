# exit immediately if a simple command exits with a non-zero status
set -e
# open bash to recognize regular
shopt -s extglob

TEMP_PATH="docs/.temp"

# build docs
npm run docs:build

# prepare deploy
mkdir $TEMP_PATH
cd $TEMP_PATH
git init
cp -r ../../dist/* .

# delop custom domain name
# echo 'www.example.com' > CNAME

# commit and push changes
git add .
git commit -m "build: deploy documentation"
git push -f git@github.com:niezicheng/niezicheng.github.io.git master:gh-pages

# clean
cd -
rm -rf $TEMP_PATH
