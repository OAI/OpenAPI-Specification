require 'json-schema'
require 'json'
require 'yaml'

schema = JSON.parse(File.read('schemas/v2.0/schema.json'))
Dir['examples/**/*.json'].each do |file|
  puts "Validating: #{file}"
  data = File.read file
  # require 'pry'; binding.pry
  puts JSON::Validator.fully_validate(schema, data, :validate_schema => true)
end

Dir['examples/**/*.yaml'].each do |file|
  puts "Validating: #{file}"
  data = YAML.load(File.read file)
  # require 'pry'; binding.pry
  puts JSON::Validator.fully_validate(schema, data, :validate_schema => true)
end
