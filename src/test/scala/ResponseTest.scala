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
class ResponseTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("response"))

  it should "validate a string response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/stringResponse.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an int32 response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/int32Response.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an int64 response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/int64Response.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate an date-time response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/dateTimeResponse.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a void response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/voidResponse.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string array response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/stringArrayResponse.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a complex array response" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/complexArrayResponse.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a string response with header" in {
    val json = Source.fromFile("fixtures/v2.0/json/responses/stringResponseWithHeader.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }
}
