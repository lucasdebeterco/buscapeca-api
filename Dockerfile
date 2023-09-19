FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN apt-get update && apt-get install -y wget bzip2 libxtst6 libgtk-3-0 libx11-xcb-dev libdbus-glib-1-2 libxt6 libpci-dev && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz && \
        tar -zxf geckodriver-v0.33.0-linux64.tar.gz -C /usr/local/bin && \
        chmod +x /usr/local/bin/geckodriver && \
        rm geckodriver-v0.33.0-linux64.tar.gz

RUN FIREFOX_SETUP=firefox-setup.tar.bz2 && \
        wget -O $FIREFOX_SETUP "https://download.mozilla.org/?product=firefox-95.0.1&os=linux64" && \
        tar xjf $FIREFOX_SETUP -C /opt/ && \
        ln -s /opt/firefox/firefox /usr/bin/firefox && \
        rm $FIREFOX_SETUP

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "app.js" ]