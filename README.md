# The Swagger Specification

[![Build Status](https://travis-ci.org/swagger-api/swagger-spec.svg?branch=master)](https://travis-ci.org/swagger-api/swagger-spec)

![](https://raw.github.com/swagger-api/swagger-spec/master/swagger-logo.jpg)
## Welcome to the Swagger Project! 

The goal of Swagger™ is to define a standard, language-agnostic interface to REST APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection.  When properly defined via Swagger, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.  Similar to what interfaces have done for lower-level programming, Swagger removes the guesswork in calling the service.

Use cases for machine-readable API interfaces include interactive documentation, code generation for documentation, client, and server, as well as automated test cases.  Swagger-enabled APIs expose JSON files that correctly adhere to the Swagger Specification, documented in this repository.  These files can either be produced and served statically, or be generated dynamically from your application.

Without going into a long history of interfaces to Web Services, this is not the first attempt to do so.  We can learn from CORBA, WSDL and WADL.  These specifications had good intentions but were limited by proprietary vendor-specific implementations, being bound to a specific programming language, and goals which were too open-ended.  In the end, they failed to gain traction.

Swagger does not require you to rewrite your existing API.  It does not require binding any software to a service--the service being described may not even be yours.  It does, however, require the capabilities of the service be described in the structure of the Swagger Specification.  Not all services can be described by Swagger--this specification is not intended to cover every possible use-case of a REST-ful API.  Swagger does not define a specific development process such as design-first or code-first.  It does facilitate either technique by establishing clear interactions with a REST API.

This GitHub project is the starting point for Swagger.
Here you will find the information you need about the Swagger Specification, a simple static sample of what it looks like,
and some general information regarding the project.


## Current Version - 2.0

The current version of the Swagger specification is 2.0 - and you can find it [here](versions/2.0.md).

### [Swagger 2.0 Specification](versions/2.0.md)

This repository contains the existing Swagger 1.2 specification as well as proposals for the 2.0 version.

## Structure

Each section should contain v1.2 and v2.0 folders to avoid confusion between the versions.

Please keep in mind that the other projects under Swagger use an independent version system.
As such, don't confuse the version of the Swagger Specification they support and the version of that given library.
For example, Swagger-Core with the version 1.3.2 supports Swagger Specification 1.2.

## The Wiki

Check out the [wiki](https://github.com/swagger-api/swagger-spec/wiki) for additional and relevant information about the project.

This includes:
- Static sample tutorial.
- List of known deployments.
- Revision history.

## See it in Action

If you just want to see it work, check out the [pet store sample](http://petstore.swagger.wordnik.com).

## Additional Libraries

### Swagger-Group Projects

These are the projects that were created by the same people who authored the Swagger Specification:
- [swagger-tools](https://github.com/apigee-127/swagger-tools) - A Node.js and browser module that provides tooling for validation and more around Swagger
- [swagger-core](https://github.com/swagger-api/swagger-core) - A Swagger implementation for Java/Scala. Has integration with JAX-RS (Jersey, Resteasy, CXF...), Servlets and Play Framework.
- [swagger-js](https://github.com/swagger-api/swagger-js) - A Swagger implementation for JavaScript.
- [swagger-node-express](https://github.com/swagger-api/swagger-node-express) - A Swagger module for node.js with express module.
- [swagger-ui](https://github.com/swagger-api/swagger-ui) - A dependency-free collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.
- [swagger-codegen](https://github.com/swagger-api/swagger-codegen) - A template-driven engine to generate client code in different languages by parsing your Swagger documentation.
- [swagger-editor](https://github.com/swagger-api/swagger-editor) - Swagger Editor lets you edit API specifications in YAML inside your browser and to preview documentations in real time. Valid Swagger JSON descriptions can then be generated and used with the full Swagger tooling (code generation, documentation, etc).


### Community-Driven Language Integrations
These are third party tools generated by the Swagger community. Note that not all are compatible with Swagger V2.0. 

#### Clojure
- [octohipster](https://github.com/myfreeweb/octohipster) - A hypermedia REST HTTP API library for Clojure.
- [ring-swagger](https://github.com/metosin/ring-swagger) - Swagger implementation for Clojure/Ring using Prismatic Schema for data models
  - [compojure-api](https://github.com/metosin/compojure-api) - Swagger for Compojure
  - [fnhouse-swagger](https://github.com/metosin/fnhouse-swagger) - Swagger for fnhouse
  - [pedestal-swagger](https://github.com/frankiesardo/pedestal-swagger) - Swagger for pedestal

### ColdFusion / CFML
- [swagger-docs-cfml](https://github.com/webonix/swagger-docs-cfml) - create swagger docs from CFML (Railo) ReST components.

#### Eiffel
- [swagger](https://github.com/EiffelWebFramework/swagger) - Swagger protocol implementation in Eiffel.

#### Go
- [go-restful](https://github.com/emicklei/go-restful) - library to build REST based Web Services using Google Go.
- [Sashay](https://bitbucket.org/seanerussell/sashay) - a Go code generator for REST services that expose a Swagger specification.
- [beego](https://github.com/astaxie/beego) - A framework support support auto generate swagger spec from comments
- [Swagger spec generator](https://github.com/yvasiyarov/swagger) - A swagger spec auto generator. Doesn't depends on any framework  

#### Groovy
- [restapidoc](https://github.com/siemens/restapidoc) - A simple RESTful API documentation plugin for the Grails web application framework.
- [swaggydoc](http://grails.org/plugin/swaggydoc) - Swagger Documentation for Grails Controllers. [[Source]](https://github.com/rahulsom/swaggydoc)

#### Java
- [springfox](https://springfox.github.io/springfox) - Integrates with Spring MVC with support for Swagger 1.2 and Swagger 2.0 spec.
- [swagger4spring-web](https://github.com/wkennedy/swagger4spring-web) - Integration with Spring MVC.
- [swagger-maven-plugin](http://kongchen.github.io/swagger-maven-plugin/) - Support Swagger Spec 2.0, integrate with JAX-RS & Spring MVC project, and easily generate `swagger.json` & a static document during build phase.
- [swagger-codegen-maven-plugin](https://github.com/garethjevans/swagger-codegen-maven-plugin) - A maven build plugin which allows the codegen project to be triggered for generating clients, etc. during the build process.
- [swagger-jaxrs-doclet](https://github.com/ryankennedy/swagger-jaxrs-doclet) - A JavaDoc Doclet that can be used to generate a Swagger resource listing suitable for feeding to swagger-ui.
- [swaggerj4](https://github.com/SmartBear/swagger4j) - A parsing library to turn swagger specifications into POJOs.
- [dropwizard-swagger](https://github.com/federecio/dropwizard-swagger) - A dropwizard bundle that wraps Swagger-Core.
- [swaggerapi](https://github.com/ROAMSYS/swaggerapi) - Creates a Swagger resource listing suitable for feeding to swagger-ui by annotating your classes and methods and handles API calls to those methods
- [swagger-validator](https://github.com/kenshoo/swagger-validator) - Validates that definitions in a swagger.yaml match the actual Java code.
- [swagger2markup](https://github.com/RobWin/swagger2markup) - Swagger2Markup converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB. The Swagger2MarkupConverter supports the Swagger 1.2 and 2.0 specification. 
- [swagger2markup-gradle-plugin](https://github.com/RobWin/swagger2markup-gradle-plugin) - A Swagger2Markup Gradle Plugin which converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB. 
- [assertj-swagger](https://github.com/RobWin/assertj-swagger) - assertj-swagger is a library which compares a design-first Swagger YAML with an implementation-first Swagger JSON output (e.g. from springfox). assertj-swagger allows to validate that the implementation in compliance with the design specification. 

#### JavaScript
- [swagger-ajax-client](https://github.com/signalfx/swagger-ajax-client) - Swagger client to communicate with a Swagger server using XHR requests from browsers. Includes client-side validation of requests against the given Swagger spec.
- [swagger-angular-client](https://github.com/signalfx/swagger-angular-client) - Angular service Swagger client to communicate with a Swagger server using the Angular-specific services (such as $http). Includes client-side validation of requests against the given Swagger spec.
- [swagger-client-generator](https://github.com/signalfx/swagger-client-generator) - Client library generator which can be used to create framework or platform-specific Swagger clients given a transport method (e.g. [swagger-angular-client](https://github.com/signalfx/swagger-angular-client) or [swagger-node-client](https://github.com/signalfx/swagger-node-client)).
- [swagger-validate](https://github.com/signalfx/swagger-validate) - Validation utility to validate Swagger models or requests against a given spec, useful for writing Swagger client libraries.
- [Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) - Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers

#### .Net
- [ServiceStack](https://github.com/ServiceStack/ServiceStack) - a high-performance .NET web services platform that simplifies the development of high-performance REST (JSON, XML, JSV, HTML, MsgPack, ProtoBuf, CSV) and WCF SOAP Web Services. Has support for [Swagger integration](https://github.com/ServiceStack/ServiceStack/wiki/Swagger-API).
- [fubumvc-swagger](https://github.com/KevM/fubumvc-swagger) - This project helps your [FubuMVC](https://github.com/DarthFubuMVC/fubumvc) web application generate API documentation via Swagger.
- [Swashbuckle](https://github.com/domaindrivendev/Swashbuckle) -  Adds some Swagger to your WebApi.
- [Swagger.Net](https://github.com/Swagger-Net/Swagger.Net) - Library to document the ASP.NET Web API using the Swagger specification.
- [dotswaggen](https://github.com/skrusty/dotswaggen) - .Net application that generates code (or anything else, e.g. markdown) from a swagger specification file.
- [AutoRest](https://github.com/Azure/AutoRest) - The AutoRest tool generates client libraries for accessing RESTful web services from a Swagger specification.

#### Node.js
- [Swagger Framework](https://github.com/silas/swagger-framework) - a module for creating Swagger-based apis using the standard HTTP request listener interface (including Express). It supports request normalization/validation, pluggable consumes/produces, spec validation, and more.
- [swagger-jack](https://github.com/worldline/swagger-jack) - Express middleware to automatically create route and validate inputs from a swagger descriptor (for NodeJS).
- [hapi-swagger](https://github.com/glennjones/hapi-swagger) - A Swagger interface for HAPI.
- [hapi-swaggered](https://github.com/z0mt3c/hapi-swaggered) - A hapi.js plugin to generate swagger v2.0 compliant specifications based on hapi routes and joi schemas.
- [Swagger Validation](https://github.com/wonderlic/swagger-validation) - A library to validate a request that integrates with swagger-node-express.
- [swagger-node-client](https://github.com/signalfx/swagger-node-client) - Node client to communicate with Swagger servers. Includes detailed client-side validation against the API spec.
- [swaggerize-express](https://github.com/krakenjs/swaggerize-express) - Design-driven RESTful apis with swagger and express from [@PayPalDev](https://twitter.com/PayPalDev).
- [swaggerize-hapi](https://github.com/krakenjs/swaggerize-hapi) - Design-driven RESTful apis with swagger and hapi from [@PayPalDev](https://twitter.com/PayPalDev).
- [generator-swaggerize](https://github.com/krakenjs/generator-swaggerize) - Yeoman generator for krakenjs/swaggerize tools from [@PayPalDev](https://twitter.com/PayPalDev).
- [a127](http://a127.io) - a127 is toolkit for modeling & building rich, enterprise-class APIs in Node.js on your laptop. The focal point of a127 is the Swagger 2.0 specification for defining and describing an API model. From the Swagger model you can generate clients, servers and interactive documentation for your API. From [@apigee](https://github.com/apigee)
- [ratify](https://github.com/mac-/ratify) - A [Hapi](http://hapijs.com/) plugin that automatically creates Swagger documentation AND validates request/response parameters using the [JSON Schema](http://json-schema.org/) spec.
- [swagger-tools](https://github.com/apigee-127/swagger-tools) - Various Swagger tools for JavaScript including an API/CLI (conversion, validation, ...) and [Connect](https://github.com/senchalabs/connect) middleware for routing, validation, security and swagger-ui.
- [swagger-express](https://github.com/fliptoo/swagger-express) - A simple and clean solution to integrate swagger with express straight away from jsdoc or a yaml file.
- [Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) - Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers
- [Swagger Express Middleware](https://github.com/BigstickCarpet/swagger-express-middleware/#swagger-express-middleware) - Swagger middleware and mocks for Express.js
- [swagger-mongodb](https://github.com/kaizhu256/node-swagger-mongodb) - lightweight swagger-ui crud-api backed by mongodb

#### Perl
- [Raisin](https://github.com/khrt/Raisin) - A framework with a built-in Swagger support.

#### PHP
- [Swagger-PHP](https://packagist.org/packages/zircote/swagger-php) - a library implementing the swagger.io specification to describe web services, operations/actions and models enabling a uniform means of producing, consuming, and visualizing RESTful web services.
- [NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle) - A Symfony Bundle.
- [Restler](https://github.com/Luracast/Restler) - PHP framework, swagger support in 3.0.
- [swagger-assert](https://github.com/gong023/swagger-assert) - enable to assert keys in swagger document and API response
- [SwaggerAssertions](https://github.com/Maks3w/SwaggerAssertions) - Swagger 2 test assertions for validate your API requests and responses
- [Swaggervel](https://packagist.org/packages/jlapp/swaggervel) - a package for Laravel that uses Swagger-PHP and swagger-ui to auto-generate docs for your project.

#### Python
- [django-rest-swagger](https://github.com/marcgibbons/django-rest-swagger) - Swagger Documentation Generator for Django REST Framework
- [django-tastypie-swagger](https://github.com/concentricsky/django-tastypie-swagger) - An adapter to use Swagger with django-tastypie.
- [flask-restful-swagger](https://github.com/rantav/flask-restful-swagger) - A Swagger spec extractor for flask-restful.
- [pyramid-swagger](https://github.com/striglia/pyramid_swagger) - Convenient tools for using Swagger to define and validate your interfaces in a Pyramid webapp.
- [flask-restplus](https://github.com/noirbizarre/flask-restplus) - Helpers, syntaxic sugar and Swagger documentation for Flask-Restful
- [pyswagger](https://github.com/AntXlab/pyswagger) - A type-safe, dynamic, spec-compliant Swagger client.
- [flex](https://github.com/pipermerriam/flex) - Swagger 2.0 schema validation, and tooling for validating arbitrary request/response objects.
- [flask-swagger](https://github.com/gangverk/flask-swagger) - A Swagger 2.0 extractor for Flask via YAML in docstrings

#### Ruby
- [grape-swagger](https://github.com/tim-vandecasteele/grape-swagger) - Add Swagger compliant documentation to your grape API.
- [swagger-docs](https://github.com/richhollis/swagger-docs) - Generates Swagger files for Rails APIs with a simple DSL.
- [swagger-blocks](https://github.com/fotinakis/swagger-blocks) - Define and serve live-updating Swagger JSON for Ruby apps.
- [source2swagger](https://github.com/solso/source2swagger) - Builds a swagger compliant JSON specification from annotations on the comments of your source code.
- [swagger_engine](https://github.com/batdevis/swagger_engine) - include [Swagger-ui](https://github.com/swagger-api/swagger-ui) as mountable rails engine.

#### Scala
- [Scalatra](http://www.scalatra.org/) - see the [Swagger Guide](http://www.scalatra.org/2.2/guides/swagger.html)
- [spray-swagger](https://github.com/gettyimages/spray-swagger) - Spray-Swagger brings Swagger support for Spray Apis. 
- [Api-doc](https://github.com/sun-opsys/api-doc) - Creates swagger docs from easily readable ascii text placed in the code. Depends on [playframework](http://www.playframework.com), but may also be used in other frameworks.

### Community-Driven Tools
These are third party tools generated by the Swagger community:

- [gform-admin](https://github.com/stemey/gform-admin) - An alternative UI client for Swagger.
- [swagger-cli-client](https://github.com/signalfx/swagger-cli-client) - Command-line interface generator to communicate with Swagger servers.
- [swagger.ed](http://chefarchitect.github.io/swagger.ed/) - A Chrome extenstion that will change the way you look at APIs.
- [Swagger2Postman](https://github.com/josephpconley/swagger2postman) - Creates a [Postman](http://www.getpostman.com) collection from live Swagger documentation

## License

Copyright 2014 Reverb Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

