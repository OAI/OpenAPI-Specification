import com.fasterxml.jackson.databind.JsonNode
import com.github.fge.jsonschema.exceptions.ProcessingException
import com.github.fge.jsonschema.main.{ JsonSchema, JsonSchemaFactory}
import com.github.fge.jsonschema.report.ProcessingReport
import com.github.fge.jackson.JsonLoader

import com.fasterxml.jackson.databind.ObjectMapper

import scala.io.Source

import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.FlatSpec
import org.scalatest.matchers.ShouldMatchers

@RunWith(classOf[JUnitRunner])
class SchemaTestTest extends FlatSpec with ShouldMatchers {
  val mapper = new ObjectMapper
  val schema = mapper.readTree(Source.fromFile("schemas/v2.0/modelSchema.json").mkString)
  val factory = JsonSchemaFactory.byDefault()
  val jsonSchema = factory.getJsonSchema(schema)

  it should "validate a simple model" in {
    val json = Source.fromFile("samples/v2.0/json/models/simpleModel.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    report.isSuccess should be (true)
  }

  it should "validate a model with primitive array" in {
    val json = Source.fromFile("samples/v2.0/json/models/modelWithPrimitiveArray.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    report.isSuccess should be (true)
  }

  it should "validate a model with array and ref" in {
    val json = Source.fromFile("samples/v2.0/json/models/modelWithArrayRef.json").mkString
    val data = JsonLoader.fromString(json)
    val report = jsonSchema.validate(data)
    report.isSuccess should be (true)
  }

  ignore should "validate all models" in {
    val modelFiles = new java.io.File("samples/v2.0/json/models")
    modelFiles.listFiles().filter(_.getName().endsWith(".json")).foreach(sample => {
      println("processing file " + sample.getAbsolutePath)
      val json = Source.fromFile(sample.getAbsolutePath).mkString
      val data = JsonLoader.fromString(json)
      val report = jsonSchema.validate(data)
      report.isSuccess should be (true)
    })
  }
}
