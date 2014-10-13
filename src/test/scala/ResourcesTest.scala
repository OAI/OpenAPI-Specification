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
class ResourcesTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema)

  it should "validate a resource with string path param" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/stringPathParamResource.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with common params" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/commonParameters.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with vendor extensions" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/vendorExtensionExamples.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a resource with example payload" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/resourceWithExamplePayload.json").getLines.filter(!_.startsWith("//")).mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a resource with cascading schemes" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/cascadingSchemes.json").getLines.filter(!_.startsWith("//")).mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with relative host" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/resourceWithRelativeHost.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with linked resources" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/resourceWithLinkedDefinitions.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with multiple mime types" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/multipleMimeTypes.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with security info" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/securityExample.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with tag info" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/taggedResource.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a spec with reusable parameters" in {
    val json = Source.fromFile("fixtures/v2.0/json/resources/reusableParameters.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate the wordnik petstore" in {
    val json = Source.fromFile("examples/v2.0/json/petstore.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate the wordnik petstore with external docs" in {
    val json = Source.fromFile("examples/v2.0/json/petstore-with-external-docs.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate mads sample 1" in {
    val json = Source.fromFile("examples/v2.0/json/petstore-simple.json").getLines.filter(!_.startsWith("//")).mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate mads sample 2" in {
    val json = Source.fromFile("examples/v2.0/json/petstore-expanded.json").getLines.filter(!_.startsWith("//")).mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  /* it should "validate online petstore" in {
    val json = Source.fromURL("http://petstore.swagger.wordnik.com/v2/swagger.json").getLines.filter(!_.startsWith("//")).mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }*/
}
