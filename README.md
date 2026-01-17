# API-SERVER 
![License](https://img.shields.io/github/license/Rakha-Rayz/api-server)
![Repo Size](https://img.shields.io/github/repo-size/Rakha-Rayz/api-server)
![Last Commit](https://img.shields.io/github/last-commit/Rakha-Rayz/api-server)
![Stars](https://img.shields.io/github/stars/Rakha-Rayz/api-server?style=social)

## Feature 🚀
1. Can create API key🔥
2. Can learn how API keys work.

## Installation 📦
1. Run this in terminal:
```
pkg upgrade && pkg update && pkg install nodejs git
```
2. Check the version
```
node -v
npm -v
git -v
```
3. Clone this repo:
```
git clone https://github.com/rakha-rayz/api-server
# Or, if you use ssh key.
git clone git@github.com:rakha-rayz/api-server.git
```
4. Install some node modules
```
npm install crypto
npm install express
```
> ⓘ MAKE SURE YOU HAVE FS AND PATH.
5. How to run it
```
cd api-server
node index.js
```
and VOILA🎉 you can run it on website or terminal with localhost:3000

# How to use ⚒️
1. If you want to change the port, Please change in index.js on line **9** and change the port variable to 6767 for example
2. How to _**generate API key**_, run this code on terminal:
```
curl -X POST http://localhost:3000/generate \
-H "Content-Type: application/json" \
-d '{
  "name": "YOUR_NAME",
  "expired": "30"
}'
```
> ⓘ Change name to your name. Then change expired to `1` or `30` or `null`.
3. How to use apikey:
```
curl -X POST http://localhost:3000/api \
-H "x-api-key: YOUR-API-KEY"
```

### LICENSE
License MIT

### Ver
Version: 1.6.5
