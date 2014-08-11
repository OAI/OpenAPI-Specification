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
class ModelsTest extends FlatSpec with ShouldMatchers with TestBase {
  val schema = readSchema(true)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema.get("definitions").get("schema"))

  it should "validate a models hash" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/models.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate multiple models" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/multipleModels.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate models with examples" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/modelWithExamples.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }

  it should "validate models with composition" in {
    val json = Source.fromFile("fixtures/v2.0/json/models/modelWithComposition.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    if(report.isSuccess == false)
      println(report)
    report.isSuccess should be (true)
  }
}
