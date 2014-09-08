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
class ParameterTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("parameter"))

  it should "validate a string query parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/queryStringParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an int64 array query parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/queryInt64ArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "fail to validate a complex query parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/queryWithComplexParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    report.isSuccess should be (false)
  }

  it should "validate a string header parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/headerStringParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string array header parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/headerStringArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a int64 array header parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/headerInt64ArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string path parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/pathStringParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a int64 path parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/pathInt64Parameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string array path parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/pathStringArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an int64 body parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/bodyInt64Parameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string body parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/bodyStringParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string array body parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/bodyStringArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a complex body parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/bodyComplexParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a complex body array parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/bodyComplexArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an int64 form data parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/formDataInt64Parameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string array form data parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/formDataStringArrayParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  ignore should "fail to validate a complex form data parameter" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/parameters/formDataComplexParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    report.isSuccess should be (false)
  }
}
