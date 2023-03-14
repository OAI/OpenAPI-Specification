FROM bretfisher/jekyll-serve

WORKDIR /site

# install dependencies
COPY Gemfile Gemfile.lock . 
RUN bundle install

# install the site
COPY . .

EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]
