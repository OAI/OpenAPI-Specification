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
class InfoTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("info"))

  // Info Object Tests - Positive

  it should "validate a basic info object" in {
    val json = Source.fromFile("fixtures/v2.0/json/general/basicInfoObject.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a minimal info object" in {
    val json = Source.fromFile("fixtures/v2.0/json/general/minimalInfoObject.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  // Info Object (+ License Object) Tests - Negative

  it should "not validate an info object with missing required fields" in {
    val json = Source.fromFile("fixtures/v2.0/json/general/negative/negativeInfoObject.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == true)
      println(report)
    report.isSuccess should be (false)
  }
}

@RunWith(classOf[JUnitRunner])
class ExternalDocsTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("externalDocs"))

  // externalDocs - Positive

  it should "validate an externalDocs object" in {
    val json = Source.fromFile("fixtures/v2.0/json/general/externalDocs.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  // externalDocs - Negative

  it should "not validate an externalDocs with missing required fields" in {
    val json = Source.fromFile("fixtures/v2.0/json/general/negative/negativeExternalDocs.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == true)
      println(report)
    report.isSuccess should be (false)
  }
}
