# FROM nginx

# RUN rm -v /etc/nginx/nginx.conf
# ADD nginx.conf /etc/nginx/
# ADD . /etc/nginx/html

FROM index.alauda.cn/tutum/lamp:latest
MAINTAINER zangtao <tower1229@gmail.com>
COPY . /app
EXPOSE 80 3306
CMD ["/run.sh"]