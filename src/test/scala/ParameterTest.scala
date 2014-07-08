import com.fasterxml.jackson.databind.JsonNode
import com.github.fge.jsonschema.core.exceptions.ProcessingException
import com.github.fge.jsonschema.main.{ JsonSchema, JsonSchemaFactory}
import com.github.fge.jsonschema.core.report.ProcessingReport
import com.github.fge.jackson.JsonLoader

import com.fasterxml.jackson.databind.ObjectMapper

import scala.io.Source

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.FlatSpec
import org.scalatest.matchers.ShouldMatchers

@RunWith(classOf[JUnitRunner])
class ParameterTest extends FlatSpec with ShouldMatchers {
  val mapper = new ObjectMapper
  val schema = mapper.readTree(Source.fromFile("schemas/v2.0/parameterSchema.json").mkString)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema)

  it should "validate a simple query parameter" in {
    val json = Source.fromFile("samples/v2.0/json/resources/parameters/simpleQueryParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate a model with int64 array query parmeter" in {
    val json = Source.fromFile("samples/v2.0/json/resources/parameters/int64ArrayQueryParameter.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }
}