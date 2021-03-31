# Daru Resume Creator
A resume creator using hackresume and wkhtmltopdf

#Installtion


1. Check linux system for latest packages
```
sudo apt upgrade
sudo apt update
```
2. Install latest node js
```
sudo apt install nodejs
```
3. Install latest npm
```
 sudo apt install npm
 ```
4. Install Lastest hackmyresume cli
```
 npm install hackmyresume -g
 ```
 5. Download and Install wkhtmltopdf(Installing QT patched version)
 ```
 wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.focal_amd64.deb
 sudo dpkg -i wkhtmltox_0.12.6-1.focal_amd64.deb
 ```
 6. Install PM2
 ```
 sudo npm install pm2 -g
 ```
 7. Clone this git project to any public folder
 ```
git clone {{url}}
 ```
 8. Start the code in PM2
 ```
 cd daru-resume
 pm2 start bin/www
 ```
