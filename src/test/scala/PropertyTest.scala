import com.fasterxml.jackson.databind.JsonNode
import com.github.fge.jsonschema.core.exceptions.ProcessingException
import com.github.fge.jsonschema.main.{ JsonSchema, JsonSchemaFactory}
import com.github.fge.jsonschema.core.report.ProcessingReport
import com.github.fge.jackson.JsonLoader

import scala.io.Source

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.FlatSpec
import org.scalatest.matchers.ShouldMatchers

@RunWith(classOf[JUnitRunner])
class PropertyTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("schema"))

  it should "validate a simple string property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleStringProperty.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a simple int32 property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleInt32Property.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a simple int64 property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleInt64Property.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a simple date-time property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleDateTimeProperty.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a simple boolean property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleBooleanProperty.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a simple byte property" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/simpleByteProperty.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a property with $ref" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithRef.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with string" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithStringArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with int32" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithInt32Array.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with int64" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithInt64Array.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with boolean" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithBooleanArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with byte" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithByteArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with date-time" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithDateTimeArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an array property with complex type" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/properties/propertyWithComplexArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }
}
