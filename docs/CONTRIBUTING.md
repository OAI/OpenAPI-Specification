# Contributing

## Building the site

The registy site uses [jekyll](https://jekyllrb.com/), a Ruby based static site generator, with the Dinky theme.

### Docker dev

You can use the following Docker command to build and serve the site:

```shell
docker build . -t oas-spec/latest
docker run -v $(pwd):/site -p 4000:4000 oas-spec/latest
```

### Local Ruby dev

You will need to set up Ruby locally to run the server and see your changes.

``` bash
gem install bundler
bundle install
```

With all the gems (dependencies) installed, you can launch the jekyll server.

``` bash
bundle exec jekyll serve
```

It will show output like this, and you can grab the Server address and open it in your browser.

```
Configuration file: /site/_config.yml
            Source: /site
       Destination: /site/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 3.609 seconds.
 Auto-regeneration: enabled for '/site'
    Server address: http://0.0.0.0:4000
```

