ARG ALPINE=3.14
ARG NODE=17.9

FROM node:${NODE}-alpine${ALPINE}

ARG SERVICE_DEPS=requirements-dev.txt

RUN apk add --no-cache python3=3.9.5-r2 py3-pip
RUN ln -sf python3 /usr/bin/python

RUN pip install -r ${SERVICE_DEPS}