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
class ResourcesTest extends FlatSpec with ShouldMatchers {
  val mapper = new ObjectMapper
  val schema = mapper.readTree(Source.fromFile("schemas/v2.0/resourceSchema.json").mkString)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema)

  it should "validate a resource with string path param" in {
    val json = Source.fromFile("samples/v2.0/json/resources/stringPathParamResource.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }
}